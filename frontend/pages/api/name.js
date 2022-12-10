export default async function handler(req, res) {
  if (req.method == "POST") {
    let code = req.body.data;
    let mainData;
    let data = {};
    let tableData = {};
    let stateData = [];
    let date = 0;
    let mabna = {};
    let buyjs = {};
    let mainstate = [];
    let da = [];
    const resDATA = await fetch(
      `http://cdn.tsetmc.com/api/ClosingPrice/GetClosingPriceInfo/${code}`
    );
    const resSTAT = await fetch(
      `http://cdn.tsetmc.com/api/ClosingPrice/GetClosingPriceDailyList/${code}/10`
    );
    const resTABLE = await fetch(
      `http://cdn.tsetmc.com/api/BestLimits/${code}`
    );
    if (resDATA.status == 200) {
      mainData = await resDATA.json();
      data = mainData.closingPriceInfo;
      date = data.dEven;
    }
    if (resSTAT.status == 200) {
      stateData = await resSTAT.json();
      stateData = stateData.closingPriceDaily;
      let temp = [];
      for (let i of stateData) {
        temp.push({
          pClosing: i.pClosing,
          pDrCotVal: i.pDrCotVal,
          priceFirst: i.priceFirst,
          dEven: i.dEven,
        });

        stateData = temp;
      }
    }
    if (resTABLE.status == 200) {
      tableData = await resTABLE.json();
    }
    if (date != 0) {
      const resMABNA = await fetch(
        `http://cdn.tsetmc.com/api/Instrument/GetInstrumentHistory/${code}/${date}`
      );

      if (resMABNA.status == 200) {
        mabna = await resMABNA.json();
      }
    }
    const resVolume = await fetch(
      `http://cdn.tsetmc.com/api/ClientType/GetClientType/${code}/1/0`
    );
    if (resVolume.status == 200) {
      buyjs = await resVolume.json();
      buyjs = buyjs.clientType;
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    let state2Res = await fetch(
      `http://cdn.tsetmc.com/api/Trade/GetTrade/${code}`,
      { signal: controller.signal }
    ).catch(() => (mainstate = []));
    clearTimeout(timeoutId);

    if (state2Res.status == 200) {
      mainstate = await state2Res.json();
      mainstate = mainstate.trade;
      mainstate.reverse();
      mainstate.map((el, index) => {
        if (index % 50 == 0)
          da.push({ qTitTran: el.qTitTran, pTran: el.pTran, hEven: el.hEven });
      });
      mainstate = da;
      mainstate.reverse();
    }

    let mainInformation = {
      max: Object.keys(data).length === 0 ? "-" : data.priceMax,
      min: Object.keys(data).length === 0 ? "-" : data.priceMin,
      vaziat:
        Object.keys(data).length === 0
          ? "-"
          : data.instrumentState.cEtavalTitle,
      change:
        Object.keys(data).length === 0
          ? "-"
          : data.pDrCotVal - data.priceYesterday,
      first: Object.keys(data).length === 0 ? "-" : data.priceFirst,
      yesterday: Object.keys(data).length === 0 ? "-" : data.priceYesterday,
      time: Object.keys(data).length === 0 ? "-" : data.hEven,
      payani: Object.keys(data).length === 0 ? "-" : data.pClosing,
      moamele: Object.keys(data).length === 0 ? "-" : data.pDrCotVal,
      saham:
        Object.keys(mabna).length === 0 ? "-" : mabna.instrumentHistory.zTitad,
      volumeMabna:
        Object.keys(mabna).length === 0 ? "-" : mabna.instrumentHistory.baseVol,
    };
    let volume = {
      volume: Object.keys(data).length === 0 ? "-" : data.qTotTran5J,
      value: Object.keys(data).length === 0 ? "-" : data.qTotCap,
      number: Object.keys(data).length === 0 ? "-" : data.zTotTran,
    };
    // I = haghighi , N = Hoghoghi
    let buy = {
      sellIVolume: Object.keys(buyjs).length === 0 ? "" : buyjs.sell_I_Volume,
      sellICount: Object.keys(buyjs).length === 0 ? "" : buyjs.sell_CountI,
      buyIVolume: Object.keys(buyjs).length === 0 ? "" : buyjs.buy_I_Volume,
      buyICount: Object.keys(buyjs).length === 0 ? "" : buyjs.buy_CountI,
      sellNVolume: Object.keys(buyjs).length === 0 ? "" : buyjs.sell_N_Volume,
      sellNCount: Object.keys(buyjs).length === 0 ? "" : buyjs.sell_CountN,
      buyNVolume: Object.keys(buyjs).length === 0 ? "" : buyjs.buy_N_Volume,
      buyNCount: Object.keys(buyjs).length === 0 ? "" : buyjs.sell_CountN,
    };
    res.status(200).json({
      mainInformation: mainInformation,
      stateData: stateData,
      bestLimits: tableData.bestLimits,
      volume: volume,
      buy: buy,
      mainstate: mainstate,
    });
  }
}
