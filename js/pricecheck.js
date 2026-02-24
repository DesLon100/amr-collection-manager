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
  "ARTCMARR": "Artcurial · MARRAKECH",
  "ARTCMONA": "Artcurial · MONACO",
  "ARTCPARI": "Artcurial · PARIS",
  "ARTCSDRO": "Artcurial · DROUOT",
  "ARTCSLUX": "Artcurial · LUXEMBOURG",
  "ARTCTOUL": "Artcurial · TOULOUSE",
  "ARTCVEND": "Artcurial · VENDÔME",
  "AUCATDUB": "Aucat · DUBAI",
  "AUCATONL": "Aucat · ONLINE",
  "AUCATPAR": "Aucat · PARIS",
  "AUCATSHJ": "Aucat · SHARJAH",
  "AUKTWARS": "Auktionshaus · WARSAW",
  "AUKTVIEN": "Auktionshaus · VIENNA",
  "AUKTZURI": "Auktionshaus · ZURICH",
  "AURORAON": "Aurora · ONLINE",
  "AURORAST": "Aurora · STOCKHOLM",
  "AUSONLSY": "Australian · ONLINE SYDNEY",
  "AUSSYDNE": "Australian · SYDNEY",
  "BAUMANOS": "Bauman · ONLINE",
  "BAUMANPA": "Bauman · PARIS",
  "BAYONNEA": "Bayonne · AIX",
  "BAYONNEP": "Bayonne · PARIS",
  "BELGONLI": "Belgium · ONLINE",
  "BELGUBRU": "Belgium · BRUSSELS",
  "BENEDICT": "Benedict · ZURICH",
  "BERLINER": "Berliner · BERLIN",
  "BERNHEIM": "Bernheim · PARIS",
  "BIDSPOT": "BidSpotter · ONLINE",
  "BLOUINON": "Blouin · ONLINE",
  "BONHAMS  ": "Bonhams · (UNKNOWN)",
  "BONHAMSAU": "Bonhams · AUCKLAND",
  "BONHAMSBA": "Bonhams · BATH",
  "BONHAMSBK": "Bonhams · BAKU",
  "BONHAMSBX": "Bonhams · BOXBOROUGH",
  "BONHAMSCG": "Bonhams · CHICAGO",
  "BONHAMSDO": "Bonhams · DOVER",
  "BONHAMSDU": "Bonhams · DUBAI",
  "BONHAMSEB": "Bonhams · EDINBURGH",
  "BONHAMSFR": "Bonhams · FRANKFURT",
  "BONHAMSGE": "Bonhams · GENEVA",
  "BONHAMSGH": "Bonhams · GHENT",
  "BONHAMSHK": "Bonhams · HONG KONG",
  "BONHAMSLA": "Bonhams · LOS ANGELES",
  "BONHAMSLE": "Bonhams · LEEDS",
  "BONHAMSLN": "Bonhams · LONDON",
  "BONHAMSME": "Bonhams · MELBOURNE",
  "BONHAMSMN": "Bonhams · MONACO",
  "BONHAMSMX": "Bonhams · MEXICO CITY",
  "BONHAMSNY": "Bonhams · NEW YORK",
  "BONHAMSOC": "Bonhams · OXFORD",
  "BONHAMSON": "Bonhams · ONLINE",
  "BONHAMSOT": "Bonhams · OTTAWA",
  "BONHAMSPA": "Bonhams · PARIS",
  "BONHAMSSF": "Bonhams · SAN FRANCISCO",
  "BONHAMSSP": "Bonhams · SINGAPORE",
  "BONHAMSSY": "Bonhams · SYDNEY",
  "BONHAMSUS": "Bonhams · (US)",
  "BONHAMSWE": "Bonhams · WEYBRIDGE",
  "BOSTONAU": "Boston · BOSTON",
  "BRUSSELS": "Brussels · BRUSSELS",
  "BUKOWSKI": "Bukowski · STOCKHOLM",
  "BUNDYONL": "Bundy · ONLINE",
  "BUNDYSYD": "Bundy · SYDNEY",
  "CAPITALAU": "Capital · NEW YORK",
  "CARREONL": "Carré · ONLINE",
  "CARRESPA": "Carré · PARIS",
  "CHRISTIE": "Christie's · (UNKNOWN)",
  "CHRISTAUS": "Christie's · AUCKLAND",
  "CHRISTBKK": "Christie's · BANGKOK",
  "CHRISTDUB": "Christie's · DUBAI",
  "CHRISTER": "Christie's · (ER)",
  "CHRISTGEN": "Christie's · GENEVA",
  "CHRISTHK": "Christie's · HONG KONG",
  "CHRISTLDN": "Christie's · LONDON",
  "CHRISTMIL": "Christie's · MILAN",
  "CHRISTNY": "Christie's · NEW YORK",
  "CHRISTONL": "Christie's · ONLINE",
  "CHRISTPAR": "Christie's · PARIS",
  "CHRISTROM": "Christie's · ROME",
  "CHRISTSEA": "Christie's · SEATTLE",
  "CHRISTSH": "Christie's · SHANGHAI",
  "CHRISTTOR": "Christie's · TORONTO",
  "CHRISTTYO": "Christie's · TOKYO",
  "CHRISTZRH": "Christie's · ZURICH",
  "COLLINS": "Collins · MELBOURNE",
  "CORNELIUS": "Cornelius · DUSSELDORF",
  "COTTERONL": "Cotter · ONLINE",
  "COTTERSYD": "Cotter · SYDNEY",
  "COURTNEY": "Courtney · NEW YORK",
  "DANSKE": "Danske · COPENHAGEN",
  "DAVIDONL": "David · ONLINE",
  "DAVIDPAR": "David · PARIS",
  "DERBY": "Derby · DERBY",
  "DOROTHE": "Dorotheum · (UNKNOWN)",
  "DOROTHELG": "Dorotheum · LONDON",
  "DOROTHEON": "Dorotheum · ONLINE",
  "DOROTHEVI": "Dorotheum · VIENNA",
  "DROUOTONL": "Drouot · ONLINE",
  "DROUOTPAR": "Drouot · PARIS",
  "DUNCAN": "Duncan · NEW YORK",
  "DUNMORE": "Dunmore · DUBLIN",
  "DUNSTAN": "Dunstan · LONDON",
  "DUSSELD": "Dusseldorf · DUSSELDORF",
  "EDVARDONL": "Edvard · ONLINE",
  "EDVARDSTO": "Edvard · STOCKHOLM",
  "EMIL": "Emil · ZURICH",
  "EVOONL": "Evo · ONLINE",
  "EVONYC": "Evo · NEW YORK",
  "FARSETTI": "Farsetti · PRATO",
  "FARSETTIO": "Farsetti · ONLINE",
  "FARSETTIR": "Farsetti · ROME",
  "FISCHER": "Fischer · LUCERNE",
  "FISCHERON": "Fischer · ONLINE",
  "FONCTION": "Fonction · BRUSSELS",
  "FONCTIONO": "Fonction · ONLINE",
  "FREEMAN": "Freeman's · PHILADELPHIA",
  "FREEMANON": "Freeman's · ONLINE",
  "GAGOSIAN": "Gagosian · NEW YORK",
  "GAGOSIANL": "Gagosian · LONDON",
  "GALLERYON": "Gallery · ONLINE",
  "GALERIEPA": "Galerie · PARIS",
  "GEM": "GEM · ONLINE",
  "GERMANYON": "Germany · ONLINE",
  "GERMANYBE": "Germany · BERLIN",
  "GERMANYFR": "Germany · FRANKFURT",
  "GERMANYMU": "Germany · MUNICH",
  "GIEDREONL": "Giedre · ONLINE",
  "GIEONL": "Gie · ONLINE",
  "GOLDIN": "Goldin · ONLINE",
  "GRISEBACH": "Grisebach · BERLIN",
  "GRISEONL": "Grisebach · ONLINE",
  "GROSVENOR": "Grosvenor · LONDON",
  "HAMILTON": "Hamilton · NEW YORK",
  "HAMILTONO": "Hamilton · ONLINE",
  "HANSEN": "Hansen · COPENHAGEN",
  "HANSENONL": "Hansen · ONLINE",
  "HARDING": "Harding · LONDON",
  "HARDO": "Harding · ONLINE",
  "HARRIS": "Harris · NEW YORK",
  "HARRISONL": "Harrison · LONDON",
  "HERITAGE": "Heritage · DALLAS",
  "HERITAGEO": "Heritage · ONLINE",
  "HESSINK": "Hessink · ONLINE",
  "HESSINKAM": "Hessink · AMSTERDAM",
  "HINDMAN": "Hindman · CHICAGO",
  "HINDMANON": "Hindman · ONLINE",
  "HOLABIRD": "Holabird · RENO",
  "HOLABIRDO": "Holabird · ONLINE",
  "HONGKONGO": "Hong Kong · ONLINE",
  "IE": "Ireland · (UNKNOWN)",
  "IEONL": "Ireland · ONLINE",
  "IEP": "Ireland · (UNKNOWN)",
  "IMKINS": "Imkins · ONLINE",
  "IMKINSNY": "Imkins · NEW YORK",
  "INTERNAT": "International · (UNKNOWN)",
  "INTERNATON": "International · ONLINE",
  "IRISH": "Irish · DUBLIN",
  "IRISHONL": "Irish · ONLINE",
  "JAPANONL": "Japan · ONLINE",
  "JAPANTOKY": "Japan · TOKYO",
  "JEFFERY": "Jeffery · SYDNEY",
  "JEFFERYON": "Jeffery · ONLINE",
  "JONES": "Jones · NEW YORK",
  "JONESONL": "Jones · ONLINE",
  "KAMINSKI": "Kaminski · BEVERLY",
  "KAMINSKIO": "Kaminski · ONLINE",
  "KETTERER": "Ketterer · MUNICH",
  "KETTERERO": "Ketterer · ONLINE",
  "KETTERERZ": "Ketterer · ZURICH",
  "KOLLER": "Koller · ZURICH",
  "KOLLERONL": "Koller · ONLINE",
  "KOLLERZA": "Koller · ZURICH A",
  "KOLLERZB": "Koller · ZURICH B",
  "KREUTZER": "Kreutzer · BERLIN",
  "KREUTZERO": "Kreutzer · ONLINE",
  "LAMA": "LAMA · LOS ANGELES",
  "LAMAONL": "LAMA · ONLINE",
  "LARASATI": "Larasati · JAKARTA",
  "LARASATIO": "Larasati · ONLINE",
  "LEONARDJ": "Leonard Joel · MELBOURNE",
  "LEONARDJO": "Leonard Joel · ONLINE",
  "LEONJOEL": "Leonard Joel · MELBOURNE",
  "LESKIS": "Leski · MELBOURNE",
  "LESKISONL": "Leski · ONLINE",
  "LESLIEH": "Leslie Hindman · CHICAGO",
  "LESLIEHON": "Leslie Hindman · ONLINE",
  "LIAS": "Lias · ONLINE",
  "LIASLON": "Lias · LONDON",
  "LONDONONL": "London · ONLINE",
  "LONONL": "London · ONLINE",
  "LUXONL": "Luxembourg · ONLINE",
  "LUXLUX": "Luxembourg · LUXEMBOURG",
  "MACDOUGAL": "MacDougall's · LONDON",
  "MACDOUGO": "MacDougall's · ONLINE",
  "MELBOURNE": "Melbourne · MELBOURNE",
  "MELBONL": "Melbourne · ONLINE",
  "MEYER": "Meyer · PARIS",
  "MEYERONL": "Meyer · ONLINE",
  "MIAMI": "Miami · MIAMI",
  "MIAMIONL": "Miami · ONLINE",
  "MORPHY": "Morphy · DENVER",
  "MORPHYONL": "Morphy · ONLINE",
  "MUNICHONL": "Munich · ONLINE",
  "MUNICHMUN": "Munich · MUNICH",
  "NAGEL": "Nagel · STUTTGART",
  "NAGELONL": "Nagel · ONLINE",
  "NEWYORKON": "New York · ONLINE",
  "NYONL": "New York · ONLINE",
  "OCEANIC": "Oceanic · SYDNEY",
  "OCEANICON": "Oceanic · ONLINE",
  "ONL": "ONLINE",
  "OTF": "Other · (UNKNOWN)",
  "OTFONL": "Other · ONLINE",
  "PALAZZO": "Palazzo · ONLINE",
  "PARIS": "Paris · PARIS",
  "PARISONL": "Paris · ONLINE",
  "PHILLIPS": "Phillips · (UNKNOWN)",
  "PHILLIPSGE": "Phillips · GENEVA",
  "PHILLIPSHK": "Phillips · HONG KONG",
  "PHILLIPSLN": "Phillips · LONDON",
  "PHILLIPSNY": "Phillips · NEW YORK",
  "PHILLIPSON": "Phillips · ONLINE",
  "PHILLIPSPA": "Phillips · PARIS",
  "POLANDONL": "Poland · ONLINE",
  "POLANDWAW": "Poland · WARSAW",
  "RAGO": "Rago · LAMBERTVILLE",
  "RAGOONL": "Rago · ONLINE",
  "RARE": "Rare · ONLINE",
  "RAREPAR": "Rare · PARIS",
  "REGONL": "Regional · ONLINE",
  "ROCKEFELL": "Rockefeller · NEW YORK",
  "ROCKEFELLO": "Rockefeller · ONLINE",
  "ROMEONL": "Rome · ONLINE",
  "ROME": "Rome · ROME",
  "RUSSIAN": "Russian · MOSCOW",
  "RUSSIANON": "Russian · ONLINE",
  "SANFRANON": "San Francisco · ONLINE",
  "SANFRAN": "San Francisco · SAN FRANCISCO",
  "SAVOY": "Savoy · LONDON",
  "SAVOYONL": "Savoy · ONLINE",
  "SHEFFIELD": "Sheffield · SHEFFIELD",
  "SHEFFIELDON": "Sheffield · ONLINE",
  "SINGAPORE": "Singapore · SINGAPORE",
  "SINGONL": "Singapore · ONLINE",
  "SKINNER": "Skinner · BOSTON",
  "SKINNERON": "Skinner · ONLINE",
  "SLOAN": "Sloan · ONLINE",
  "SOTHEBYS": "Sotheby's · (UNKNOWN)",
  "SOTHEBYSGE": "Sotheby's · GENEVA",
  "SOTHEBYSHK": "Sotheby's · HONG KONG",
  "SOTHEBYSLN": "Sotheby's · LONDON",
  "SOTHEBYSNY": "Sotheby's · NEW YORK",
  "SOTHEBYSON": "Sotheby's · ONLINE",
  "SOTHEBYSPA": "Sotheby's · PARIS",
  "SPINK": "Spink · LONDON",
  "SPINKONL": "Spink · ONLINE",
  "SRI": "Sri Lanka · COLOMBO",
  "SRIONL": "Sri Lanka · ONLINE",
  "STOCKHOLM": "Stockholm · STOCKHOLM",
  "STOONL": "Stockholm · ONLINE",
  "STUTTGART": "Stuttgart · STUTTGART",
  "STUTONL": "Stuttgart · ONLINE",
  "SYDNEY": "Sydney · SYDNEY",
  "SYDONL": "Sydney · ONLINE",
  "TAJAN": "Tajan · PARIS",
  "TAJANONL": "Tajan · ONLINE",
  "TOKYO": "Tokyo · TOKYO",
  "TOKYONL": "Tokyo · ONLINE",
  "TORONTO": "Toronto · TORONTO",
  "TORONL": "Toronto · ONLINE",
  "VANHAM": "Van Ham · COLOGNE",
  "VANHAMON": "Van Ham · ONLINE",
  "VIENNA": "Vienna · VIENNA",
  "VIENONL": "Vienna · ONLINE",
  "WARSAW": "Warsaw · WARSAW",
  "WARONL": "Warsaw · ONLINE",
  "WESCHLER": "Weschler's · ROCKVILLE",
  "WESCHLERO": "Weschler's · ONLINE",
  "WIESBADEN": "Wiesbaden · WIESBADEN",
  "WIESONL": "Wiesbaden · ONLINE",
  "ZURICH": "Zurich · ZURICH",
  "ZURIONL": "Zurich · ONLINE"
};

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
function clamp(x, lo, hi){ return Math.max(lo, Math.min(hi, x)); }
function fmtGBP(n){
  if(!Number.isFinite(n)) return "—";
  const s = Math.round(n).toLocaleString("en-GB");
  return `£${s}`;
}

