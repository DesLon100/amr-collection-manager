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
function clamp01(x){ return Math.max(0, Math.min(1, x)); }

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
  // values + weights are parallel arrays; q in [0,1]
  const n = values.length;
  if(n===0) return NaN;
  const pairs = [];
  for(let i=0;i<n;i++){
    const v = values[i];
    const w = weights ? weights[i] : 1;
    if(Number.isFinite(v) && Number.isFinite(w) && w>0){
      pairs.push([v,w]);
    }
  }
  if(pairs.length===0) return NaN;
  pairs.sort((a,b)=>a[0]-b[0]);
  const totalW = pairs.reduce((s,p)=>s+p[1],0);
  const target = q*totalW;
  let cum=0;
  for(const [v,w] of pairs){
    cum += w;
    if(cum >= target) return v;
  }
  return pairs[pairs.length-1][0];
}

function ols(xArr, yArr){
  // returns {a,b} for y=a + b*x
  const n = Math.min(xArr.length, yArr.length);
  if(n<2) return null;
  let sx=0, sy=0, sxx=0, sxy=0;
  let k=0;
  for(let i=0;i<n;i++){
    const x = xArr[i], y = yArr[i];
    if(!Number.isFinite(x) || !Number.isFinite(y)) continue;
    sx += x; sy += y; sxx += x*x; sxy += x*y;
    k++;
  }
  if(k<2) return null;
  const denom = (k*sxx - sx*sx);
  if(Math.abs(denom) < 1e-12) return null;
  const b = (k*sxy - sx*sy) / denom;
  const a = (sy - b*sx) / k;
  return {a,b};
}

function windowN(rows, startDate, endDate){
  // rows sorted by date; return subset between [startDate,endDate]
  const s = startDate.getTime(), e = endDate.getTime();
  return rows.filter(r=>{
    const t = r.date.getTime();
    return t>=s && t<=e;
  });
}

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

  const artworkDate = parseYYYYMM(myMonthYYYYMM) || all[all.length-1].date;
  const purchaseMonth = monthStartUTC(artworkDate);
  const latestDate  = all[all.length-1].date;

  const TRANSPORT_WINDOW_MONTHS = 24;
  const MIN_SALES_IN_WINDOW = 10;

  // --- Build rolling p50 + rolling mean + regression through rolling p50 ---
  const startRoll = addMonthsUTC(all[0].date, TRANSPORT_WINDOW_MONTHS-1);
  const endRoll   = latestDate;

  const months = buildMonthRangeUTC(startRoll, endRoll);

  const p50Series = [];
  const meanSeries = [];
  const p50wSeries = []; // weighted p50
  const monthToT = new Map();

  // build a stable time axis (t=0..)
  for(let i=0;i<months.length;i++){
    monthToT.set(monthKeyUTC(months[i]), i);
  }

  for(const m of months){
    const wStart = addMonthsUTC(m, -(TRANSPORT_WINDOW_MONTHS-1));
    const wEnd   = m;

    const win = windowN(all, wStart, wEnd);
    if(win.length < MIN_SALES_IN_WINDOW){
      p50Series.push([m, NaN]);
      meanSeries.push([m, NaN]);
      p50wSeries.push([m, NaN]);
      continue;
    }

    const prices = win.map(r=>r.price);
    const weights = win.map(r=>r.weight ?? 1);

    const p50  = weightedQuantile(prices, null, 0.5);
    const p50w = weightedQuantile(prices, weights, 0.5);
    const mean = prices.reduce((s,v)=>s+v,0)/prices.length;

    p50Series.push([m, p50]);
    p50wSeries.push([m, p50w]);
    meanSeries.push([m, mean]);
  }

  // use weighted p50 by default for trend (matches your new direction)
  const seriesForTrend = p50wSeries;

  // build regression in log space over valid points
  const meanT = [];
  const meanVals = [];
  for(const [m, v] of seriesForTrend){
    if(Number.isFinite(v) && v>0){
      meanT.push(monthToT.get(monthKeyUTC(m)));
      meanVals.push(v);
    }
  }
  const reg = (meanT.length >= 2) ? ols(meanT, meanVals.map(v => Math.log(v))) : null;

  function trendAtPurchase(regObj){
    const tInput = monthToT.get(monthKeyUTC(purchaseMonth));
    if(!regObj || tInput==null) return NaN;
    return Math.exp(regObj.a + regObj.b*tInput);
  }
  function trendAtLatest(regObj){
    const tInput = monthToT.get(monthKeyUTC(monthStartUTC(latestDate)));
    if(!regObj || tInput==null) return NaN;
    return Math.exp(regObj.a + regObj.b*tInput);
  }

  const trendPurchase = trendAtPurchase(reg);
  const trendLatest   = trendAtLatest(reg);

  // implied value from regression move
  function impliedValueAtWith(purchasePrice, trendNow, trendThen){
    if(!Number.isFinite(purchasePrice) || purchasePrice<=0) return NaN;
    if(!Number.isFinite(trendNow) || !Number.isFinite(trendThen) || trendNow<=0 || trendThen<=0) return NaN;
    return purchasePrice * (trendNow / trendThen);
  }

  const impliedNow = impliedValueAtWith(price, trendLatest, trendPurchase);

  // compute percentile at purchase month vs that window (simple / weighted)
  const winPurchase = windowN(all, addMonthsUTC(purchaseMonth, -(TRANSPORT_WINDOW_MONTHS-1)), purchaseMonth);
  const pPrices = winPurchase.map(r=>r.price).filter(Number.isFinite).sort((a,b)=>a-b);

  function percentileOf(sortedArr, value){
    if(!sortedArr.length || !Number.isFinite(value)) return NaN;
    // position as fraction <= value
    let lo=0, hi=sortedArr.length;
    while(lo<hi){
      const mid=(lo+hi)>>1;
      if(sortedArr[mid] <= value) lo=mid+1;
      else hi=mid;
    }
    return lo / sortedArr.length;
  }

  const myPctPurchase = percentileOf(pPrices, price);
  const myPctLatestWindow = (() => {
    const latestMonth = monthStartUTC(latestDate);
    const win = windowN(all, addMonthsUTC(latestMonth, -(TRANSPORT_WINDOW_MONTHS-1)), latestMonth);
    const arr = win.map(r=>r.price).filter(Number.isFinite).sort((a,b)=>a-b);
    return percentileOf(arr, impliedNow);
  })();

  // movement: change in percentile position from purchase-window to latest-window
  const percentileTransport = (Number.isFinite(myPctPurchase) && Number.isFinite(myPctLatestWindow))
    ? (myPctLatestWindow - myPctPurchase)
    : NaN;

  return {
    artistId,
    purchaseMonth,
    latestDate,
    windowMonths: TRANSPORT_WINDOW_MONTHS,
    p50Series,        // unweighted p50
    p50wSeries,       // weighted p50
    meanSeries,
    regression: reg ? {a: reg.a, b: reg.b} : null,
    trendPurchase,
    trendLatest,
    impliedNow,
    myPctPurchase,
    myPctLatestWindow,
    percentileTransport
  };
}

