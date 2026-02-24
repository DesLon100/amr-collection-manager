// js/app.js

import { runPriceCheck, computePriceCheckMetrics } from "./pricecheck.js";
import { makeWorkbenchFromLots } from "./amr-workbench.js";


const STORE_KEY = "amr_collection_v2";
const AMR_META_KEY = "amr_dataset_meta_v2";

const els = {
  // AMR load
  fileAmr: document.getElementById("file-amr"),
  amrStatus: document.getElementById("amr-status"),

  // summary
  sumCount: document.getElementById("sum-count"),
  sumPaid: document.getElementById("sum-paid"),
  sumContext: document.getElementById("sum-context"),
  sumMove: document.getElementById("sum-move"),

  // table
  empty: document.getElementById("empty"),
  tableWrap: document.getElementById("table-wrap"),
  rows: document.getElementById("rows"),

  // actions
  btnAdd: document.getElementById("btn-add"),
  btnAddEmpty: document.getElementById("btn-add-empty"),
  btnExport: document.getElementById("btn-export"),

  // filters
  search: document.getElementById("search"),
  filter: document.getElementById("filter"),

  // drawer
  drawer: document.getElementById("drawer"),
  form: document.getElementById("form"),
  drawerTitle: document.getElementById("drawer-title"),
  fId: document.getElementById("f-id"),
  fArtist: document.getElementById("f-artist"),
  fPrice: document.getElementById("f-price"),
  fMonth: document.getElementById("f-month"),
  fTitle: document.getElementById("f-title"),
  fNotes: document.getElementById("f-notes"),
  btnSave: document.getElementById("btn-save"),
  artistHint: document.getElementById("artist-hint"),

  // detail
  detail: document.getElementById("detail"),
  dTitle: document.getElementById("d-title"),
  dSub: document.getElementById("d-sub"),
  dPrice: document.getElementById("d-price"),
  dMonth: document.getElementById("d-month"),
  dContext: document.getElementById("d-context"),
  dEngine: document.getElementById("d-engine"),
  dEdit: document.getElementById("d-edit"),
  dDelete: document.getElementById("d-delete"),
};