function monthStartUTC(d){
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
}
function addMonthsUTC(d, m){
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + m, 1));
}
function buildMonthRangeUTC(startDate, endDate){
  const start = monthStartUTC(startDate);
  const end   = monthStartUTC(endDate);
  const out = [];
  let cur = new Date(start);
  while(cur <= end){
    out.push(new Date(cur));
    cur = addMonthsUTC(cur, 1);
  }
  return out;
}
function monthKeyUTC(d){
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth()+1;
  return `${y}-${String(m).padStart(2,"0")}`;
}
function parseYYYYMM(yyyymm){
  if(!yyyymm) return null;
  const s = String(yyyymm).trim();
  if(!/^\d{6}$/.test(s)) return null;
  const y = Number(s.slice(0,4));
  const m = Number(s.slice(4,6));
  if(m<1||m>12) return null;
  return new Date(Date.UTC(y, m-1, 1));
}

function weightedQuantile(values, weights, q){
  const pairs = [];
  for(let i=0;i<values.length;i++){
    const v = values[i];
    const w = weights ? weights[i] : 1;
    if(Number.isFinite(v) && Number.isFinite(w) && w > 0) pairs.push([v,w]);
  }
  if(!pairs.length) return null;
  pairs.sort((a,b)=>a[0]-b[0]);
  const totalW = pairs.reduce((s,p)=>s+p[1],0);
  const target = q*totalW;
  let cum = 0;
  for(const [v,w] of pairs){
    cum += w;
    if(cum >= target) return v;
  }
  return pairs[pairs.length-1][0];
}

