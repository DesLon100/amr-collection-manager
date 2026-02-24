// js/amr-workbench.js
export function makeWorkbenchFromLots(lots){
  const rows = (lots || []).map(r => ({
    id: String(r.artist_id),
    date: r.date,
    price: r.price,
    LocationCode: r.LocationCode || "",
    LotNo: r.LotNo || "",
    SaleURL: r.SaleURL || ""
  }));

  return {
    getLotRows(){
      return rows;
    }
  };
}
