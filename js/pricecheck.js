// js/pricecheck.js

// ------------------------------------------------------------
// LocationCode -> "Auction house · CITY" mapping (197 entries)
// ------------------------------------------------------------
const LOCATION_LOOKUP = {
  "33AUBALI": "33 Auction · BALI",
  "33AUJAKA": "33 Auction · JAKARTA",
  "33AUONLI": "33 Auction · ONLINE",
  "33AUOSGD": "33 Auction · ONLINE SGD",
  "33AUSING": "33 Auction · SINGAPORE",
  "ARTCDROU": "Artcurial · DROUOT",
  "ARTCMARR": "Artcurial · MARRAKESH",
  "ARTCMCAR": "Artcurial · MONTE CARLO",
  "ARTCOEUR": "Artcurial · ONLINE EUR",
  "ARTCPARI": "Artcurial · PARIS",
  "ARTHLAGO": "ArtHouseNG · LAGOS",
  "AUCTONLI": "Auctionsverket · ONLINE",
  "AUCTOSEK": "Auctionsverket · ONLINE SEK",
  "AUCTSTOC": "Auctionsverket · STOCKHOLM",
  "AUCTOLDD": "Auctionsverket · ONLINE DKK",
  "AUCTOEUR": "Auctionsverket · ONLINE EUR",
  "AUCTOUSD": "Auctionsverket · ONLINE USD",
  "CHPOBEIJ": "Beijing Poly Intl · BEIJING",
  "CHPOHONG": "Beijing Poly Intl · HONG KONG",
  "BONHBRED": "Bonhams · BREDGATE",
  "BONHEDIN": "Bonhams · EDINBURGH",
  "BONHHONG": "Bonhams · HONG KONG",
  "BONHLOND": "Bonhams · LONDON",
  "BONHLOSA": "Bonhams · LOS ANGELES",
  "BONHMARL": "Bonhams · MARLBOROUGH",
  "BONHMELB": "Bonhams · MELBOURNE",
  "BONHNEWY": "Bonhams · NEW YORK",
  "BONHONLI": "Bonhams · ONLINE",
  "BONHOAUD": "Bonhams · ONLINE AUD",
  "BONHOHCF": "Bonhams · ONLINE CHF",
  "BONHODKK": "Bonhams · ONLINE DKK",
  "BONHOEUR": "Bonhams · ONLINE EUR",
  "BONHOGBP": "Bonhams · ONLINE GBP",
  "BONHOHKD": "Bonhams · ONLINE HKD",
  "BONHOUSD": "Bonhams · ONLINE USD",
  "BONHOXFO": "Bonhams · OXFORD",
  "BONHPARI": "Bonhams · PARIS",
  "BONHSANF": "Bonhams · SAN FRANCISCO",
  "BONHSYDN": "Bonhams · SYDNEY",
  "BONHBRUS": "Bonhams · BRUSSELS",
  "BUKOHELS": "Bukowskis · HELSINKY",
  "BUKOONLI": "Bukowskis · ONLINE",
  "BUKOOEUR": "Bukowskis · ONLINE EUR",
  "BUKOOSEK": "Bukowskis · ONLINE SEK",
  "BUKOSTOC": "Bukowskis · STOCKHOLM",
  "CHGUBEIJ": "China Guardian · BEIJING",
  "CHGUHONG": "China Guardian · HONG KONG",
  "CHRIAMST": "Christie's · AMSTERDAM",
  "CHRIDOHA": "Christie's · DOHA",
  "CHRIDUBA": "Christie's · DUBAI",
  "CHRIGENE": "Christie's · GENEVA",
  "CHRIHONG": "Christie's · HONG KONG",
  "CHRILOND": "Christie's · LONDON",
  "CHRIMILA": "Christie's · MILAN",
  "CHRINEWY": "Christie's · NEW YORK",
  "CHRIONLI": "Christie's · ONLINE",
  "CHRIOHCF": "Christie's · ONLINE CHF",
  "CHRIOEUR": "Christie's · ONLINE EUR",
  "CHRIOGBP": "Christie's · ONLINE GBP",
  "CHRIOHKD": "Christie's · ONLINE HKD",
  "CHRIOUSD": "Christie's · ONLINE USD",
  "CHRIPARI": "Christie's · PARIS",
  "CHRISHAN": "Christie's · SHANGHAI",
  "CHRIZURI": "Christie's · ZURICH",
  "AGUTDROU": "Claude Aguttes · DROUOT",
  "AGUTLYON": "Claude Aguttes · LYON",
  "AGUTNEUI": "Claude Aguttes · NEUILLY",
  "AGUTONLI": "Claude Aguttes · ONLINE",
  "AGUTOEUR": "Claude Aguttes · ONLINE EUR",
  "AGUTPARI": "Claude Aguttes · PARIS",
  "COUEONLI": "Couer D'Alene · ONLINE",
  "COUERENO": "Couer D'Alene · RENO",
  "DOROGRAZ": "Dorotheum · GRAZ",
  "DOROKLAG": "Dorotheum · KLAGENFURT",
  "DOROLINZ": "Dorotheum · LINZ",
  "DOROONLI": "Dorotheum · ONLINE",
  "DOROOEUR": "Dorotheum · ONLINE EUR",
  "DOROPRAG": "Dorotheum · PRAGUE",
  "DOROSALZ": "Dorotheum · SALZBURG",
  "DOROWIEN": "Dorotheum · WIEN",
  "DOYLNEWY": "Doyle · NEW YORK",
  "FARSCORT": "Farsetti · CORTINA",
  "FARSMILA": "Farsetti · MILAN",
  "FARSONLI": "Farsetti · ONLINE",
  "FARSOEUR": "Farsetti · ONLINE EUR",
  "FARSPRAT": "Farsetti · PRATO",
  "HEFFONLI": "Heffel · ONLINE",
  "HEFFOCAD": "Heffel · ONLINE CAD",
  "HEFFTORO": "Heffel · TORONTO",
  "HEFFVANC": "Heffel · VANCOUVER",
  "HERINEWY": "Heritage · NEW YORK",
  "KORNBASE": "Kornfeld · BASEL",
  "KORNBERN": "Kornfeld · BERN",
  "KORNONLI": "Kornfeld · ONLINE",
  "KORNOHCF": "Kornfeld · ONLINE CHF",
  "LARABALI": "Larasati · BALI",
  "LARAJAKA": "Larasati · JAKARTA",
  "LARALOND": "Larasati · LONDON",
  "LARAOGBP": "Larasati · ONLINE GBP",
  "LARAOSGD": "Larasati · ONLINE SGD",
  "LARASING": "Larasati · SINGAPORE",
  "LEMPBERL": "Lempertz · BERLIN",
  "LEMPBRUS": "Lempertz · BRUSSELS",
  "LEMPCOLO": "Lempertz · COLOGNE",
  "LEMPOEUR": "Lempertz · ONLINE EUR",
  "LJOEMELB": "Leonard Joel · MELBOURNE",
  "LJOEONLI": "Leonard Joel · ONLINE",
  "LJOEOAUD": "Leonard Joel · ONLINE AUD",
  "LJOESYAR": "Leonard Joel · SOUTH YARA",
  "LJOESYDN": "Leonard Joel · SYDNEY",
  "LJOEWOOL": "Leonard Joel · WOOLHARA",
  "MEETONLI": "Meeting Art · ONLINE",
  "MEETVERC": "Meeting Art · VERCELLI",
  "MORTMEXC": "Morton Subastas · MEXICO CITY",
  "MORTOMXN": "Morton Subastas · ONLINE MXN",
  "PANDFLOR": "Pandolfini · FLORENCE",
  "PANDMILA": "Pandolfini · MILAN",
  "PANDONLI": "Pandolfini · ONLINE",
  "PANDOEUR": "Pandolfini · ONLINE EUR",
  "PHILGENE": "Phillips · GENEVA",
  "PHILHONG": "Phillips · HONG KONG",
  "PHILLOND": "Phillips · LONDON",
  "PHILMOSC": "Phillips · MOSCOW",
  "PHILNEWY": "Phillips · NEW YORK",
  "PHILONLI": "Phillips · ONLINE",
  "PHILOHCF": "Phillips · ONLINE CHF",
  "PHILOEUR": "Phillips · ONLINE EUR",
  "PHILOGBP": "Phillips · ONLINE GBP",
  "PHILOHKD": "Phillips · ONLINE HKD",
  "PHILOIDR": "Phillips · ONLINE IDR",
  "PHILOUSD": "Phillips · ONLINE USD",
  "PHILPARI": "Phillips · PARIS",
  "PHILTAIP": "Phillips · TAIPEI",
  "PHILTOKY": "Phillips · TOKYO",
  "RASMBRED": "Rasmussen · BREDGATE",
  "RASMONLI": "Rasmussen · ONLINE",
  "RASMODKK": "Rasmussen · ONLINE DKK",
  "RAVEONLI": "Ravenel · ONLINE",
  "RAVEONTD": "Ravenel · ONLINE NTD",
  "RAVETAIP": "Ravenel · TAIPEI",
  "SAFFKOCH": "Saffron Art · KOCHI",
  "SAFFMUMB": "Saffron Art · MUMBAI",
  "SAFFNDEL": "Saffron Art · NEW DELHI",
  "SAFFONLI": "Saffron Art · ONLINE",
  "SAFFOINR": "Saffron Art · ONLINE INR",
  "SALCMANI": "Salcedo · MANILA",
  "SALCONLI": "Salcedo · ONLINE",
  "SALCOPHP": "Salcedo · ONLINE PHP",
  "SEOUBUSA": "Seoul · BUSAN",
  "SEQUDAEG": "Seoul · DAEGU",
  "SEOUHONG": "Seoul · HONG KONG",
  "SEOUONLI": "Seoul · ONLINE",
  "SEOUOKRW": "Seoul · ONLINE KRW",
  "SEOUSEUL": "Seoul · SEOUL",
  "SMSIMELB": "Smith & Singer · MELBOURNE",
  "SMSIONLI": "Smith & Singer · ONLINE",
  "SMSISYDN": "Smith & Singer · SYDNEY",
  "SOTHCOLO": "Sotheby's · COLOGNE",
  "SOTHDOHA": "Sotheby's · DOHA",
  "SOTHDUBA": "Sotheby's · DUBAI",
  "SOTHGENE": "Sotheby's · GENEVA",
  "SOTHHONG": "Sotheby's · HONG KONG",
  "SOTHLASV": "Sotheby's · LAS VEGAS",
  "SOTHLOND": "Sotheby's · LONDON",
  "SOTHMIAM": "Sotheby's · MIAMI",
  "SOTHMILA": "Sotheby's · MILAN",
  "SOTHMCAR": "Sotheby's · MONTE CARLO",
  "SOTHMUMB": "Sotheby's · MUMBAI",
  "SOTHNEWY": "Sotheby's · NEW YORK",
  "SOTHONLI": "Sotheby's · ONLINE",
  "SOTHOCHF": "Sotheby's · ONLINE CHF",
  "SOTHOEUR": "Sotheby's · ONLINE EUR",
  "SOTHOGBP": "Sotheby's · ONLINE GBP",
  "SOTHOHKD": "Sotheby's · ONLINE HKD",
  "SOTHOIDR": "Sotheby's · ONLINE IDR",
  "SOTHOUSD": "Sotheby's · ONLINE USD",
  "SOTHPARI": "Sotheby's · PARIS",
  "SOTHSING": "Sotheby's · SINGAPORE",
  "SOTHZURI": "Sotheby's · ZURICH",
  "SWELCAPE": "Stephan Welz · CAPE TOWN",
  "SWELJOHA": "Stephan Welz · JOHANNESBURG",
  "SWELONLI": "Stephan Welz · ONLINE",
  "SWELOZAR": "Stephan Welz · ONLINE ZAR",
  "STRACAPE": "Strauss · CAPE TOWN",
  "STRAJOHA": "Strauss · JOHANNESBURG",
  "STRAONLI": "Strauss · ONLINE",
  "STRAOZAR": "Strauss · ONLINE ZAR",
  "SWANNEWY": "Swann · NEW YORK",
  "TAJAONLI": "Tajan · ONLINE",
  "TAJAOEUR": "Tajan · ONLINE EUR",
  "TAJAPARI": "Tajan · PARIS",
  "TEHATEHR": "Tehran Auction · TEHRAN",
  "VGRIBERL": "Villa Grisebach · BERLIN",
  "VGRIONLI": "Villa Grisebach · ONLINE",
  "VGRIOEUR": "Villa Grisebach · ONLINE EUR",
  "ARTCBASE": "Artcurial · BASEL",
  "ARTCOCHF": "Artcurial · ONLINE EUR",
  "AUCTHELS": "Auktionsverket · HELSINKY",
  "SOTHSAAR": "Sothebys · SAUDI ARABIA"
};