export function runPriceCheck({
  workbench,
  artistId,
  price,
  monthYYYYMM,
  ui,
  options = {}
}){
  // options:
  // - showFMV (boolean)
  // - showRollingPercentile (boolean)
  // - useWeighted (boolean)
  // - useLogY (boolean)

  const {
    showFMV = false,
    showRollingPercentile = false,
    useWeighted = true,
    useLogY = false
  } = options;

  // ------------------------------------------------------------
  // Scatter universe + overlays (Plotly)
  // ------------------------------------------------------------
  const all = workbench.getLotRows()
    .filter(r => r.id === artistId && Number.isFinite(r.price) && r.date)
    .sort((a,b)=>a.date-b.date);

  if(all.length < 10) throw new Error("Not enough auction history.");

  const purchaseDate = parseYYYYMM(monthYYYYMM) || all[all.length-1].date;
  const purchaseMonth = monthStartUTC(purchaseDate);
  const latestDate = all[all.length-1].date;

  const TRANSPORT_WINDOW_MONTHS = 24;
  const MIN_SALES_IN_WINDOW = 10;

  const startRoll = addMonthsUTC(all[0].date, TRANSPORT_WINDOW_MONTHS-1);
  const endRoll   = latestDate;
  const months = buildMonthRangeUTC(startRoll, endRoll);

  const p50Series = [];
  const meanSeries = [];
  const p50wSeries = [];

  const monthToT = new Map();
  for(let i=0;i<months.length;i++){
    monthToT.set(monthKeyUTC(months[i]), i);
  }

  for(const m of months){
    const wStart = addMonthsUTC(m, -(TRANSPORT_WINDOW_MONTHS-1));
    const wEnd   = m;

    const win = windowN(all, wStart, wEnd);
    if(win.length < MIN_SALES_IN_WINDOW){
      p50Series.push([m, NaN]);
      meanSeries.push([m, NaN]);
      p50wSeries.push([m, NaN]);
      continue;
    }

    const prices = win.map(r=>r.price);
    const weights = win.map(r=>r.weight ?? 1);

    const p50  = weightedQuantile(prices, null, 0.5);
    const p50w = weightedQuantile(prices, weights, 0.5);
    const mean = prices.reduce((s,v)=>s+v,0)/prices.length;

    p50Series.push([m, p50]);
    p50wSeries.push([m, p50w]);
    meanSeries.push([m, mean]);
  }

  const seriesForTrend = useWeighted ? p50wSeries : p50Series;

  // regression in log space
  const tArr = [];
  const yArr = [];
  for(const [m, v] of seriesForTrend){
    if(Number.isFinite(v) && v>0){
      tArr.push(monthToT.get(monthKeyUTC(m)));
      yArr.push(Math.log(v));
    }
  }
  const reg = (tArr.length >= 2) ? ols(tArr, yArr) : null;

  function regValueAtMonth(m){
    const t = monthToT.get(monthKeyUTC(m));
    if(!reg || t==null) return NaN;
    return Math.exp(reg.a + reg.b*t);
  }

  const trendPurchase = regValueAtMonth(purchaseMonth);
  const trendLatest   = regValueAtMonth(monthStartUTC(latestDate));

  const impliedNow = (Number.isFinite(price) && price>0 && Number.isFinite(trendPurchase) && trendPurchase>0 && Number.isFinite(trendLatest) && trendLatest>0)
    ? price * (trendLatest / trendPurchase)
    : NaN;

  // build scatter points
  const x = all.map(r => r.date);
  const y = all.map(r => r.price);

  const hover = all.map(r => {
    const loc = r.location ? (LOCATION_LOOKUP[r.location] || r.location) : "";
    const dt  = `${r.date.getUTCFullYear()}-${String(r.date.getUTCMonth()+1).padStart(2,"0")}`;
    const pr  = Number.isFinite(r.price) ? `£${Math.round(r.price).toLocaleString("en-GB")}` : "—";
    const w   = (r.weight && r.weight!==1) ? ` (w=${r.weight.toFixed(2)})` : "";
    return `<b>${dt}</b><br>${pr}${w}${loc ? `<br>${loc}` : ""}`;
  });

  const scatterTrace = {
    type: "scattergl",
    mode: "markers",
    x, y,
    text: hover,
    hoverinfo: "text",
    name: "Auction sales",
    marker: {
      size: 7,
      opacity: 0.6
    }
  };

  // overlay: rolling p50 (weighted/unweighted)
  function seriesToTrace(series, name){
    const xs = [];
    const ys = [];
    for(const [m,v] of series){
      if(Number.isFinite(v)){
        xs.push(m);
        ys.push(v);
      }
    }
    return {
      type: "scatter",
      mode: "lines",
      x: xs, y: ys,
      name,
      hoverinfo: "skip",
      line: { width: 3 }
    };
  }

  const p50Trace  = seriesToTrace(p50Series, "Rolling p50 (unweighted)");
  const p50wTrace = seriesToTrace(p50wSeries, "Rolling p50 (weighted)");

  // overlay: regression
  const regXs = [];
  const regYs = [];
  for(const m of months){
    const v = regValueAtMonth(m);
    if(Number.isFinite(v)){
      regXs.push(m);
      regYs.push(v);
    }
  }
  const regTrace = {
    type: "scatter",
    mode: "lines",
    x: regXs, y: regYs,
    name: "Regression (rolling p50)",
    hoverinfo: "skip",
    line: { width: 4, dash: "solid" }
  };

  // my point
  const myTrace = {
    type: "scatter",
    mode: "markers",
    x: [purchaseMonth],
    y: [price],
    name: "My Artwork",
    marker: { size: 12, opacity: 0.95 },
    hoverinfo: "text",
    text: [`<b>My Artwork</b><br>${monthKeyUTC(purchaseMonth)}<br>£${Math.round(price).toLocaleString("en-GB")}`]
  };

  // FMV point (impliedNow)
  const fmvTrace = {
    type: "scatter",
    mode: "markers",
    x: [monthStartUTC(latestDate)],
    y: [impliedNow],
    name: "FMV (implied)",
    marker: { size: 12, opacity: 0.95 },
    hoverinfo: "text",
    text: [`<b>FMV (implied)</b><br>${monthKeyUTC(monthStartUTC(latestDate))}<br>£${Number.isFinite(impliedNow)?Math.round(impliedNow).toLocaleString("en-GB"):"—"}`]
  };

  // assemble traces; keep overlays ABOVE dots by ordering them later
  const traces = [scatterTrace];

  // NOTE: add percentile series (optional) - placeholder hook if you already built it in UI
  if(showRollingPercentile){
    // Your app toggles this via UI; if you have a percentile series elsewhere, plug it here.
    // Intentionally left minimal to avoid breaking existing logic.
  }

  // Put p50 + regression on top (after scatter), per your requirement
  traces.push(useWeighted ? p50wTrace : p50Trace);
  traces.push(regTrace);
  traces.push(myTrace);

  if(showFMV){
    traces.push(fmvTrace);
  }

  const layout = {
    margin: { l: 60, r: 20, t: 10, b: 50 },
    xaxis: { title: "Sale date" },
    yaxis: { title: "Hammer price (GBP)", type: useLogY ? "log" : "linear" },
    legend: { orientation: "h" }
  };

  const config = { responsive: true, displayModeBar: false };

  // ui.plotEl is expected to be a DOM element for Plotly
  Plotly.newPlot(ui.plotEl, traces, layout, config);

  // return useful computed bits for the rest of the UI
  return {
    purchaseMonth,
    latestDate,
    impliedNow,
    trendPurchase,
    trendLatest,
    regression: reg ? {a: reg.a, b: reg.b} : null,
    p50Series,
    p50wSeries,
    meanSeries
  };
}
