// js/app.js
// Collection manager MVP + Load AMR dataset (artist list source)

const STORE_KEY = "amr_collection_v1";
const AMR_KEY   = "amr_dataset_meta_v1"; // store only what we need for now

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

function loadCollection(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if(Array.isArray(parsed)) return parsed;
  } catch(e){}
  return [];
}

function saveCollection(items){
  localStorage.setItem(STORE_KEY, JSON.stringify(items));
}

function loadAmrMeta(){
  try{
    const raw = localStorage.getItem(AMR_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e){}
  return null;
}

function saveAmrMeta(meta){
  localStorage.setItem(AMR_KEY, JSON.stringify(meta));
}

// ---------- CSV parsing (quoted fields supported) ----------
function parseCSV(text){
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

// ---------- AMR dataset handling ----------
let amr = {
  loaded: false,
  artistList: [],  // ["A R Penck", "Gerhard Richter", ...]
  artistCount: 0,
  rowCount: 0,
};

function cleanArtistName(s){
  let t = String(s || "").trim();
  if(!t) return "";

  // If you have "Name (12345)" or "Name [id]" patterns, strip trailing id blocks
  t = t.replace(/\s*[\(\[]\s*\d+\s*[\)\]]\s*$/g, "").trim();

  // collapse whitespace
  t = t.replace(/\s+/g, " ").trim();
  return t;
}

function detectArtistColumn(headers){
  const h = headers;

  const prefer = ["artist", "artist_name", "artistname", "name", "artistn"];
  for(const key of prefer){
    const i = h.indexOf(key);
    if(i >= 0) return i;
  }

  // common AMR-ish variants
  const variants = ["artistdisplay", "artist_display", "fullname"];
  for(const key of variants){
    const i = h.indexOf(key);
    if(i >= 0) return i;
  }

  return -1;
}

function buildArtistListFromAmrCSV(text){
  const grid = parseCSV(text);
  if(grid.length < 2) throw new Error("CSV needs a header row and at least one data row.");

  const headers = grid[0].map(normalizeHeader);
  const artistIdx = detectArtistColumn(headers);
  if(artistIdx < 0){
    throw new Error('Could not find an artist column. Expected headers like "Artist" / "artist" / "Name".');
  }

  const set = new Set();
  let rowCount = 0;

  for(let r=1;r<grid.length;r++){
    const row = grid[r];
    rowCount++;

    const rawArtist = row[artistIdx];
    const name = cleanArtistName(rawArtist);
    if(name) set.add(name);
  }

  const list = Array.from(set);
  list.sort((a,b)=> a.localeCompare(b, "en", { sensitivity:"base" }));

  return { list, rowCount };
}

function updateAmrStatus(){
  if(!els.amrStatus) return;
  if(!amr.loaded){
    els.amrStatus.textContent = "No dataset loaded.";
    return;
  }
  els.amrStatus.textContent = `Loaded AMR data: ${amr.artistCount.toLocaleString("en-GB")} artists · ${amr.rowCount.toLocaleString("en-GB")} rows`;
}

function populateArtistSelect(){
  if(!els.fArtist) return;

  if(!amr.loaded || !amr.artistList.length){
    els.fArtist.innerHTML = `<option value="">Load AMR data first…</option>`;
    els.fArtist.disabled = true;
    if(els.artistHint) els.artistHint.textContent = "Load a CSV export from AMR to populate this list.";
    return;
  }

  const opts = [`<option value="">Select an artist…</option>`]
    .concat(amr.artistList.map(a => `<option value="${escapeHTML(a)}">${escapeHTML(a)}</option>`));

  els.fArtist.innerHTML = opts.join("");
  els.fArtist.disabled = false;
  if(els.artistHint) els.artistHint.textContent = "This list comes from your loaded AMR dataset.";
}

// ---------- FMV placeholder (same as before) ----------
function computeContextStub(item){
  const price = Number(item.purchase_price);
  if(!Number.isFinite(price) || price <= 0) return { context_now: null, movement_pct: null, engine: "—" };

  const hasDate = !!parseYYYYMM(item.purchase_month);
  const engine = (price >= 100000) ? "Mean" : "Median";
  const context_now = price * (hasDate ? 1.08 : 1.00);
  const movement_pct = hasDate ? 8 : null;
  return { context_now, movement_pct, engine };
}

// ---------- UI state ----------
let items = loadCollection();
let activeId = null;

// ---------- Render ----------
function applyFilters(list){
  const q = String(els.search?.value || "").trim().toLowerCase();
  const f = String(els.filter?.value || "all");

  return list.filter(it => {
    const text = `${it.artist} ${it.title || ""}`.toLowerCase();
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
    const hasDate = !!parseYYYYMM(it.purchase_month);
    const status = hasDate ? `<span class="badge ok">Complete</span>` : `<span class="badge warn">Needs date</span>`;
    const movement = Number.isFinite(it.movement_pct) ? `${Math.round(it.movement_pct)}%` : "—";
    const title = it.title ? ` <span class="muted">·</span> <span class="muted">${escapeHTML(it.title)}</span>` : "";
    return `
      <tr data-id="${it.id}">
        <td>
          <div style="font-weight:900">${escapeHTML(it.artist)}${title}</div>
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

function escapeHTML(s){
  return String(s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

// ---------- Drawer helpers ----------
function openDrawer(mode, item=null){
  els.drawer.classList.remove("hidden");
  els.drawer.setAttribute("aria-hidden", "false");

  // ensure artist select reflects current dataset
  populateArtistSelect();

  if(mode === "edit" && item){
    els.drawerTitle.textContent = "Edit artwork";
    els.btnSave.textContent = "Save changes";
    els.fId.value = item.id;

    // select value if present in list; else fallback to a single option
    const exists = amr.artistList.includes(item.artist);
    if(exists){
      els.fArtist.value = item.artist;
    } else {
      // if someone loaded collection before dataset, preserve their artist string
      els.fArtist.innerHTML = `<option value="${escapeHTML(item.artist)}">${escapeHTML(item.artist)}</option>` + els.fArtist.innerHTML;
      els.fArtist.value = item.artist;
      els.fArtist.disabled = false;
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

  const derived = computeContextStub(item);
  const hasDate = !!parseYYYYMM(item.purchase_month);

  els.dTitle.textContent = item.title ? `${item.artist} · ${item.title}` : item.artist;
  els.dSub.textContent = hasDate
    ? `Purchase month: ${monthLabel(item.purchase_month)}`
    : "No purchase month supplied — showing context only.";

  els.dPrice.textContent = fmtGBP(Number(item.purchase_price));
  els.dMonth.textContent = hasDate ? monthLabel(item.purchase_month) : "—";
  els.dContext.textContent = Number.isFinite(derived.context_now) ? fmtGBP(derived.context_now) : "—";
  els.dEngine.textContent = derived.engine || "—";

  els.detail.classList.remove("hidden");
  els.detail.setAttribute("aria-hidden","false");
}

function closeDetail(){
  els.detail.classList.add("hidden");
  els.detail.setAttribute("aria-hidden","true");
  activeId = null;
}

// ---------- Actions ----------
els.btnAdd?.addEventListener("click", ()=> openDrawer("add"));
els.btnAddEmpty?.addEventListener("click", ()=> openDrawer("add"));

document.querySelectorAll("[data-close='1']").forEach(el=>{
  el.addEventListener("click", closeDrawer);
});
document.querySelectorAll("[data-close-detail='1']").forEach(el=>{
  el.addEventListener("click", closeDetail);
});

// Save add/edit
els.form?.addEventListener("submit", (e)=>{
  e.preventDefault();

  const id = String(els.fId.value || "").trim();
  const artist = String(els.fArtist.value || "").trim();
  const price = Number(els.fPrice.value);
  const month = String(els.fMonth.value || "").trim();
  const title = String(els.fTitle.value || "").trim();
  const notes = String(els.fNotes.value || "").trim();

  if(!artist) return alert("Please select an artist.");
  if(!Number.isFinite(price) || price <= 0) return alert("Please enter a valid price.");
  if(month && !parseYYYYMM(month)) return alert("Purchase month must be YYYYMM (e.g. 202411).");

  if(id){
    const idx = items.findIndex(x => x.id === id);
    if(idx >= 0){
      items[idx] = {
        ...items[idx],
        artist,
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
      artist,
      purchase_price: price,
      purchase_month: month || "",
      title: title || "",
      notes: notes || "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  saveCollection(items);
  closeDrawer();
  render();
});

els.search?.addEventListener("input", ()=> render());
els.filter?.addEventListener("change", ()=> render());

// Export collection CSV (not AMR lots)
els.btnExport?.addEventListener("click", ()=>{
  const header = ["artist","title","purchase_price","purchase_month","notes"];
  const lines = [header.join(",")];

  for(const it of items){
    const row = header.map(k => {
      const v = it[k] ?? "";
      return `"${String(v).replaceAll('"','""')}"`;
    });
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
    const { list, rowCount } = buildArtistListFromAmrCSV(text);

    amr.loaded = true;
    amr.artistList = list;
    amr.artistCount = list.length;
    amr.rowCount = rowCount;

    saveAmrMeta({
      loaded: true,
      artistList: list,
      artistCount: list.length,
      rowCount
    });

    updateAmrStatus();
    populateArtistSelect();
    alert(`Loaded AMR dataset.\n\nArtists: ${list.length}\nRows: ${rowCount}`);
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

  const ok = confirm(`Remove "${item.artist}${item.title ? " · " + item.title : ""}"?`);
  if(!ok) return;

  items = items.filter(x => x.id !== activeId);
  saveCollection(items);
  closeDetail();
  render();
});

// ---------- Init ----------
(function init(){
  // hydrate AMR meta if previously loaded
  const meta = loadAmrMeta();
  if(meta?.loaded && Array.isArray(meta.artistList) && meta.artistList.length){
    amr.loaded = true;
    amr.artistList = meta.artistList;
    amr.artistCount = meta.artistCount || meta.artistList.length;
    amr.rowCount = meta.rowCount || 0;
  }

  updateAmrStatus();
  populateArtistSelect();
  render();
})();