// Convert "House · CITY" -> "House (City)" for tooltips
function locationLabel(code){
  const c = String(code || "").trim();
  if(!c) return "—";
  const raw = LOCATION_LOOKUP[c] || c;

  if(raw.includes("·")){
    const [houseRaw, cityRaw] = raw.split("·").map(s => s.trim());
    const city = String(cityRaw || "")
      .toLowerCase()
      .replace(/\b\w/g, ch => ch.toUpperCase());
    return `${houseRaw} (${city})`;
  }
  return raw;
}

function fmtGBP(x){
  if(!Number.isFinite(x)) return "—";
  return "£" + Math.round(x).toLocaleString("en-GB");
}

function weightedQuantile(values, weights, q){
  const arr = [];
  for(let i=0;i<values.length;i++){
    const v = values[i];
    const w = weights[i];
    if(!Number.isFinite(v) || !Number.isFinite(w) || w <= 0) continue;
    arr.push({ v, w });
  }
  if(!arr.length) return NaN;

  arr.sort((a,b)=>a.v-b.v);

  let total = 0;
  for(const a of arr) total += a.w;
  if(!(total > 0)) return NaN;

  const target = q * total;
  let cum = 0;
  for(const a of arr){
    cum += a.w;
    if(cum >= target) return a.v;
  }
  return arr[arr.length-1].v;
}