function uid(){
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function fmtGBP(n){
  if(!Number.isFinite(n)) return "—";
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function parseYYYYMM(s){
  const t = String(s || "").trim();
  if(!/^\d{6}$/.test(t)) return null;
  const y = Number(t.slice(0,4));
  const m = Number(t.slice(4,6));
  if(!Number.isFinite(y) || !Number.isFinite(m) || m < 1 || m > 12) return null;
  return { y, m };
}

function monthLabel(s){
  const p = parseYYYYMM(s);
  if(!p) return "—";
  const d = new Date(Date.UTC(p.y, p.m - 1, 1));
  return d.toLocaleString("en-GB", { month:"short", year:"numeric", timeZone:"UTC" });
}

function escapeHTML(s){
  return String(s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function loadJSON(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

// ---------- CSV parsing (quoted fields supported; BOM supported) ----------
function parseCSV(text){
  if(text.charCodeAt(0) === 0xFEFF) text = text.slice(1);

  const rows = [];
  let row = [];
  let cur = "";
  let inQuotes = false;

  for(let i=0;i<text.length;i++){
    const ch = text[i];
    const next = text[i+1];

    if(inQuotes){
      if(ch === '"' && next === '"'){ cur += '"'; i++; }
      else if(ch === '"'){ inQuotes = false; }
      else { cur += ch; }
      continue;
    }

    if(ch === '"'){ inQuotes = true; continue; }
    if(ch === ","){ row.push(cur); cur=""; continue; }
    if(ch === "\n"){ row.push(cur); rows.push(row); row=[]; cur=""; continue; }
    if(ch === "\r"){ continue; }
    cur += ch;
  }
  row.push(cur);
  rows.push(row);

  if(rows.length && rows[rows.length-1].every(v => String(v).trim()==="")) rows.pop();
  return rows;
}

function normalizeHeader(h){
  return String(h || "").trim().toLowerCase().replaceAll(" ", "_");
}

function toNumberLoose(v){
  const s = String(v ?? "").trim();
  if(!s) return NaN;
  const cleaned = s.replaceAll("£","").replaceAll(",","").trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

function parseMonthYYYtoDate(v){
  const p = parseYYYYMM(v);
  if(!p) return null;
  return new Date(Date.UTC(p.y, p.m - 1, 1));
}

// ---------- AMR dataset ----------
let amr = {
  loaded: false,
  rowCount: 0,
  artistList: [],  // [{id, name}]
  artistCount: 0,
  lots: []         // [{artist_id, artist_name, date, price, LocationCode, LotNo, SaleURL}]
};

function updateAmrStatus(){
  if(!els.amrStatus) return;
  if(!amr.loaded){
    els.amrStatus.textContent = "No dataset loaded.";
    return;
  }
  els.amrStatus.textContent =
    `Loaded AMR data: ${amr.artistCount.toLocaleString("en-GB")} artists · ${amr.rowCount.toLocaleString("en-GB")} rows`;
}

function populateArtistSelect(){
  if(!els.fArtist) return;

  if(!amr.loaded || !amr.artistList.length){
    els.fArtist.innerHTML = `<option value="">Load AMR data first…</option>`;
    els.fArtist.disabled = true;
    if(els.artistHint) els.artistHint.textContent = "Load an AMR CSV export to populate this list.";
    return;
  }

  const opts = [`<option value="">Select an artist…</option>`]
    .concat(amr.artistList.map(a => `<option value="${escapeHTML(a.id)}">${escapeHTML(a.name)}</option>`));

  els.fArtist.innerHTML = opts.join("");
  els.fArtist.disabled = false;
  if(els.artistHint) els.artistHint.textContent = "Artist list populated from your loaded AMR export.";
}

/**
 * Your CSV headers:
 * ArtistID,ArtistName,MonthYYY,ValueGBP,LocationID,LocationCode,AuctionID,LotNo,SaleURL
 */
function buildAmrFromYourCSV(text){
  const grid = parseCSV(text);
  if(grid.length < 2) throw new Error("CSV needs a header row and at least one data row.");

  const headers = grid[0].map(normalizeHeader);

  const idxArtistId   = headers.indexOf("artistid");
  const idxArtistName = headers.indexOf("artistname");
  const idxMonth      = headers.indexOf("monthyyy");
  const idxValue      = headers.indexOf("valuegbp");
  const idxLocCode    = headers.indexOf("locationcode");
  const idxLotNo      = headers.indexOf("lotno");
  const idxSaleURL    = headers.indexOf("saleurl");

  if(idxArtistId < 0 || idxArtistName < 0 || idxMonth < 0 || idxValue < 0){
    throw new Error(`Expected at least: ArtistID, ArtistName, MonthYYY, ValueGBP.`);
  }

  const artistMap = new Map();
  const lots = [];

  for(let r=1; r<grid.length; r++){
    const row = grid[r];

    const artist_id = String(row[idxArtistId] ?? "").trim();
    const artist_name = String(row[idxArtistName] ?? "").trim();
    if(!artist_id || !artist_name) continue;

    if(!artistMap.has(artist_id)) artistMap.set(artist_id, artist_name);

    const d = parseMonthYYYtoDate(row[idxMonth]);
    const price = toNumberLoose(row[idxValue]);
    if(!(d instanceof Date) || !Number.isFinite(price)) continue;

    lots.push({
      artist_id,
      artist_name,
      date: d,
      price,
      LocationCode: idxLocCode >= 0 ? String(row[idxLocCode] ?? "").trim() : "",
      LotNo: idxLotNo >= 0 ? String(row[idxLotNo] ?? "").trim() : "",
      SaleURL: idxSaleURL >= 0 ? String(row[idxSaleURL] ?? "").trim() : ""
    });
  }

  const artistList = Array.from(artistMap.entries())
    .map(([id, name]) => ({ id, name }))
    .sort((a,b)=> a.name.localeCompare(b.name, "en", { sensitivity:"base" }));

  return { artistList, lots, rowCount: grid.length - 1 };
}

// ---------- Collection storage ----------
let items = loadJSON(STORE_KEY, []);
let activeId = null;

function computeContextStub(item){
  // default empty
  let context_now = null;
  let movement_pct = null;
  let engineLabel = "—";

  // Only compute if we have AMR data loaded + lots in memory
  if(!amr.loaded || !amr.lots?.length) return { context_now, movement_pct, engine: engineLabel };

  // Need artist id + price
  const artistId = String(item.artist_id || "").trim();
  const price = Number(item.purchase_price);
  if(!artistId || !Number.isFinite(price) || price <= 0) return { context_now, movement_pct, engine: engineLabel };

  // Movement only if user supplied a purchase month
  const myMonth = String(item.purchase_month || "").trim();

  try{
    const workbench = makeWorkbenchFromLots(amr.lots);
    const m = computePriceCheckMetrics({
      workbench,
      artistId,
      price,
      myMonthYYYYMM: myMonth
    });

    engineLabel = (m.engine === "mean") ? "Mean" : "Median";
    context_now = Number.isFinite(m.contextNow) ? m.contextNow : null;
    movement_pct = Number.isFinite(m.movementPct) ? m.movementPct : null;

    return { context_now, movement_pct, engine: engineLabel };
  } catch {
    return { context_now, movement_pct, engine: engineLabel };
  }
}

// ---------- Render ----------
function applyFilters(list){
  const q = String(els.search?.value || "").trim().toLowerCase();
  const f = String(els.filter?.value || "all");

  return list.filter(it => {
    const artist = it.artist_name || it.artist || "";
    const text = `${artist} ${it.title || ""}`.toLowerCase();
    const matchQ = !q || text.includes(q);

    const hasDate = !!parseYYYYMM(it.purchase_month);
    const status = hasDate ? "complete" : "needs_date";
    const matchF = (f === "all") || (f === status);

    return matchQ && matchF;
  });
}

function render(){
  const enriched = items.map(it => ({ ...it, ...computeContextStub(it) }));

  els.sumCount.textContent = String(enriched.length);

  const totalPaid = enriched.reduce((a,it)=> a + (Number(it.purchase_price)||0), 0);
  els.sumPaid.textContent = fmtGBP(totalPaid);

  const contexts = enriched.map(it => it.context_now).filter(Number.isFinite);
  els.sumContext.textContent = contexts.length ? fmtGBP(contexts.reduce((a,b)=>a+b,0)) : "—";

  const moves = enriched.map(it => it.movement_pct).filter(Number.isFinite);
  els.sumMove.textContent = moves.length ? `${Math.round(moves.reduce((a,b)=>a+b,0)/moves.length)}%` : "—";

  const isEmpty = enriched.length === 0;
  els.empty.classList.toggle("hidden", !isEmpty);
  els.tableWrap.classList.toggle("hidden", isEmpty);

  const view = applyFilters(enriched);

  
  els.rows.innerHTML = view.map(it => {
    const artist = it.artist_name || it.artist || "—";
    const hasDate = !!parseYYYYMM(it.purchase_month);
    const status = hasDate ? `<span class="badge ok">Complete</span>` : `<span class="badge warn">Needs date</span>`;
    const movement = Number.isFinite(it.movement_pct) ? `${Math.round(it.movement_pct)}%` : "—";
    const title = it.title ? ` <span class="muted">·</span> <span class="muted">${escapeHTML(it.title)}</span>` : "";
    return `
      <tr data-id="${it.id}">
        <td>
          <div style="font-weight:900">${escapeHTML(artist)}${title}</div>
          ${it.notes ? `<div class="muted" style="font-size:12px;margin-top:2px">${escapeHTML(it.notes)}</div>` : ""}
        </td>
        <td class="right">${fmtGBP(Number(it.purchase_price))}</td>
        <td>${hasDate ? monthLabel(it.purchase_month) : "—"}</td>
        <td class="right">${Number.isFinite(it.context_now) ? fmtGBP(it.context_now) : "—"}</td>
        <td class="right">${movement}</td>
        <td>${escapeHTML(it.engine || "—")}</td>
        <td>${status}</td>
        <td class="right">
          <button class="kebab" data-action="open">View</button>
        </td>
      </tr>
    `;
  }).join("");

  els.rows.querySelectorAll("button[data-action='open']").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const tr = e.target.closest("tr");
      const id = tr?.dataset?.id;
      if(id) openDetail(id);
    });
  });
}

// ---------- Drawer helpers ----------
function openDrawer(mode, item=null){
  populateArtistSelect();

  els.drawer.classList.remove("hidden");
  els.drawer.setAttribute("aria-hidden", "false");

  if(mode === "edit" && item){
    els.drawerTitle.textContent = "Edit artwork";
    els.btnSave.textContent = "Save changes";
    els.fId.value = item.id;

    if(item.artist_id && amr.loaded){
      els.fArtist.value = String(item.artist_id);
    } else if(item.artist_name && amr.loaded){
      const match = amr.artistList.find(a => a.name === item.artist_name);
      if(match) els.fArtist.value = match.id;
    }

    els.fPrice.value = item.purchase_price ?? "";
    els.fMonth.value = item.purchase_month || "";
    els.fTitle.value = item.title || "";
    els.fNotes.value = item.notes || "";
  } else {
    els.drawerTitle.textContent = "Add artwork";
    els.btnSave.textContent = "Add to my collection";
    els.form.reset();
    els.fId.value = "";
  }
}

function closeDrawer(){
  els.drawer.classList.add("hidden");
  els.drawer.setAttribute("aria-hidden", "true");
}

function openDetail(id){
  activeId = id;
  const item = items.find(x => x.id === id);
  if(!item) return;

  const hasDate = !!parseYYYYMM(item.purchase_month);
  const artist = item.artist_name || item.artist || "—";

  els.dTitle.textContent = item.title ? `${artist} · ${item.title}` : artist;
  els.dSub.textContent = hasDate
    ? `Purchase month: ${monthLabel(item.purchase_month)}`
    : "No purchase month supplied — context only (no revaluation claim).";

  els.dPrice.textContent = fmtGBP(Number(item.purchase_price));
  els.dMonth.textContent = hasDate ? monthLabel(item.purchase_month) : "—";

  els.detail.classList.remove("hidden");
  els.detail.setAttribute("aria-hidden","false");

  // ---- Run AMR Price Check engine inside this drawer ----
  const elChart = document.getElementById("pc-universe");

  if(!amr.loaded || !amr.lots.length){
    // Still show detail, but explain why chart can't render yet
    els.dContext.textContent = "—";
    els.dEngine.textContent = "—";
    if(elChart) elChart.innerHTML = `<div class="muted" style="padding:10px;">Load AMR data to render this chart.</div>`;
    return;
  }

  try{
    const workbench = makeWorkbenchFromLots(amr.lots);

    // default scale for detail view
let yScale = "linear";

const { equivNow, engine } = runPriceCheck({
  workbench,
  artistId: String(item.artist_id),
  price: Number(item.purchase_price),
  myMonthYYYYMM: String(item.purchase_month || ""),
  yScale,
  elChart
});

// Update header tiles
els.dEngine.textContent = (engine === "mean") ? "Mean" : "Median";
els.dContext.textContent = Number.isFinite(equivNow) ? fmtGBP(equivNow) : "—";

// --- Linear/Log toggle (restyle existing chart) ---
const logInput = document.getElementById("pc-log");
if(logInput && elChart){
  // reset state each time detail opens
  logInput.checked = (yScale === "log");

  // kill old listeners by cloning (prevents duplicates when opening multiple artworks)
  const clone = logInput.cloneNode(true);
  logInput.parentNode.replaceChild(clone, logInput);

  clone.addEventListener("change", () => {
    yScale = clone.checked ? "log" : "linear";
    // Relayout only — no recompute, no redraw of traces needed
    Plotly.relayout(elChart, { "yaxis.type": yScale });
  });
}

    els.dEngine.textContent = (engine === "mean") ? "Mean" : "Median";
    els.dContext.textContent = Number.isFinite(equivNow) ? fmtGBP(equivNow) : "—";
  } catch(err){
    els.dContext.textContent = "—";
    els.dEngine.textContent = "—";
    if(elChart){
      elChart.innerHTML = `<div class="muted" style="padding:10px;">${escapeHTML(err?.message || "Could not render chart.")}</div>`;
    }
  }
}

function closeDetail(){
  els.detail.classList.add("hidden");
  els.detail.setAttribute("aria-hidden","true");
  activeId = null;
}

// ---------- Actions ----------
els.btnAdd?.addEventListener("click", ()=> openDrawer("add"));
els.btnAddEmpty?.addEventListener("click", ()=> openDrawer("add"));

document.querySelectorAll("[data-close='1']").forEach(el => el.addEventListener("click", closeDrawer));
document.querySelectorAll("[data-close-detail='1']").forEach(el => el.addEventListener("click", closeDetail));

// Save add/edit
els.form?.addEventListener("submit", (e)=>{
  e.preventDefault();

  const id = String(els.fId.value || "").trim();
  const artist_id = String(els.fArtist.value || "").trim();
  const price = Number(els.fPrice.value);
  const month = String(els.fMonth.value || "").trim();
  const title = String(els.fTitle.value || "").trim();
  const notes = String(els.fNotes.value || "").trim();

  if(!artist_id) return alert("Please select an artist (load AMR data first).");
  if(!Number.isFinite(price) || price <= 0) return alert("Please enter a valid price.");
  if(month && !parseYYYYMM(month)) return alert("Purchase month must be YYYYMM (e.g. 202411).");

  const artistObj = amr.artistList.find(a => a.id === artist_id);
  const artist_name = artistObj ? artistObj.name : artist_id;

  if(id){
    const idx = items.findIndex(x => x.id === id);
    if(idx >= 0){
      items[idx] = {
        ...items[idx],
        artist_id,
        artist_name,
        purchase_price: price,
        purchase_month: month || "",
        title: title || "",
        notes: notes || "",
        updated_at: new Date().toISOString()
      };
    }
  } else {
    items.unshift({
      id: uid(),
      artist_id,
      artist_name,
      purchase_price: price,
      purchase_month: month || "",
      title: title || "",
      notes: notes || "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  saveJSON(STORE_KEY, items);
  closeDrawer();
  render();
});

els.search?.addEventListener("input", ()=> render());
els.filter?.addEventListener("change", ()=> render());

// Export collection CSV
els.btnExport?.addEventListener("click", ()=>{
  const header = ["artist_id","artist_name","title","purchase_price","purchase_month","notes"];
  const lines = [header.join(",")];

  for(const it of items){
    const row = header.map(k => `"${String(it[k] ?? "").replaceAll('"','""')}"`);
    lines.push(row.join(","));
  }

  const blob = new Blob([lines.join("\n")], { type:"text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "amr_collection.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// ---------- Load AMR CSV ----------
els.fileAmr?.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if(!file) return;

  try{
    const text = await file.text();
    const { artistList, lots, rowCount } = buildAmrFromYourCSV(text);

    amr.loaded = true;
    amr.artistList = artistList;
    amr.artistCount = artistList.length;
    amr.rowCount = rowCount;
    amr.lots = lots;

    // Persist only meta (NOT lots) to avoid localStorage blow-ups
    saveJSON(AMR_META_KEY, {
      loaded: true,
      artistList,
      artistCount: artistList.length,
      rowCount
    });

    updateAmrStatus();
    populateArtistSelect();
    alert(`Loaded AMR dataset.\n\nArtists: ${artistList.length}\nRows: ${rowCount}`);
  } catch(err){
    alert(`Could not load AMR CSV.\n\n${err?.message || "Unknown error"}`);
  } finally {
    els.fileAmr.value = "";
  }
});

// ---------- Detail actions ----------
els.dEdit?.addEventListener("click", ()=>{
  if(!activeId) return;
  const item = items.find(x => x.id === activeId);
  if(!item) return;
  closeDetail();
  openDrawer("edit", item);
});

els.dDelete?.addEventListener("click", ()=>{
  if(!activeId) return;
  const item = items.find(x => x.id === activeId);
  if(!item) return;

  const artist = item.artist_name || item.artist || "—";
  const ok = confirm(`Remove "${artist}${item.title ? " · " + item.title : ""}"?`);
  if(!ok) return;

  items = items.filter(x => x.id !== activeId);
  saveJSON(STORE_KEY, items);
  closeDetail();
  render();
});

// ---------- Init ----------
(function init(){
  const meta = loadJSON(AMR_META_KEY, null);
  if(meta?.loaded && Array.isArray(meta.artistList) && meta.artistList.length){
    amr.loaded = true;
    amr.artistList = meta.artistList;
    amr.artistCount = meta.artistCount || meta.artistList.length;
    amr.rowCount = meta.rowCount || 0;
    amr.lots = []; // user must re-load CSV each session to render charts
  }

  updateAmrStatus();
  populateArtistSelect();
  render();
})();
