// js/app.js
// MVP collection manager: localStorage + dashboard + add/edit + detail view + CSV import/export

const STORE_KEY = "amr_collection_v1";

const els = {
  sumCount: document.getElementById("sum-count"),
  sumPaid: document.getElementById("sum-paid"),
  sumContext: document.getElementById("sum-context"),
  sumMove: document.getElementById("sum-move"),

  empty: document.getElementById("empty"),
  tableWrap: document.getElementById("table-wrap"),
  rows: document.getElementById("rows"),

  btnAdd: document.getElementById("btn-add"),
  btnAddEmpty: document.getElementById("btn-add-empty"),
  btnExport: document.getElementById("btn-export"),

  fileCsv: document.getElementById("file-csv"),

  search: document.getElementById("search"),
  filter: document.getElementById("filter"),

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

function load(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if(Array.isArray(parsed)) return parsed;
  } catch(e){}
  return [];
}

function save(items){
  localStorage.setItem(STORE_KEY, JSON.stringify(items));
}

// ---------- FMV placeholder hook ----------
function computeContextStub(item){
  const price = Number(item.purchase_price);
  if(!Number.isFinite(price) || price <= 0) return { context_now: null, movement_pct: null, engine: "—" };

  const hasDate = !!parseYYYYMM(item.purchase_month);
  const engine = (price >= 100000) ? "Mean" : "Median";
  const context_now = price * (hasDate ? 1.08 : 1.00);
  const movement_pct = hasDate ? 8 : null;
  return { context_now, movement_pct, engine };
}

// ---------- CSV parsing ----------
function normalizeHeader(h){
  return String(h || "")
    .trim()
    .toLowerCase()
    .replaceAll(" ", "_");
}

// Minimal CSV parser with quoted fields support
function parseCSV(text){
  const rows = [];
  let row = [];
  let cur = "";
  let inQuotes = false;

  for(let i=0;i<text.length;i++){
    const ch = text[i];
    const next = text[i+1];

    if(inQuotes){
      if(ch === '"' && next === '"'){ // escaped quote
        cur += '"';
        i++;
      } else if(ch === '"'){
        inQuotes = false;
      } else {
        cur += ch;
      }
      continue;
    }

    if(ch === '"'){
      inQuotes = true;
      continue;
    }

    if(ch === ","){
      row.push(cur);
      cur = "";
      continue;
    }

    if(ch === "\n"){
      row.push(cur);
      rows.push(row);
      row = [];
      cur = "";
      continue;
    }

    if(ch === "\r"){
      continue;
    }

    cur += ch;
  }

  // last field
  row.push(cur);
  rows.push(row);

  // remove trailing empty line
  if(rows.length && rows[rows.length-1].every(v => String(v).trim() === "")){
    rows.pop();
  }

  return rows;
}

function toNumberLoose(v){
  const s = String(v ?? "").trim();
  if(!s) return NaN;
  // allow "£25,000"
  const cleaned = s.replaceAll("£","").replaceAll(",","").trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

function importCSVText(text){
  const grid = parseCSV(text);
  if(grid.length < 2) return { added:0, skipped:0, errors:["CSV needs a header row plus at least one data row."] };

  const header = grid[0].map(normalizeHeader);
  const idx = (name) => header.indexOf(name);

  // support a few header aliases
  const iArtist = idx("artist") >= 0 ? idx("artist") : idx("artist_name");
  const iPrice  = idx("purchase_price") >= 0 ? idx("purchase_price") : idx("price");
  const iMonth  = idx("purchase_month") >= 0 ? idx("purchase_month") : idx("month");
  const iTitle  = idx("title");
  const iNotes  = idx("notes");

  const errors = [];
  if(iArtist < 0) errors.push('Missing required column: "artist"');
  if(iPrice  < 0) errors.push('Missing required column: "purchase_price" (or "price")');
  if(errors.length) return { added:0, skipped:0, errors };

  let added = 0, skipped = 0;

  for(let r=1;r<grid.length;r++){
    const line = grid[r];
    const artist = String(line[iArtist] ?? "").trim();
    const price = toNumberLoose(line[iPrice]);

    const monthRaw = (iMonth >= 0) ? String(line[iMonth] ?? "").trim() : "";
    const month = monthRaw ? monthRaw.replaceAll("-","").replaceAll("/","").trim() : "";

    const title = (iTitle >= 0) ? String(line[iTitle] ?? "").trim() : "";
    const notes = (iNotes >= 0) ? String(line[iNotes] ?? "").trim() : "";

    if(!artist || !Number.isFinite(price) || price <= 0){
      skipped++;
      continue;
    }
    if(month && !parseYYYYMM(month)){
      // invalid date → keep blank rather than fail import
      // (we don't want users to get blocked)
      // you can tighten later if you want
    }

    items.unshift({
      id: uid(),
      artist,
      purchase_price: price,
      purchase_month: parseYYYYMM(month) ? month : "",
      title,
      notes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    added++;
  }

  save(items);
  return { added, skipped, errors:[] };
}

// ---------- State ----------
let items = load();
let activeId = null;

// ---------- Render ----------
function applyFilters(list){
  const q = String(els.search.value || "").trim().toLowerCase();
  const f = String(els.filter.value || "all");

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

  if(mode === "edit" && item){
    els.drawerTitle.textContent = "Edit artwork";
    els.btnSave.textContent = "Save changes";
    els.fId.value = item.id;
    els.fArtist.value = item.artist || "";
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

els.form?.addEventListener("submit", (e)=>{
  e.preventDefault();

  const id = String(els.fId.value || "").trim();
  const artist = String(els.fArtist.value || "").trim();
  const price = Number(els.fPrice.value);
  const month = String(els.fMonth.value || "").trim();
  const title = String(els.fTitle.value || "").trim();
  const notes = String(els.fNotes.value || "").trim();

  if(!artist) return alert("Artist name is required.");
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

  save(items);
  closeDrawer();
  render();
});

els.search?.addEventListener("input", ()=> render());
els.filter?.addEventListener("change", ()=> render());

// Export CSV
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

// Import CSV
els.fileCsv?.addEventListener("change", async (e)=>{
  const file = e.target.files?.[0];
  if(!file) return;

  try{
    const text = await file.text();
    const res = importCSVText(text);

    if(res.errors?.length){
      alert("Import failed:\n\n" + res.errors.join("\n"));
    } else {
      alert(`Imported ${res.added} artworks.\nSkipped ${res.skipped} rows (missing artist/price).`);
      render();
    }
  } catch(err){
    alert("Could not read CSV.");
  } finally {
    // reset input so the same file can be re-selected
    els.fileCsv.value = "";
  }
});

// Seed demo data — comment out if you want blank start
if(items.length === 0){
  items = [
    { id: uid(), artist:"Andreas Achenbach", title:"(optional title)", purchase_price:25000, purchase_month:"", notes:"No date → context only", created_at:new Date().toISOString(), updated_at:new Date().toISOString() },
    { id: uid(), artist:"A R Penck", title:"U2D work", purchase_price:3445, purchase_month:"202001", notes:"Has date → movement", created_at:new Date().toISOString(), updated_at:new Date().toISOString() },
  ];
  save(items);
}

render();