function parseYYYYMM(s){
  const t = String(s || "").trim();
  if(!/^\d{6}$/.test(t)) return null;
  const y = Number(t.slice(0,4));
  const m = Number(t.slice(4,6));
  if(!Number.isFinite(y) || !Number.isFinite(m) || m < 1 || m > 12) return null;
  return new Date(Date.UTC(y, m-1, 1));
}

function addMonthsUTC(d, deltaMonths){
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + deltaMonths, 1));
}

function monthStartUTC(d){
  if(!(d instanceof Date)) return null;
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
}

function monthIndexUTC(d){
  return d.getUTCFullYear() * 12 + d.getUTCMonth();
}

function monthFromIndexUTC(idx){
  const y = Math.floor(idx / 12);
  const m = idx - y * 12;
  return new Date(Date.UTC(y, m, 1));
}

function buildMonthRangeUTC(minDate, maxDate){
  const a = monthIndexUTC(monthStartUTC(minDate));
  const b = monthIndexUTC(monthStartUTC(maxDate));
  const months = [];
  for(let i = a; i <= b; i++){
    months.push(monthFromIndexUTC(i));
  }
  return months;
}

function monthKeyUTC(d){
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${y}${m}`;
}

function windowN(allRows, endDate, months){
  const start = addMonthsUTC(endDate, -(months - 1));
  return allRows.filter(r => r.date >= start && r.date <= endDate);
}

function ols(xs, ys){
  const n = xs.length;
  if(n < 2) return null;

  let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for(let i=0;i<n;i++){
    const x = xs[i], y = ys[i];
    sx += x; sy += y;
    sxx += x * x;
    sxy += x * y;
  }
  const denom = (n * sxx - sx * sx);
  if(denom === 0) return null;

  const b = (n * sxy - sx * sy) / denom;
  const a = (sy - b * sx) / n;
  return { a, b };
}

// CSV fields (coming cleanly from loaded lots)
function getLocationCode(r){ return String(r.LocationCode ?? "").trim(); }
function getLotNo(r){ return String(r.LotNo ?? "").trim() || "—"; }
function getSaleURL(r){ return String(r.SaleURL ?? "").trim(); }

// ------------------------------------------------------------
// Shared: build benchmarks + regressions for an artist
// ------------------------------------------------------------
function buildBenchmarks({ workbench, artistId }){
  const all = workbench.getLotRows()
    .filter(r => r.id === artistId && Number.isFinite(r.price) && r.date)
    .sort((a,b)=>a.date-b.date);

  if(all.length < 10) throw new Error("Not enough auction history.");

  const TRANSPORT_WINDOW_MONTHS = 24;
  const MIN_SALES_IN_WINDOW = 10;

  const months = buildMonthRangeUTC(all[0].date, all[all.length-1].date);
  const allM = all.map(r => ({ ...r, _m: monthStartUTC(r.date) }));

  let startPtr = 0;
  let endPtr = 0;

  const p50T = [];
  const p50Vals = [];

  const meanT = [];
  const meanVals = [];

  const monthToT = new Map(); // endMonthKey -> t index

  for(let i=0;i<months.length;i++){
    const endMonth = months[i];
    const startMonth = addMonthsUTC(endMonth, -(TRANSPORT_WINDOW_MONTHS - 1));

    while(endPtr < allM.length && allM[endPtr]._m <= endMonth) endPtr++;
    while(startPtr < allM.length && allM[startPtr]._m < startMonth) startPtr++;

    const win = allM.slice(startPtr, endPtr);
    if(win.length < MIN_SALES_IN_WINDOW) continue;

    // month weights
    const MIN_SALES_PER_MONTH = 5;
    const monthCounts = new Map();
    for(const r of win){
      const k = monthKeyUTC(r._m);
      monthCounts.set(k, (monthCounts.get(k) || 0) + 1);
    }

    const vals = [];
    const wts  = [];
    for(const r of win){
      const v = r.price;
      if(!Number.isFinite(v)) continue;
      const k = monthKeyUTC(r._m);
      const c = monthCounts.get(k) || 1;
      vals.push(v);
      wts.push(1 / Math.max(c, MIN_SALES_PER_MONTH));
    }
    if(vals.length < MIN_SALES_IN_WINDOW) continue;

    const med = weightedQuantile(vals, wts, 0.5);
    if(!Number.isFinite(med) || med <= 0) continue;

    let wSum = 0, vwSum = 0;
    for(let j=0;j<vals.length;j++){
      const v = vals[j], w = wts[j];
      wSum += w;
      vwSum += v * w;
    }
    const mean = (wSum > 0) ? (vwSum / wSum) : NaN;
    if(!Number.isFinite(mean) || mean <= 0) continue;

    p50T.push(i);
    p50Vals.push(med);

    meanT.push(i);
    meanVals.push(mean);

    monthToT.set(monthKeyUTC(endMonth), i);
  }

  const regP50  = (p50T.length  >= 2) ? ols(p50T,  p50Vals.map(v => Math.log(v))) : null;
  const regMean = (meanT.length >= 2) ? ols(meanT, meanVals.map(v => Math.log(v))) : null;

  return { all, months, monthToT, regP50, regMean, TRANSPORT_WINDOW_MONTHS, MIN_SALES_IN_WINDOW };
}

function trendAtMonth({ regObj, monthToT, monthUTC }){
  const t = monthToT.get(monthKeyUTC(monthStartUTC(monthUTC)));
  if(!regObj || !Number.isFinite(t)) return NaN;
  const v = Math.exp(regObj.a + regObj.b * t);
  return (Number.isFinite(v) && v > 0) ? v : NaN;
}

function impliedValueAtWith({
  all,
  monthToT,
  regObj,
  purchaseMonth,
  targetMonthUTC,
  price,
  TRANSPORT_WINDOW_MONTHS,
  MIN_SALES_IN_WINDOW
}){
  if(!regObj || !Number.isFinite(price) || price <= 0) return null;

  const tInput  = monthToT.get(monthKeyUTC(monthStartUTC(purchaseMonth)));
  const tTarget = monthToT.get(monthKeyUTC(monthStartUTC(targetMonthUTC)));

  if(!Number.isFinite(tInput) || !Number.isFinite(tTarget)) return null;

  const winInput  = windowN(all, monthStartUTC(purchaseMonth), TRANSPORT_WINDOW_MONTHS);
  const winTarget = windowN(all, monthStartUTC(targetMonthUTC), TRANSPORT_WINDOW_MONTHS);

  if(winInput.length < MIN_SALES_IN_WINDOW || winTarget.length < MIN_SALES_IN_WINDOW) return null;

  const pInput  = Math.exp(regObj.a + regObj.b * tInput);
  const pTarget = Math.exp(regObj.a + regObj.b * tTarget);

  if(!Number.isFinite(pInput) || !Number.isFinite(pTarget) || pInput <= 0 || pTarget <= 0) return null;

  return price * (pTarget / pInput);
}

function pickEngine({ price, purchaseMonth, regP50, regMean, monthToT }){
  const p50At  = trendAtMonth({ regObj: regP50,  monthToT, monthUTC: purchaseMonth });
  const meanAt = trendAtMonth({ regObj: regMean, monthToT, monthUTC: purchaseMonth });

  // default
  let engine = "p50";

  const hasP50  = Number.isFinite(p50At);
  const hasMean = Number.isFinite(meanAt);

  if(!hasP50 && hasMean) return "mean";
  if(hasP50 && !hasMean) return "p50";
  if(!hasP50 && !hasMean) return "p50";

  // distance in log space
  const dP50  = Math.abs(Math.log(price) - Math.log(p50At));
  const dMean = Math.abs(Math.log(price) - Math.log(meanAt));
  engine = (dMean < dP50) ? "mean" : "p50";

  return engine;
}

// ------------------------------------------------------------
// Compute-only API (used by Collection Manager table)
// ------------------------------------------------------------
export function computePriceCheckMetrics({
  workbench,
  artistId,
  price,
  myMonthYYYYMM
}){
  const { all, months, monthToT, regP50, regMean, TRANSPORT_WINDOW_MONTHS, MIN_SALES_IN_WINDOW } =
    buildBenchmarks({ workbench, artistId });

  const latestDate = all[all.length - 1].date;

  const userMonthDate = parseYYYYMM(myMonthYYYYMM);
  const hasUserMonth = !!userMonthDate;

  const artworkDate = userMonthDate || latestDate;
  const purchaseMonth = monthStartUTC(artworkDate);

  const engine = pickEngine({ price, purchaseMonth, regP50, regMean, monthToT });
  const activeReg = (engine === "mean") ? regMean : regP50;

  // context now (latest month)
  const contextNow = impliedValueAtWith({
    all,
    monthToT,
    regObj: activeReg,
    purchaseMonth,
    targetMonthUTC: monthStartUTC(latestDate),
    price,
    TRANSPORT_WINDOW_MONTHS,
    MIN_SALES_IN_WINDOW
  });

  // 12-month movement (ONLY if user actually gave a purchase month)
  let movementPct = null;
  if(hasUserMonth){
    const plus12 = addMonthsUTC(purchaseMonth, 12);
    // clamp into month range available
    const minM = months[0];
    const maxM = months[months.length - 1];
    const target12 = (plus12 < minM) ? minM : (plus12 > maxM ? maxM : plus12);

    const v12 = impliedValueAtWith({
      all,
      monthToT,
      regObj: activeReg,
      purchaseMonth,
      targetMonthUTC: target12,
      price,
      TRANSPORT_WINDOW_MONTHS,
      MIN_SALES_IN_WINDOW
    });

    if(Number.isFinite(v12) && Number.isFinite(price) && price > 0){
      movementPct = ((v12 / price) - 1) * 100;
    }
  }

  return {
    engine,                 // "mean" | "p50"
    contextNow: Number.isFinite(contextNow) ? contextNow : NaN,
    movementPct: Number.isFinite(movementPct) ? movementPct : NaN
  };
}

// ------------------------------------------------------------
// Movement slider (FMV) — DATE axis, bubbles show £ values
// ------------------------------------------------------------
function renderMovement(el, {
  purchaseMonth,
  targetMonth,
  price,
  equivNow,
  captionText = "",
  rightLabel = "Revaluation" // caller decides wording
}){
  if(!el) return;

  if(!(purchaseMonth instanceof Date) || !(targetMonth instanceof Date)){
    el.innerHTML = "";
    return;
  }
  if(!Number.isFinite(price) || !Number.isFinite(equivNow)){
    el.innerHTML = "";
    return;
  }

  const x0 = monthStartUTC(purchaseMonth);
  const x1 = monthStartUTC(targetMonth);

  const minX = (x0 < x1) ? addMonthsUTC(x0, -6) : addMonthsUTC(x1, -6);
  const maxX = (x0 > x1) ? addMonthsUTC(x0,  6) : addMonthsUTC(x1,  6);

  const ann = [
    {
      x: x0, y: 0,
      xref:"x", yref:"y",
      text: `My Artwork<br><b>${fmtGBP(price)}</b>`,
      showarrow:false,
      xanchor:"center",
      yanchor:"bottom",
      yshift: 18,
      align:"center",
      font:{size:12, color:"#111"},
      bgcolor:"#fee7b1",
      bordercolor:"#2c3a5c",
      borderwidth:2,
      borderpad:6
    },
    {
      x: x1, y: 0,
      xref:"x", yref:"y",
      text: `${rightLabel}<br><b>${fmtGBP(equivNow)}</b>`,
      showarrow:false,
      xanchor:"center",
      yanchor:"bottom",
      yshift: 18,
      align:"center",
      font:{size:12, color:"#fff"},
      bgcolor:"#2c3a5c",
      bordercolor:"#2c3a5c",
      borderwidth:2,
      borderpad:6
    }
  ];

  Plotly.newPlot(el, [
    {
      x:[minX, maxX], y:[0,0],
      mode:"lines",
      line:{width:12,color:"rgba(44,58,92,0.10)"},
      hoverinfo:"skip",
      showlegend:false
    },
    {
      x:[x0], y:[0],
      mode:"markers",
      marker:{size:12,color:"#fee7b1",line:{width:3,color:"#2c3a5c"}},
      hoverinfo:"skip",
      showlegend:false
    },
    {
      x:[x1], y:[0],
      mode:"markers",
      marker:{size:11,color:"#2c3a5c"},
      hoverinfo:"skip",
      showlegend:false
    }
  ],{
    margin:{l:34,r:34,t:64,b:56},
    xaxis:{
      type:"date",
      range:[minX, maxX],
      showgrid:false,
      zeroline:false,
      showline:false,
      ticks:"outside",
      ticklen:4,
      tickformat:"%Y",
      dtick:"M24",
      automargin:true,
      showticklabels:true
    },
    yaxis:{visible:false, range:[-1.2, 0.9]},
    annotations: ann,
    paper_bgcolor:"rgba(0,0,0,0)",
    plot_bgcolor:"rgba(0,0,0,0)"
  },{displayModeBar:false, responsive:true});

  const capEl = document.getElementById("pc-move-caption");
  if(capEl) capEl.textContent = captionText;
}

// ------------------------------------------------------------
// Full chart renderer (Plotly scatter + movement panel behaviour)
// ------------------------------------------------------------
export function runPriceCheck({
  workbench,
  artistId,
  price,
  myMonthYYYYMM,
  yScale,
  elChart
}){
  const { all, months, monthToT, regP50, regMean, TRANSPORT_WINDOW_MONTHS, MIN_SALES_IN_WINDOW } =
    buildBenchmarks({ workbench, artistId });

  const latestDate = all[all.length - 1].date;

  const userMonthDate = parseYYYYMM(myMonthYYYYMM);
  const hasUserMonth = !!userMonthDate;

  const artworkDate = userMonthDate || latestDate;
  const purchaseMonth = monthStartUTC(artworkDate);

  const engine = pickEngine({ price, purchaseMonth, regP50, regMean, monthToT });
  const activeReg = (engine === "mean") ? regMean : regP50;

  // Scatter universe
  const x = all.map(r=>r.date);
  const y = all.map(r=>r.price);

  const customdata = all.map(r => [
    locationLabel(getLocationCode(r)),
    getLotNo(r),
    getSaleURL(r)
  ]);

  const hovertemplate =
    "%{x|%b %Y}<br>" +
    "<b>£%{y:,.0f}</b><br>" +
    "%{customdata[0]}<br>" +
    "Lot %{customdata[1]}" +
    "<extra>Click dot to open sale</extra>";

  const baseTrace = {
    x, y, customdata,
    type:"scattergl",
    mode:"markers",
    marker:{size:6, color:"#2f3b63"},
    hovertemplate,
    showlegend:false,
    meta:"pc_base"
  };

  // Build visible lines for chosen engine (rolling + regression)
  // We don’t need to return both engines here — we already picked one.
  // But we *do* want the movement UI to show selected engine copy.
  // We’ll compute rolling series for both (cheap) and toggle visibility.

  // Rolling series (recompute using the same loop as buildBenchmarks but collecting dates/vals)
  const allM = all.map(r => ({ ...r, _m: monthStartUTC(r.date) }));
  let startPtr = 0;
  let endPtr = 0;

  const p50Dates = [], p50Vals = [], p50T = [];
  const meanDates = [], meanVals = [], meanT = [];

  for(let i=0;i<months.length;i++){
    const endMonth = months[i];
    const startMonth = addMonthsUTC(endMonth, -(TRANSPORT_WINDOW_MONTHS - 1));

    while(endPtr < allM.length && allM[endPtr]._m <= endMonth) endPtr++;
    while(startPtr < allM.length && allM[startPtr]._m < startMonth) startPtr++;

    const win = allM.slice(startPtr, endPtr);
    if(win.length < MIN_SALES_IN_WINDOW) continue;

    const MIN_SALES_PER_MONTH = 5;
    const monthCounts = new Map();
    for(const r of win){
      const k = monthKeyUTC(r._m);
      monthCounts.set(k, (monthCounts.get(k) || 0) + 1);
    }

    const vals = [];
    const wts  = [];
    for(const r of win){
      const v = r.price;
      if(!Number.isFinite(v)) continue;
      const k = monthKeyUTC(r._m);
      const c = monthCounts.get(k) || 1;
      vals.push(v);
      wts.push(1 / Math.max(c, MIN_SALES_PER_MONTH));
    }
    if(vals.length < MIN_SALES_IN_WINDOW) continue;

    const med = weightedQuantile(vals, wts, 0.5);
    if(Number.isFinite(med) && med > 0){
      p50Dates.push(endMonth);
      p50Vals.push(med);
      p50T.push(i);
    }

    let wSum = 0, vwSum = 0;
    for(let j=0;j<vals.length;j++){
      wSum += wts[j];
      vwSum += vals[j] * wts[j];
    }
    const mean = (wSum > 0) ? (vwSum / wSum) : NaN;
    if(Number.isFinite(mean) && mean > 0){
      meanDates.push(endMonth);
      meanVals.push(mean);
      meanT.push(i);
    }
  }

  const regP50Dates = [], regP50Vals = [];
  if(regP50){
    for(let i=0;i<months.length;i++){
      const v = Math.exp(regP50.a + regP50.b * i);
      if(Number.isFinite(v) && v > 0){
        regP50Dates.push(months[i]);
        regP50Vals.push(v);
      }
    }
  }

  const regMeanDates = [], regMeanVals = [];
  if(regMean){
    for(let i=0;i<months.length;i++){
      const v = Math.exp(regMean.a + regMean.b * i);
      if(Number.isFinite(v) && v > 0){
        regMeanDates.push(months[i]);
        regMeanVals.push(v);
      }
    }
  }

  const p50Trace = (p50Dates.length >= 2) ? {
    x:p50Dates,
    y:p50Vals,
    type:"scatter",
    mode:"lines",
    line:{width:3.5, color:"rgba(47,59,99,0.45)"},
    hovertemplate:"24M rolling median (p50)<br>%{x|%b %Y}<br><b>£%{y:,.0f}</b><extra></extra>",
    showlegend:false,
    visible:false,
    meta:"pc_p50_24"
  } : null;

  const regP50Trace = (regP50Dates.length >= 2) ? {
    x:regP50Dates,
    y:regP50Vals,
    type:"scatter",
    mode:"lines",
    line:{width:4.5, color:"rgba(47,59,99,0.90)"},
    hovertemplate:"Trend line (regression through rolling p50)<br>%{x|%b %Y}<br><b>£%{y:,.0f}</b><extra></extra>",
    showlegend:false,
    visible:false,
    meta:"pc_p50_reg"
  } : null;

  const meanTrace = (meanDates.length >= 2) ? {
    x:meanDates,
    y:meanVals,
    type:"scatter",
    mode:"lines",
    line:{width:3.5, color:"rgba(47,59,99,0.45)"},
    hovertemplate:"24M rolling mean (arith)<br>%{x|%b %Y}<br><b>£%{y:,.0f}</b><extra></extra>",
    showlegend:false,
    visible:false,
    meta:"pc_mean_24"
  } : null;

  const regMeanTrace = (regMeanDates.length >= 2) ? {
    x:regMeanDates,
    y:regMeanVals,
    type:"scatter",
    mode:"lines",
    line:{width:4.5, color:"rgba(47,59,99,0.90)"},
    hovertemplate:"Trend line (regression through rolling mean)<br>%{x|%b %Y}<br><b>£%{y:,.0f}</b><extra></extra>",
    showlegend:false,
    visible:false,
    meta:"pc_mean_reg"
  } : null;

  const myArtworkTrace = Number.isFinite(price) ? {
    x:[purchaseMonth],
    y:[price],
    type:"scattergl",
    mode:"markers",
    marker:{size:14, color:"#fee7b1", line:{width:3, color:"#2c3a5c"}},
    hovertemplate:`My Artwork<br>%{x|%b %Y}<br><b>${fmtGBP(price)}</b><extra></extra>`,
    showlegend:false,
    meta:"pc_myartwork"
  } : null;

  // Revaluation dot on scatter
  const revalTrace = {
    x:[monthStartUTC(latestDate)],
    y:[NaN],
    type:"scattergl",
    mode:"markers",
    marker:{size:12, color:"#2c3a5c"},
    hovertemplate:"Revaluation<br>%{x|%b %Y}<br><b>£%{y:,.0f}</b><extra></extra>",
    showlegend:false,
    visible:false,
    meta:"pc_reval"
  };

  const traces = [baseTrace];
  if(p50Trace) traces.push(p50Trace);
  if(regP50Trace) traces.push(regP50Trace);
  if(meanTrace) traces.push(meanTrace);
  if(regMeanTrace) traces.push(regMeanTrace);
  if(myArtworkTrace) traces.push(myArtworkTrace);
  traces.push(revalTrace);

  const plotPromise = Plotly.newPlot(elChart, traces, {
    margin:{l:56,r:22,t:26,b:48},
    yaxis:{type:(yScale==="log")?"log":"linear"},
    xaxis:{type:"date"},
    hovermode:"closest",
    paper_bgcolor:"rgba(0,0,0,0)",
    plot_bgcolor:"rgba(0,0,0,0)"
  }, {responsive:true, displayModeBar:false});

  // click-through
  elChart.on?.("plotly_click", (ev) => {
    const pt = ev?.points?.[0];
    const url = pt?.customdata?.[2];
    if(url) window.open(url, "_blank", "noopener,noreferrer");
  });

  const equivLatest = impliedValueAtWith({
    all,
    monthToT,
    regObj: activeReg,
    purchaseMonth,
    targetMonthUTC: monthStartUTC(latestDate),
    price,
    TRANSPORT_WINDOW_MONTHS,
    MIN_SALES_IN_WINDOW
  });

  const FMV_COPY =
    "Fair market value is best estimated from the market’s central tendency, not its extremes.\n" +
    "This module calculates a 24-month rolling benchmark of auction prices and fits a trend line.\n" +
    (engine === "mean"
      ? "Because your price point sits closer to the mean trend, we select the arithmetic mean for context against the “My Artwork” price."
      : "Because your price point sits closer to the median trend, we select the rolling median (p50) for context against the “My Artwork” price.");

  plotPromise.then(() => {
    const gd = elChart;

    const DARK_DOT  = "#2f3b63";
    const LIGHT_DOT = "#9bb7e0";

    const data = (gd && gd.data) ? gd.data : [];
    const idxBase   = data.findIndex(t => t && t.meta === "pc_base");
    const idxP50    = data.findIndex(t => t && t.meta === "pc_p50_24");
    const idxP50Reg = data.findIndex(t => t && t.meta === "pc_p50_reg");
    const idxMean   = data.findIndex(t => t && t.meta === "pc_mean_24");
    const idxMeanReg= data.findIndex(t => t && t.meta === "pc_mean_reg");
    const idxRev    = data.findIndex(t => t && t.meta === "pc_reval");

    let btn = document.getElementById("pc-move-toggle");
    const panel  = document.getElementById("pc-move");
    const moveEl = document.getElementById("pc-move-chart");

    const optin = document.getElementById("pc-add-target");
    const box   = document.getElementById("pc-target-ui");
    const input = document.getElementById("pc-target-month");
    const hint  = document.getElementById("pc-target-hint");

    const contextEl = document.getElementById("pc-context-text");
    if(contextEl){
      contextEl.textContent = FMV_COPY;
      contextEl.style.whiteSpace = "pre-line";
    }

    if(!btn || !panel || !moveEl) return;

    // Kill previous click listeners
    const btnClone = btn.cloneNode(true);
    btn.parentNode.replaceChild(btnClone, btn);
    btn = btnClone;

    const monthLabel = (d) =>
      d.toLocaleString("en-GB", { month:"short", year:"numeric", timeZone:"UTC" });

    const clearTargetUI = () => {
      if(optin) optin.checked = false;
      if(box) box.classList.add("hidden");
      if(input) input.value = "";
      if(hint) hint.textContent = "";
    };

    const setRevalDot = (dUTC, val, visible) => {
      if(idxRev < 0) return;
      const x = dUTC ? [monthStartUTC(dUTC)] : [monthStartUTC(latestDate)];
      const y = (Number.isFinite(val)) ? [val] : [NaN];
      Plotly.restyle(gd, { x, y, visible: !!visible }, [idxRev]);
    };

    const hideAllLines = () => {
      if(idxP50    >= 0) Plotly.restyle(gd, { visible:false }, [idxP50]);
      if(idxP50Reg >= 0) Plotly.restyle(gd, { visible:false }, [idxP50Reg]);
      if(idxMean   >= 0) Plotly.restyle(gd, { visible:false }, [idxMean]);
      if(idxMeanReg>= 0) Plotly.restyle(gd, { visible:false }, [idxMeanReg]);
    };

    const showActiveLines = () => {
      const useMean = (engine === "mean");
      if(useMean){
        if(idxMean    >= 0) Plotly.restyle(gd, { visible:true }, [idxMean]);
        if(idxMeanReg >= 0) Plotly.restyle(gd, { visible:true }, [idxMeanReg]);
      } else {
        if(idxP50     >= 0) Plotly.restyle(gd, { visible:true }, [idxP50]);
        if(idxP50Reg  >= 0) Plotly.restyle(gd, { visible:true }, [idxP50Reg]);
      }
    };

    const applyBaseline = () => {
      if(idxBase >= 0) Plotly.restyle(gd, { "marker.color": DARK_DOT }, [idxBase]);
      hideAllLines();
      setRevalDot(latestDate, NaN, false);

      panel.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
      const chev = btn.querySelector(".chev");
      if(chev) chev.textContent = "▾";

      moveEl.innerHTML = "";
      clearTargetUI();
    };

    const renderLatest = () => {
      if(Number.isFinite(equivLatest)){
        renderMovement(moveEl, {
          purchaseMonth,
          targetMonth: monthStartUTC(latestDate),
          price,
          equivNow: equivLatest,
          captionText: hasUserMonth
            ? "For retrospective valuations, add target month to calculate."
            : "Add a purchase month to calculate movement (optional).",
          rightLabel: hasUserMonth ? "Revaluation" : "Context now"
        });
      } else {
        moveEl.innerHTML = "";
      }
      setRevalDot(latestDate, equivLatest, true);
    };

    const applyMovementOn = () => {
      if(idxBase >= 0) Plotly.restyle(gd, { "marker.color": LIGHT_DOT }, [idxBase]);
      showActiveLines();

      panel.classList.remove("hidden");
      btn.setAttribute("aria-expanded", "true");
      const chev = btn.querySelector(".chev");
      if(chev) chev.textContent = "▴";

      renderLatest();
      clearTargetUI();
    };

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      if(isOpen) applyBaseline();
      else applyMovementOn();
    });

    if(optin && box){
      optin.onchange = () => {
        const on = !!optin.checked;
        box.classList.toggle("hidden", !on);

        if(!on){
          renderLatest();
          if(hint) hint.textContent = "";
          if(input) input.value = "";
          return;
        }

        if(hint) hint.textContent = "Enter a month in YYYYMM.";
      };
    }

    if(input){
      input.addEventListener("input", () => {
        if(!optin || !optin.checked) return;

        const d = parseYYYYMM(input.value);
        if(!d){
          if(hint) hint.textContent = "Use YYYYMM (e.g. 201906).";
          return;
        }

        const minD = months[0];
        const maxD = months[months.length - 1];
        const d2 = (d < minD) ? minD : (d > maxD ? maxD : d);

        const equiv = impliedValueAtWith({
          all,
          monthToT,
          regObj: activeReg,
          purchaseMonth,
          targetMonthUTC: d2,
          price,
          TRANSPORT_WINDOW_MONTHS,
          MIN_SALES_IN_WINDOW
        });

        if(!Number.isFinite(equiv)){
          if(hint) hint.textContent = "Not enough auction activity around one of the selected dates.";
          setRevalDot(d2, NaN, true);
          moveEl.innerHTML = "";
          return;
        }

        renderMovement(moveEl, {
          purchaseMonth,
          targetMonth: d2,
          price,
          equivNow: equiv,
          captionText: "Target month applied.",
          rightLabel: "Revaluation"
        });

        setRevalDot(d2, equiv, true);
        if(hint) hint.textContent = `Target set to ${monthLabel(d2)}.`;
      });
    }

    applyBaseline();
  });

  return { equivNow: equivLatest, plotPromise, engine };
}
