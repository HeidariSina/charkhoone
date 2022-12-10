export default async function handler(req, res) {
  if (req.method == "GET") {
    const g1res = await fetch(
      "http://cdn.tsetmc.com/api/MarketData/GetMarketOverview/1"
    );
    const g1jss = await g1res.json();
    const g2res = await fetch(
      "http://cdn.tsetmc.com/api/MarketData/GetMarketOverview/2"
    );
    const g2jss = await g2res.json();
    const g1bres = await fetch(
      "http://cdn.tsetmc.com/api/ClosingPrice/GetTradeTop/MostVisited/1/5"
    );
    const g1bjs = await g1bres.json();
    const g2bres = await fetch(
      "http://cdn.tsetmc.com/api/ClosingPrice/GetTradeTop/MostVisited/2/5"
    );
    const g2bjs = await g2bres.json();
    let g1js = g1jss.marketOverview;
    let g2js = g2jss.marketOverview;
    let g1 = {
      date: g1js.marketActivityDEven,
      time: g1js.marketActivityHEven,
      changeShakhes: g1js.indexChange,
      shakhes: g1js.indexLastValue,
      hamVaznChange: g1js.indexEqualWeightedChange,
      hamVazn: g1js.indexEqualWeightedLastValue,
      marketValue: g1js.marketValue,
      moamelatValue: g1js.marketActivityQTotCap,
      number: g1js.marketActivityZTotTran,
      volume: g1js.marketActivityQTotTran,
      status: g1js.marketStateTitle,
    };
    let g2 = {
      date: g2js.marketActivityDEven,
      time: g2js.marketActivityHEven,
      shakhesChange: g2js.indexChange,
      shakhes: g2js.indexLastValue,
      bazar1and2Value: g2js.marketValue,
      baceValue: g2js.marketValueBase,
      number: g2js.marketActivityZTotTran,
      moamelatValue: g2js.marketActivityQTotCap,
      volume: g2js.marketActivityQTotTran,
      status: g2js.marketStateTitle,
    };
    res.status(200).json({
      g1,
      g2,
      g1best: g1bjs.tradeTop,
      g2best: g2bjs.tradeTop,
    });
  }
}