function ols(xArr, yArr){
  const n = Math.min(xArr.length, yArr.length);
  if(n < 2) return null;
  let sx=0, sy=0, sxx=0, sxy=0, k=0;
  for(let i=0;i<n;i++){
    const x = xArr[i], y = yArr[i];
    if(!Number.isFinite(x) || !Number.isFinite(y)) continue;
    sx += x; sy += y; sxx += x*x; sxy += x*y; k++;
  }
  if(k < 2) return null;
  const denom = (k*sxx - sx*sx);
  if(Math.abs(denom) < 1e-12) return null;
  const b = (k*sxy - sx*sy) / denom;
  const a = (sy - b*sx) / k;
  return { a, b };
}

function percentileOfSorted(sortedArr, value){
  if(!sortedArr.length || !Number.isFinite(value)) return null;
  let lo=0, hi=sortedArr.length;
  while(lo<hi){
    const mid = (lo+hi)>>1;
    if(sortedArr[mid] <= value) lo = mid+1;
    else hi = mid;
  }
  return lo / sortedArr.length; // in [0,1]
}

function windowRows(all, startDate, endDate){
  const s = startDate.getTime(), e = endDate.getTime();
  return all.filter(r=>{
    const t = r.date.getTime();
    return t>=s && t<=e;
  });
}

