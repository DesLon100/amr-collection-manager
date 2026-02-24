:root{
  --bg:#f6f7fb;
  --card:#ffffff;
  --ink:#0f172a;
  --muted:#475569;
  --line:rgba(15,23,42,.10);
  --primary:#2c3a5c;
  --primary2:#1f2a44;
  --accent:#fee7b1;
  --danger:#b42318;
  --shadow:0 10px 25px rgba(2,6,23,.08);
  --radius:16px;
  --radius2:22px;
  --font: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
}

*{ box-sizing:border-box; }
html,body{ height:100%; }
body{
  margin:0;
  font-family:var(--font);
  color:var(--ink);
  background:var(--bg);
}

.wrap{
  max-width: 1100px;
  margin: 18px auto 48px;
  padding: 0 14px;
}

.topbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  padding: 10px 6px 16px;
}

.brand{ display:flex; align-items:center; gap:12px; }
.brand-mark{
  width:42px;height:42px;
  border-radius:14px;
  background:var(--primary);
  color:#fff;
  display:grid; place-items:center;
  font-weight:800;
  letter-spacing:.5px;
}
.brand-title{ font-weight:800; font-size:16px; }
.brand-sub{ font-size:12px; color:var(--muted); margin-top:2px; }

.card{
  background:var(--card);
  border:1px solid var(--line);
  border-radius:var(--radius2);
  box-shadow: var(--shadow);
}

.summary{
  display:grid;
  grid-template-columns: repeat(4, minmax(0,1fr));
  gap:12px;
  margin-bottom:12px;
}

.tile{ padding:14px 16px; }
.tile-label{ font-size:12px; color:var(--muted); }
.tile-value{ font-size:22px; font-weight:850; margin-top:6px; }
.tile-note{ margin-top:4px; font-size:12px; color:var(--muted); }

.main{ padding:18px; }
.main-head{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:14px;
  margin-bottom:14px;
}
.h1{ margin:0; font-size:20px; }
.h2{ font-weight:800; margin:0 0 6px 0; }
.muted{ color:var(--muted); }
.main-actions{ display:flex; gap:10px; align-items:center; }

.input{
  width:100%;
  border:1px solid var(--line);
  border-radius:14px;
  padding:10px 12px;
  font-size:14px;
  outline:none;
  background:#fff;
}
.input:focus{ border-color:rgba(44,58,92,.45); box-shadow:0 0 0 3px rgba(44,58,92,.12); }

.btn{
  border:1px solid var(--line);
  background:#fff;
  padding:10px 12px;
  border-radius:14px;
  cursor:pointer;
  font-weight:700;
  font-size:14px;
}
.btn.primary{
  background:var(--primary);
  border-color:transparent;
  color:#fff;
}
.btn.primary:hover{ background:var(--primary2); }
.btn.ghost{ background:#fff; }
.btn.danger{
  background:#fff;
  border-color:rgba(180,35,24,.25);
  color:var(--danger);
}
.btn.danger:hover{
  border-color:rgba(180,35,24,.45);
  background:rgba(180,35,24,.06);
}

.iconbtn{
  border:1px solid var(--line);
  background:#fff;
  width:36px;height:36px;
  border-radius:12px;
  cursor:pointer;
}

.table-wrap{ overflow:auto; border-radius:16px; }
.table{
  width:100%;
  border-collapse:separate;
  border-spacing:0;
  font-size:14px;
}
.table thead th{
  text-align:left;
  padding:10px 12px;
  border-bottom:1px solid var(--line);
  color:var(--muted);
  font-size:12px;
  font-weight:800;
  white-space:nowrap;
}
.table tbody td{
  padding:12px;
  border-bottom:1px solid var(--line);
  vertical-align:middle;
}
.table tbody tr:hover{ background:rgba(44,58,92,.04); }
.right{ text-align:right; }

.badge{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:6px 10px;
  border-radius:999px;
  font-size:12px;
  font-weight:800;
  border:1px solid var(--line);
  background:#fff;
}
.badge.warn{ background:rgba(254,231,177,.55); border-color:rgba(44,58,92,.18); }
.badge.ok{ background:rgba(44,58,92,.06); }

.kebab{
  border:1px solid var(--line);
  background:#fff;
  border-radius:12px;
  padding:6px 10px;
  cursor:pointer;
}

.empty{
  border:1px dashed rgba(44,58,92,.25);
  border-radius:18px;
  padding:18px;
  margin-top:10px;
  text-align:center;
  background: rgba(255,255,255,.75);
}
.empty-title{ font-weight:900; font-size:16px; }
.empty-sub{ color:var(--muted); margin:8px 0 12px; }

.hidden{ display:none !important; }

.drawer{
  position:fixed;
  inset:0;
  z-index:1000;
  display:grid;
  grid-template-columns: 1fr minmax(320px, 520px);
}
.drawer-backdrop{
  grid-column:1 / 2;
  background: rgba(15,23,42,.45);
}
.drawer-panel{
  grid-column:2 / 3;
  background:#fff;
  border-left:1px solid var(--line);
  box-shadow: var(--shadow);
  padding:16px;
  overflow:auto;
}
.drawer-head{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:10px;
  margin-bottom:12px;
}
.drawer-title{ font-size:16px; font-weight:900; }
.drawer-sub{ font-size:12px; }

.form{ display:flex; flex-direction:column; gap:12px; }
.field label{ font-weight:800; font-size:12px; display:block; margin-bottom:6px; }
.hint{ font-size:12px; color:var(--muted); margin-top:6px; }

.grid2{ display:grid; grid-template-columns: 1fr 1fr; gap:10px; }
.divider{ height:1px; background:var(--line); margin:2px 0; }
.drawer-actions{ display:flex; gap:10px; }

.uploadbox{
  border:1px dashed rgba(44,58,92,.25);
  border-radius:16px;
  padding:12px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
}

.detail-body{ display:flex; flex-direction:column; gap:12px; }
.inset{ padding:14px; border-radius:18px; box-shadow:none; }
.kv{
  display:grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap:12px;
}
.k{ font-size:12px; color:var(--muted); font-weight:800; }
.v{ font-size:16px; font-weight:900; margin-top:4px; }

.placeholder{
  height:180px;
  border:1px dashed rgba(44,58,92,.25);
  border-radius:18px;
  display:grid;
  place-items:center;
  color:var(--muted);
  background:rgba(44,58,92,.03);
}

.row{ display:flex; gap:10px; flex-wrap:wrap; }

@media (max-width: 980px){
  .summary{ grid-template-columns: repeat(2, minmax(0,1fr)); }
  .main-head{ flex-direction:column; }
  .drawer{ grid-template-columns: 1fr; }
  .drawer-backdrop{ grid-column:1; }
  .drawer-panel{ grid-column:1; max-width:none; }
}
