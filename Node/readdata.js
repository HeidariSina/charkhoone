const API_URL = "http://127.0.0.1:1338/api";

const fetch = require("node-fetch");
//update today DB
async function updateDate() {
  const resTime = await fetch(
    `${API_URL}/todays?pagination[page]=1&pagination[pageSize]=2`
  );
  let time = await resTime.json();
  let today = new Date();
  let d = String(today.getDate()).padStart(2, "0");
  var m = String(today.getMonth() + 1).padStart(2, "0");
  var y = String(today.getFullYear());
  let body = {
    data: {
      M: m,
      Y: y,
      D: d,
    },
  };
  if (time.data.length < 1) {
    const response = await fetch(`${API_URL}/todays`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    const response = await fetch(`${API_URL}/todays/${time.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
}
// this function includes a function that send a company to db
async function sendCompony(data, DB) {
  let i = DB.findIndex((ele) => ele.attributes.inscode == data.inscode);
  let body = {
    data: {
      name: data.name,
      fullname: data.fullname,
      inscode: data.inscode,
      group: data.group,
      maxprice: data.maxprice,
      priceMin: data.priceMin,
      price: data.price,
      changeprice: data.changeprice,
      priceYesterday: data.priceYesterday,
    },
  };
  if (i < 0) {
    const response = await fetch(`${API_URL}/companies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    const response = await fetch(`${API_URL}/companies/${DB[i].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
}

//sender of groups to db
async function sendGroup(data, DB) {
  let i = DB.findIndex((ele) => ele.attributes.inscode == data.inscode);
  let body = {
    data: {
      name: data.name,
      group: data.group,
    },
  };
  if (i < 0) {
    const response = await fetch(`${API_URL}/groups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    const response = await fetch(`${API_URL}/groups/${DB[i].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
}

// sender the main data to DB
async function sendMainData(code, dat, flag) {
  const res = await fetch(`${API_URL}/cmds?filters[inscode]=${code}`);
  const DB = await res.json();
  let body = {
    data: {
      inscode: code,
      mainData: {
        mainInformation: dat.mainInformation,
        stateData:
          flag == 0 ? dat.stateData : DB.data[0].attributes.mainData.stateData,
        bestLimits: dat.bestLimits,
        volume: dat.volume,
        mainstate:
          flag == 0 ? dat.mainstate : DB.data[0].attributes.mainData.mainstate,
        buy: dat.buy,
        haghighiAll: dat.alldata,
      },
    },
  };
  if (DB.data.length < 1) {
    const response = await fetch(`${API_URL}/cmds`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    const response = await fetch(`${API_URL}/cmds/${DB.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
}
// sender the first page to db
async function sendFP(fPData) {
  const resDB = await fetch(`${API_URL}/firstpages`);
  const dB = await resDB.json();
  let body = {
    data: {
      data: {
        g1: fPData.g1,
        g2: fPData.g2,
        g1best: fPData.g1best,
        g2best: fPData.g2best,
      },
    },
  };
  if (dB.data.length == 0) {
    const response = await fetch(`${API_URL}/firstpages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    const response = await fetch(`${API_URL}/firstpages/${dB.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
}

async function sendBL(dat, number) {
  const resDB = await fetch(`${API_URL}/bestlimitsg${number}s`);
  const dB = await resDB.json();
  let body = {
    data: {
      data: {
        dat,
      },
    },
  };
  if (dB.data.length == 0) {
    const response = await fetch(`${API_URL}/bestlimitsg${number}s`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    const response = await fetch(
      `${API_URL}/bestlimitsg${number}s/${dB.data[0].id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
  }
}
// make Exactly 2 length
function pad(d) {
  return d < 10 ? "0" + d.toString() : d.toString();
}

// catch all of groups send them to db
async function catchGroups() {
  try {
    const res = await fetch(
      `http://cdn.tsetmc.com/api/StaticData/GetStaticData`
    );
    const resDB = await fetch(
      `${API_URL}/groups?pagination[page]=1&pagination[pageSize]=300`
    );
    let DB = await resDB.json();
    if (res.status == 200) {
      let groups = await res.json();
      for (gr of groups.staticData) {
        if (gr.type == "IndustrialGroup") {
          let dat = {
            name: gr.name,
            group: pad(gr.code),
          };
          sendGroup(dat, DB.data);
        }
      }
    }
  } catch (error) {
    setTimeout(() => catchGroups(), 3000);
  }
}

// get companies of a group and send it to DB
async function componyToId(number, DB) {
  const res = await fetch(
    `http://cdn.tsetmc.com/api/ClosingPrice/GetRelatedCompany/${number}`
  );
  if (res.status == 200) {
    let datas = await res.json();
    datas["relatedCompany"].map(async (e) => {
      let databack = {
        name: e.instrument.lVal18AFC,
        fullname: e.instrument.lVal30,
        inscode: e.instrument.insCode,
        group: number,
        maxprice: e.priceMax,
        minprice: e.priceMin,
        price: e.pDrCotVal,
        changeprice: e.priceChange,
        priceYesterday: e.priceYesterday,
      };
      await sendCompony(databack, DB);
    });
  }
}

//send each groups of companies to DB
async function sendAllCompaniesToDB() {
  try {
    const resDB = await fetch(
      `${API_URL}/groups?pagination[page]=1&pagination[pageSize]=300`
    );
    const resSource = await fetch(
      `${API_URL}/companies?pagination[page]=1&pagination[pageSize]=2000`
    );
    let source = await resDB.json();
    let DB = await resSource.json();
    for (g of source.data) {
      await componyToId(g.attributes.group, DB.data);
    }
  } catch (error) {
    setTimeout(() => sendAllCompaniesToDB(), 3000);
  }
}

// send firstPage Data to DB
async function getFirstPage() {
  try {
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
    sendFP({ g1, g2, g1best: g1bjs.tradeTop, g2best: g2bjs.tradeTop });
  } catch (error) {
    setTimeout(() => getFirstPage(), 3000);
  }
}

//send BestLimits To DB
async function getBestlimits() {
  try {
    let numbers = [1, 2];
    for (let i of numbers) {
      const resDB = await fetch(
        `http://cdn.tsetmc.com/api/ClosingPrice/GetTradeTop/MostVisited/${i}/9999`
      );
      const data = await resDB.json();
      await sendBL(data, i);
    }
  } catch (error) {
    setTimeout(() => getBestlimits(), 3000);
  }
}

// send Main Data of a Companies to DB
async function getMainData(code, timeFlag) {
  try {
    let alldata;
    let flag = 0;
    let mainData;
    let data = {};
    let tableData = {};
    let stateData = [];
    let date = 0;
    let mabna = {};
    let buyjs = {};
    let mainstate = [];
    let da = [];
    if (timeFlag == 1) {
      flag = 1;
    } else {
      const resSTAT = await fetch(
        `http://cdn.tsetmc.com/api/ClosingPrice/GetClosingPriceDailyList/${code}/9999`
      );
      if (resSTAT.status == 200) {
        stateData = await resSTAT.json();
        let temp = [];
        stateData = stateData.closingPriceDaily;
        for (let i of stateData) {
          temp.push({
            payani: i.pClosing,
            moamele: i.pDrCotVal,
            priceFirst: i.priceFirst,
            time: i.dEven,
            vol: i.qTotTran5J,
            change: i.priceChange,
            value: i.qTotCap,
            max: i.priceMax,
            min: i.priceMin,
          });
        }
        stateData = temp;
      }
      let alldatares = await fetch(
        `http://cdn.tsetmc.com/api/ClientType/GetClientTypeHistory/${code}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      alldata = await alldatares.json();
      alldata = alldata.clientType;
      let temp2 = [];
      for (let i of alldata) {
        temp2.push({
          sell: i.sell_I_Value,
          buy: i.buy_I_Value,
          time: i.recDate,
        });
      }
      alldata = temp2;
    }

    const resDATA = await fetch(
      `http://cdn.tsetmc.com/api/ClosingPrice/GetClosingPriceInfo/${code}`
    );
    if (resDATA.status == 200) {
      mainData = await resDATA.json();
      data = mainData.closingPriceInfo;
      date = data.dEven;
    }
    const resTABLE = await fetch(
      `http://cdn.tsetmc.com/api/BestLimits/${code}`
    );
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
    let state2Res = await fetch(
      `http://cdn.tsetmc.com/api/Trade/GetTrade/${code}`
    );
    if (state2Res.status == 200) {
      mainstate = await state2Res.json();
      mainstate = mainstate.trade;
      mainstate.reverse();
      mainstate.map((el, index) => {
        if (index % 30 == 0)
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
    sendMainData(
      code,
      {
        mainInformation: mainInformation,
        stateData: stateData,
        bestLimits: tableData.bestLimits,
        volume: volume,
        buy: buy,
        mainstate: mainstate,
        alldata: alldata,
      },
      flag
    );
  } catch (error) {
    console.log(`Cant fetch ${code}`);
    setTimeout(() => {
      getMainData(code);
    }, 300);
  }
}

//get all of companieys mainData
async function getAllMainData() {
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const resSource = await fetch(
    `${API_URL}/companies?pagination[page]=1&pagination[pageSize]=2000`
  );

  let source = await resSource.json();
  const resTime = await fetch(
    `${API_URL}/todays?pagination[page]=1&pagination[pageSize]=2`
  );
  let timeFlag;
  source = source.data;

  let time = await resTime.json();
  if (time.data.length > 1) {
    time = time.data[0].attributes;
    let today = new Date();
    let d = String(today.getDate()).padStart(2, "0");
    var m = String(today.getMonth() + 1).padStart(2, "0");
    var y = String(today.getFullYear());
    if (time.M == m && time.D == d && time.Y == y) {
      timeFlag = 1;
    } else {
      timeFlag = 0;
      updateDate();
    }
  } else {
    timeFlag = 0;
    updateDate();
  }
  for (let dat of source) {
    await sleep(timeFlag == 1 ? 150 : 170);
    getMainData(dat.attributes.inscode, timeFlag);
  }
  // setTimeout(() => getAllMainData(), 1000 * 60);
}

async function main() {
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  setTimeout(async () => {
    await catchGroups();
    await getFirstPage();
    await getBestlimits();
    await sendAllCompaniesToDB();
    await getAllMainData();
    setInterval(() => {
      catchGroups();
    }, 24 * 60 * 60 * 1000);
    while (true) {
      await sleep(10 * 1000);
      await getFirstPage();
      await sleep(1 * 1000);
      await getBestlimits();
      await sleep(1 * 1000);
      await sendAllCompaniesToDB();
      await sleep(1 * 1000);
      getAllMainData();
      await sleep(30 * 1000);
    }
  }, 30 * 1000);
}
main();

// http://cdn.tsetmc.com/api/ClientType/GetClientTypeHistory/37661500521100963