// ------------------------------------------------------------
// Row field adapters (keeps the rest resilient to CSV headers)
// ------------------------------------------------------------
function getDate(r){ return r.date; }
function getPrice(r){ return r.price; }
function getWeight(r){ return Number.isFinite(r.weight) ? r.weight : 1; }

function getLocationCode(r){ return String(r.LocationCode ?? "").trim(); }
function getLotNo(r){ return String(r.LotNo ?? "").trim() || "—"; }
function getSaleURL(r){ return String(r.SaleURL ?? "").trim(); }


// ------------------------------------------------------------
// Compute-only (no Plotly): engine + context now + movement
// ------------------------------------------------------------
export function computePriceCheckMetrics({
  workbench,
  artistId,
  price,
  myMonthYYYYMM
}){
  const all = workbench.getLotRows()
    .filter(r => r.id === artistId && Number.isFinite(r.price) && r.date)
    .sort((a,b)=>a.date-b.date);

  if(all.length < 10) throw new Error("Not enough auction history.");

  const userMonthDate = parseYYYYMM(myMonthYYYYMM);
  const artworkDate = userMonthDate || all[all.length-1].date;
  const purchaseMonth = monthStartUTC(artworkDate);
  const latestDate  = all[all.length-1].date;

  const TRANSPORT_WINDOW_MONTHS = 24;
  const MIN_SALES_IN_WINDOW = 10;

  // Rolling 24m series (mean + weighted p50)
  const startRoll = addMonthsUTC(all[0].date, TRANSPORT_WINDOW_MONTHS-1);
  const months = buildMonthRangeUTC(startRoll, latestDate);

  const meanSeries = [];
  const p50wSeries = [];

  for(const m of months){
    const wStart = addMonthsUTC(m, -(TRANSPORT_WINDOW_MONTHS-1));
    const wEnd   = m;
    const win = windowRows(all, wStart, wEnd);
    if(win.length < MIN_SALES_IN_WINDOW){
      meanSeries.push([m, null]);
      p50wSeries.push([m, null]);
      continue;
    }
    const prices  = win.map(getPrice);
    const weights = win.map(getWeight);
    const mean = prices.reduce((s,v)=>s+v,0)/prices.length;
    const p50w = weightedQuantile(prices, weights, 0.5);
    meanSeries.push([m, mean]);
    p50wSeries.push([m, p50w]);
  }

  // Engine choice: use whichever has more usable points, default to p50w
  const nMean = meanSeries.filter(d=>Number.isFinite(d[1])).length;
  const nP50w = p50wSeries.filter(d=>Number.isFinite(d[1])).length;
  const engine = (nP50w >= nMean) ? "p50" : "mean";
  const series = (engine === "p50") ? p50wSeries : meanSeries;

  // Build regression over series in log space
  const tArr = [];
  const yArr = [];
  const monthIndex = new Map(months.map((d,i)=>[monthKeyUTC(d), i]));
  for(const [m,v] of series){
    if(Number.isFinite(v) && v > 0){
      tArr.push(monthIndex.get(monthKeyUTC(m)));
      yArr.push(Math.log(v));
    }
  }
  const reg = (tArr.length >= 2) ? ols(tArr, yArr) : null;

  function regAtMonth(m){
    const t = monthIndex.get(monthKeyUTC(m));
    if(!reg || t==null) return null;
    return Math.exp(reg.a + reg.b*t);
  }

  const trendPurchase = regAtMonth(purchaseMonth);
  const trendLatest = regAtMonth(monthStartUTC(latestDate));

  // context now (engine value at latest month)
  const contextNow = trendLatest;

  // movement: implied FMV now from purchase price scaled by regression move
  let equivNow = null;
  if(Number.isFinite(price) && price > 0 && Number.isFinite(trendPurchase) && trendPurchase > 0 && Number.isFinite(trendLatest) && trendLatest > 0){
    equivNow = price * (trendLatest / trendPurchase);
  }

  // movementPct: percent change from purchase price to implied now
  let movementPct = null;
  if(Number.isFinite(equivNow) && Number.isFinite(price) && price > 0){
    movementPct = ((equivNow / price) - 1) * 100;
  }

  return {
    engine,          // "mean" | "p50"
    contextNow,      // numeric or null
    movementPct,     // numeric or null
    latestMonth: monthStartUTC(latestDate)
  };
}


