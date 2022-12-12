const API_URL = "http://37.32.26.91:1338/api";

const fetch = require("node-fetch");
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

async function getAllTableDatas(source)
{
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  for (let dat of source) {
    await sleep(100);
    getTableData(dat.attributes.inscode);
  }
}
//get table data 
async function getTableData(code)
{
  let tableData = {};
  try
  {
  const resTABLE = await fetch(
    `http://cdn.tsetmc.com/api/BestLimits/${code}`
  );
  if (resTABLE.status == 200) {
    tableData = await resTABLE.json();
  }
  const res = await fetch(`${API_URL}/tabledatas?filters[inscode]=${code}`);
  const DB = await res.json();
  let body = {
    data: {
      inscode: code,
      data: {
        tabledata : tableData.bestLimits,
      },
    },
  };
  if (DB.data.length < 1) {
    const response = await fetch(`${API_URL}/tabledatas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    const response = await fetch(`${API_URL}/tabledatas/${DB.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }}catch (error) {
    console.log(`Cant fetch ${code}`);
    setTimeout(() => {
      getTableData(code);
    }, 300);
  }
}

async function getAllBuyDatas(source)
{
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  for (let dat of source) {
    await sleep(50);
    getBuyData(dat.attributes.inscode);
  }
}
//get buy data 
async function getBuyData(code){
  let webdata = {};
  try
  {
  const resweb = await fetch(
    `http://cdn.tsetmc.com/api/ClientType/GetClientType/${code}/1/0`
  );
  if (resweb.status == 200) {
    webdata = await resweb.json();
  }
  const res = await fetch(`${API_URL}/buydatas?filters[inscode]=${code}`);
  if(res.status == 200)
  {
    const DB = await res.json();
  let buyjs = webdata.clientType;
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
  }
  
  let body = {
    data: {
      inscode: code,
      data: {
        buydata : buy,
      },
    },
  };
  if (DB.data.length < 1) {
    const response = await fetch(`${API_URL}/buydatas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    const response = await fetch(`${API_URL}/buydatas/${DB.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }}catch (error) {
    console.log(`Cant fetch ${code}`);
    console.log(`Cant fetch ${error}`);
    setTimeout(() => {
      getBuyData(code);
    }, 300);
  }
}

async function getAllMabnaDatas(source)
{
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  await sleep(10);
  for (let dat of source) {
    getMabnaData(dat.attributes.inscode);
  }
}
//get table data
async function getMabnaData(code){
  let webdata = {};
  try
  {
  const resweb = await fetch(
    `http://cdn.tsetmc.com/api/Instrument/GetInstrument/${code}`
  );
  webdata = await resweb.json();
  const res = await fetch(`${API_URL}/mabnas?filters[inscode]=${code}`);
  const DB = await res.json();
  let mabna1 = {
    saham :     Object.keys(webdata).length === 0 ? "-" : webdata.instrument.zTitad,
    volumeMabna : Object.keys(webdata).length === 0 ? "-" : webdata.instrument.baseVol,
  }
  let body = {
    data: {
      inscode: code,
      data: {
        mabna : mabna1,
      },
    },
  };
  if (DB.data.length < 1) {
    const response = await fetch(`${API_URL}/mabnas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    const response = await fetch(`${API_URL}/mabnas/${DB.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }}catch (error) {
    console.log(`Cant fetch ${code}`);
    setTimeout(() => {
      getMabnaData(code);
    }, 300);
  }
}


async function getAllDatas(source)
{
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  for (let dat of source) {
    await sleep(10);
    getData(dat.attributes.inscode);
  }
}
//get table data 
async function getData(code){
  let webdata = {};
  try
  {
  const resweb = await fetch(
    `http://cdn.tsetmc.com/api/ClosingPrice/GetClosingPriceInfo/${code}`
  );
  webdata = await resweb.json();
  const res = await fetch(`${API_URL}/maindatas?filters[inscode]=${code}`);
  const DB = await res.json();
  let data = webdata.closingPriceInfo;
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
  };
  let volume = {
      volume: Object.keys(data).length === 0 ? "-" : data.qTotTran5J,
      value: Object.keys(data).length === 0 ? "-" : data.qTotCap,
      number: Object.keys(data).length === 0 ? "-" : data.zTotTran,
  };
  let body = {
    data: {
      inscode: code,
      data: {
        mainInformation : mainInformation,
        volume : volume,
      },
    },
  };
  if (DB.data.length < 1) {
    const response = await fetch(`${API_URL}/maindatas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    const response = await fetch(`${API_URL}/maindatas/${DB.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }}catch (error) {
    console.log(`Cant fetch ${code}`);
    setTimeout(() => {
      getData(code);
    }, 300);
  }
}

async function getAllStateDatas(source)
{
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  for (let dat of source) {
    await sleep(2000);
    getStateData(dat.attributes.inscode);
  }
}
//get table data
async function getStateData(code){
  let webdata = {};
  try
  {
  const resweb = await fetch(
    `http://cdn.tsetmc.com/api/ClosingPrice/GetClosingPriceDailyList/${code}/9999`
  );
  webdata = await resweb.json();
  const res = await fetch(`${API_URL}/statedatas?filters[inscode]=${code}`);
  const DB = await res.json();
  let data = webdata.closingPriceDaily;
  for (let i of data) {
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
    data = temp;
  let body = {
    data: {
      inscode: code,
      data: {
        statData : data,
      },
    },
  };
  if (DB.data.length < 1) {
    const response = await fetch(`${API_URL}/statedatas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    const response = await fetch(`${API_URL}/statedatas/${DB.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }}catch (error) {
    console.log(`Cant fetch ${code}`);
    setTimeout(() => {
      getStateData(code);
    }, 300);
  }
}

async function getAllSellDatas(source)
{
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  for (let dat of source) {
    await sleep(2000);
    getSellData(dat.attributes.inscode);
  }
}
//get table data
async function getSellData(code){
  let webdata = {};
  try
  {
  const resweb = await fetch(
      `http://cdn.tsetmc.com/api/ClientType/GetClientTypeHistory/${code}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
    }
  );
  webdata = await resweb.json();
  const res = await fetch(`${API_URL}/selldatas?filters[inscode]=${code}`);
  const DB = await res.json();
  let data = webdata.clientType;
  let temp2 = [];
    for (let i of data) {
      temp2.push({
        sell: i.sell_I_Value,
        buy: i.buy_I_Value,
        time: i.recDate,
      });
    }
  data = temp2;

  let body = {
    data: {
      inscode: code,
      data: {
        sell : data,
      },
    },
  };
  if (DB.data.length < 1) {
    const response = await fetch(`${API_URL}/selldatas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    const response = await fetch(`${API_URL}/selldatas/${DB.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }}catch (error) {
    console.log(`Cant fetch ${code}`);
    setTimeout(() => {
      getSellData(code);
    }, 300);
  }
}

async function getAllMainStateDatas(source)
{
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  for (let dat of source) {
    await sleep(2000);
    getMainStateData(dat.attributes.inscode);
  }
}
//get table data 
async function getMainStateData(code){
  let webdata = {};
  try
  {
  const resweb = await fetch(
    `http://cdn.tsetmc.com/api/Trade/GetTrade/${code}`
  );
  webdata = await resweb.json();
  const res = await fetch(`${API_URL}/mainstates?filters[inscode]=${code}`);
  const DB = await res.json();
  let data = webdata.trade;
  let da = []
  data.reverse();
  data.map((el, index) => {
    if (index % 30 == 0)
      da.push({ qTitTran: el.qTitTran, pTran: el.pTran, hEven: el.hEven });
  });
  data = da;
  data.reverse();
  let body = {
    data: {
      inscode: code,
      data: {
        mainStateData : data,
      },
    },
  };
  if (DB.data.length < 1) {
    const response = await fetch(`${API_URL}/mainstates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    const response = await fetch(`${API_URL}/mainstates/${DB.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }}catch (error) {
    console.log(`Cant fetch ${code}`);
    setTimeout(() => {
      getMainStateData(code);
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
  source = source.data;
  // await sleep(1000);
  // await getAllTableDatas(source);
  // await sleep(1000);
  // await getAllMabnaDatas(source);
  // await sleep(1000);
  // await getAllDatas(source);
  // await sleep(1000);
  await getAllBuyDatas(source);
  // await sleep(1000);



  // await getAllStateDatas(source);
  // await getAllMainStateDatas(source);
  // await getAllSellDatas(source);

}

async function main() {
  // await catchGroups();
  // await getFirstPage();
  // await getBestlimits();
  // await sendAllCompaniesToDB();
  await getAllMainData();
  // setInterval(() => {
  //   catchGroups();
  // }, 24 * 60 * 60 * 1000);
}
main();

// http://cdn.tsetmc.com/api/ClientType/GetClientTypeHistory/37661500521100963