// ------------------------------------------------------------
// Plot + compute for detail view
// ------------------------------------------------------------
export function runPriceCheck({
  workbench,
  artistId,
  price,
  myMonthYYYYMM,
  yScale,
  elChart
}){
  const all = workbench.getLotRows()
    .filter(r => r.id === artistId && Number.isFinite(r.price) && r.date)
    .sort((a,b)=>a.date-b.date);

  if(all.length < 10) throw new Error("Not enough auction history.");

  // NEW: distinguish between "user supplied date" and "fallback date"
  const userMonthDate = parseYYYYMM(myMonthYYYYMM);
  const hasUserMonth = !!userMonthDate;

  const artworkDate = userMonthDate || all[all.length-1].date;
  const purchaseMonth = monthStartUTC(artworkDate);
  const latestDate  = all[all.length-1].date;

  const TRANSPORT_WINDOW_MONTHS = 24;
  const MIN_SALES_IN_WINDOW = 10;

  // Rolling 24m series (mean + weighted p50)
  const startRoll = addMonthsUTC(all[0].date, TRANSPORT_WINDOW_MONTHS-1);
  const months = buildMonthRangeUTC(startRoll, latestDate);

  const meanSeries = [];
  const p50wSeries = [];

  for(const m of months){
    const wStart = addMonthsUTC(m, -(TRANSPORT_WINDOW_MONTHS-1));
    const wEnd   = m;
    const win = windowRows(all, wStart, wEnd);
    if(win.length < MIN_SALES_IN_WINDOW){
      meanSeries.push([m, null]);
      p50wSeries.push([m, null]);
      continue;
    }
    const prices  = win.map(getPrice);
    const weights = win.map(getWeight);
    const mean = prices.reduce((s,v)=>s+v,0)/prices.length;
    const p50w = weightedQuantile(prices, weights, 0.5);
    meanSeries.push([m, mean]);
    p50wSeries.push([m, p50w]);
  }

  // Engine choice: use whichever has more usable points, default to p50w
  const nMean = meanSeries.filter(d=>Number.isFinite(d[1])).length;
  const nP50w = p50wSeries.filter(d=>Number.isFinite(d[1])).length;
  const engine = (nP50w >= nMean) ? "p50" : "mean";
  const series = (engine === "p50") ? p50wSeries : meanSeries;

  // Regression in log space
  const tArr = [];
  const yArr = [];
  const monthIndex = new Map(months.map((d,i)=>[monthKeyUTC(d), i]));
  for(const [m,v] of series){
    if(Number.isFinite(v) && v > 0){
      tArr.push(monthIndex.get(monthKeyUTC(m)));
      yArr.push(Math.log(v));
    }
  }
  const reg = (tArr.length >= 2) ? ols(tArr, yArr) : null;

  function regAtMonth(m){
    const t = monthIndex.get(monthKeyUTC(m));
    if(!reg || t==null) return null;
    return Math.exp(reg.a + reg.b*t);
  }

  const trendPurchase = regAtMonth(purchaseMonth);
  const trendLatest = regAtMonth(monthStartUTC(latestDate));

  // implied FMV now from purchase price scaled by regression move
  let equivLatest = null;
  if(Number.isFinite(price) && price > 0 && Number.isFinite(trendPurchase) && trendPurchase > 0 && Number.isFinite(trendLatest) && trendLatest > 0){
    equivLatest = price * (trendLatest / trendPurchase);
  }

  // Purchase percentile in purchase window (only if user supplied date; else null)
  let pct = null;
  if(hasUserMonth){
    const winPurchase = windowRows(all, addMonthsUTC(purchaseMonth, -(TRANSPORT_WINDOW_MONTHS-1)), purchaseMonth);
    const sorted = winPurchase.map(getPrice).filter(Number.isFinite).sort((a,b)=>a-b);
    pct = percentileOfSorted(sorted, price);
  }

  // Build scatter points
  const xs = all.map(getDate);
  const ys = all.map(getPrice);

  const htxt = all.map(r=>{
    const dt = monthKeyUTC(monthStartUTC(getDate(r)));
    const pr = fmtGBP(getPrice(r));
    const loc = LOCATION_LOOKUP[getLocationCode(r)] || getLocationCode(r) || "";
    const lot = getLotNo(r);
    const url = getSaleURL(r);
    const urlLine = url ? `<br><span style="opacity:.75">${url}</span>` : "";
    const locLine = loc ? `<br><span style="opacity:.8">${loc}</span>` : "";
    return `<b>${dt}</b><br>${pr}${locLine}<br>Lot ${lot}${urlLine}`;
  });

  const traceSales = {
    type: "scattergl",
    mode: "markers",
    x: xs,
    y: ys,
    text: htxt,
    hoverinfo: "text",
    name: "Auction sales",
    marker: { size: 7, opacity: 0.55 }
  };

  // Engine overlay (series)
  const serX = [];
  const serY = [];
  for(const [m,v] of series){
    if(Number.isFinite(v)){
      serX.push(m);
      serY.push(v);
    }
  }
  const traceEngine = {
    type: "scatter",
    mode: "lines",
    x: serX,
    y: serY,
    name: engine === "p50" ? "Rolling p50 (24m)" : "Rolling mean (24m)",
    hoverinfo: "skip",
    line: { width: 3 }
  };

  // Regression overlay
  const regX = [];
  const regY = [];
  if(reg){
    for(const m of months){
      const v = regAtMonth(m);
      if(Number.isFinite(v)){
        regX.push(m);
        regY.push(v);
      }
    }
  }
  const traceReg = {
    type: "scatter",
    mode: "lines",
    x: regX,
    y: regY,
    name: "Regression (engine)",
    hoverinfo: "skip",
    line: { width: 4 }
  };

  // My artwork point
  const traceMine = {
    type: "scatter",
    mode: "markers",
    x: [purchaseMonth],
    y: [price],
    name: "My Artwork",
    marker: { size: 12, opacity: 0.95 },
    hoverinfo: "text",
    text: [`<b>My Artwork</b><br>${monthKeyUTC(purchaseMonth)}<br>${fmtGBP(price)}`]
  };

  // Implied FMV now point (at latest month)
  const traceFMV = {
    type: "scatter",
    mode: "markers",
    x: [monthStartUTC(latestDate)],
    y: [equivLatest],
    name: "FMV (implied)",
    marker: { size: 12, opacity: 0.95 },
    hoverinfo: "text",
    text: [`<b>FMV (implied)</b><br>${monthKeyUTC(monthStartUTC(latestDate))}<br>${fmtGBP(equivLatest)}`]
  };

  const layout = {
    margin: { l: 60, r: 20, t: 10, b: 50 },
    xaxis: { title: "Sale date" },
    yaxis: { title: "Hammer price (GBP)", type: (yScale === "log" ? "log" : "linear") },
    legend: { orientation: "h" }
  };

  const config = { responsive: true, displayModeBar: false };

  // Safety: if elChart is missing, avoid throwing (callers can handle plotPromise=null)
  let plotPromise = null;
  if(elChart){
    plotPromise = Plotly.newPlot(
      elChart,
      [
        traceSales,
        traceEngine, // overlay above dots
        traceReg,    // regression above series
        traceMine,
        ...(Number.isFinite(equivLatest) ? [traceFMV] : [])
      ],
      layout,
      config
    );
  }

  return { pct, equivNow: equivLatest, plotPromise, engine };
}
