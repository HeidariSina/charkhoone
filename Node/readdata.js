const API_URL = "http://94.101.186.158:1338/api";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const fetch = require("node-fetch");

// this function includes a function that send a company to db
async function sendCompony(data, DB) {
  let i = DB.findIndex((ele) => ele.attributes.inscode == data.inscode);
  let response ;
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
    response = await fetch(`${API_URL}/companies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    response = await fetch(`${API_URL}/companies/${DB[i].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
  delete(response);
  delete(body);
  delete(i);
}

//sender of groups to db
async function sendGroup(data, DB) {
  let i = DB.findIndex((ele) => ele.attributes.inscode == data.inscode);
  let response;
  let body = {
    data: {
      name: data.name,
      group: data.group,
    },
  };
  if (i < 0) {
    response = await fetch(`${API_URL}/groups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    response = await fetch(`${API_URL}/groups/${DB[i].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
  delete(response);
  delete(body);
  delete(i);
}

// sender the first page to db
async function sendFP(fPData) {
  const resDB = await fetch(`${API_URL}/firstpages`);
  const dB = await resDB.json();
  let response;
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
    response = await fetch(`${API_URL}/firstpages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    response = await fetch(`${API_URL}/firstpages/${dB.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
  delete(response);
  delete(body);
  delete(dB);
  delete(resDB);
}

async function sendBL(dat, number) {
  const resDB = await fetch(`${API_URL}/bestlimitsg${number}s`);
  const dB = await resDB.json();
  let response;
  let body = {
    data: {
      data: {
        dat,
      },
    },
  };
  if (dB.data.length == 0) {
    response = await fetch(`${API_URL}/bestlimitsg${number}s`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    response = await fetch(
      `${API_URL}/bestlimitsg${number}s/${dB.data[0].id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
  }
  delete(body);
  delete(resDB);
  delete(dB);
  delete(response);
}
// make Exactly 2 length
function pad(d) {
  return d < 10 ? "0" + d.toString() : d.toString();
}

// catch all of groups send them to db
async function catchGroups() {
  let res;
  let resDB;
  let DB;
  let groups;
  try {
    res = await fetch(
      `http://cdn.tsetmc.com/api/StaticData/GetStaticData`
    );
    resDB = await fetch(
      `${API_URL}/groups?pagination[page]=1&pagination[pageSize]=300`
    );
    DB = await resDB.json();
    if (res.status == 200) {
      groups = await res.json();
      for (gr of groups.staticData) {
        if (gr.type == "IndustrialGroup") {
          let dat = {
            name: gr.name,
            group: pad(gr.code),
          };
          sendGroup(dat, DB.data);
          delete(dat)
        }
      }
    }
    delete(res);
    delete(resDB);
    delete(DB);
    delete(groups);
  } catch (error) {
    delete(res);
    delete(resDB);
    delete(DB);
    delete(groups);
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
    await datas["relatedCompany"].map(async (e) => {
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
      delete(databack);
    });
    delete(datas);
  }
  delete(res);
}

//send each groups of companies to DB
async function sendAllCompaniesToDB() {
  let resDB;
  let resSource;
  let source;
  let DB;
  try {
    resDB = await fetch(
      `${API_URL}/groups?pagination[page]=1&pagination[pageSize]=300`
    );
    resSource = await fetch(
      `${API_URL}/companies?pagination[page]=1&pagination[pageSize]=2000`
    );
    source = await resDB.json();
    DB = await resSource.json();
    for (g of source.data) {
      await componyToId(g.attributes.group, DB.data);
    }
    delete(resDB);
    delete(resSource);
    delete(DB);
    delete(source);
  } catch (error) {
    delete(resDB);
    delete(resSource);
    delete(DB);
    delete(source);
    setTimeout(() => sendAllCompaniesToDB(), 3000);
  }
}

// send firstPage Data to DB
async function getFirstPage() {
  let g1res;
  let g2res;
  let g2jss;
  let g1bres;
  let g1bjs;
  let g2bres;
  let g2bjs;
  let g1js;
  let g2js;
  let g1;
  let g2;
  let g1jss;
  try {
     g1res = await fetch(
      "http://cdn.tsetmc.com/api/MarketData/GetMarketOverview/1"
    );
     g1jss = await g1res.json();
     g2res = await fetch(
      "http://cdn.tsetmc.com/api/MarketData/GetMarketOverview/2"
    );
     g2jss = await g2res.json();
     g1bres = await fetch(
      "http://cdn.tsetmc.com/api/ClosingPrice/GetTradeTop/MostVisited/1/5"
    );
     g1bjs = await g1bres.json();
     g2bres = await fetch(
      "http://cdn.tsetmc.com/api/ClosingPrice/GetTradeTop/MostVisited/2/5"
    );
     g2bjs = await g2bres.json();
     g1js = g1jss.marketOverview;
     g2js = g2jss.marketOverview;
     g1 = {
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
    g2 = {
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
    await sendFP({ g1, g2, g1best: g1bjs.tradeTop, g2best: g2bjs.tradeTop });
    delete(g1res);
    delete(g1jss);
    delete(g2res);
    delete(g2jss);
    delete(g1bres);
    delete(g1bjs);
    delete(g2bres);
    delete(g2bjs);
    delete(g1js);
    delete(g2js);
    delete(g1);
    delete(g2);
  } catch (error) {
    delete(g1res);
    delete(g1jss);
    delete(g2res);
    delete(g2jss);
    delete(g1bres);
    delete(g1bjs);
    delete(g2bres);
    delete(g2bjs);
    delete(g1js);
    delete(g2js);
    delete(g1);
    delete(g2);
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
      delete(resDB);
      delete(data);
    }
    delete(numbers);
  } catch (error) {
    setTimeout(() => getBestlimits(), 3000);
  }
}

async function getAllTableDatas(source)
{
  for (let dat of source) {
    await sleep(210);
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
  let response;
  let body = {
    data: {
      inscode: code,
      data: {
        tabledata : tableData.bestLimits,
      },
    },
  };
  if (DB.data.length < 1) {
     response = await fetch(`${API_URL}/tabledatas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    response = await fetch(`${API_URL}/tabledatas/${DB.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
  delete(response);
  delete(body);
  delete(DB);
  delete(res);
  delete(tableData);
  delete(resTABLE);
}catch (error) {
    setTimeout(() => {
      getTableData(code);
    }, 300);
  }
}

async function getAllBuyDatas(source)
{
  for (let dat of source) {
    await sleep(210);
    getBuyData(dat.attributes.inscode);
  }
}
//get buy data 
async function getBuyData(code){
  let webdata = {};
  let buy ;
  try
  {
  const resweb = await fetch(
    `http://cdn.tsetmc.com/api/ClientType/GetClientType/${code}/1/0`
  );
  const res = await fetch(`${API_URL}/buydatas?filters[inscode]=${code}`);
  const DB = await res.json();
  let response;
  if(resweb.status == 200)
  {
  webdata = await resweb.json();
  let buyjs = webdata.clientType;
  buy = {
    sellIVolume: Object.keys(buyjs).length === 0 ? "" : buyjs.sell_I_Volume,
    sellICount: Object.keys(buyjs).length === 0 ? "" : buyjs.sell_CountI,
    buyIVolume: Object.keys(buyjs).length === 0 ? "" : buyjs.buy_I_Volume,
    buyICount: Object.keys(buyjs).length === 0 ? "" : buyjs.buy_CountI,
    sellNVolume: Object.keys(buyjs).length === 0 ? "" : buyjs.sell_N_Volume,
    sellNCount: Object.keys(buyjs).length === 0 ? "" : buyjs.sell_CountN,
    buyNVolume: Object.keys(buyjs).length === 0 ? "" : buyjs.buy_N_Volume,
    buyNCount: Object.keys(buyjs).length === 0 ? "" : buyjs.sell_CountN,
  };
  delete(buyjs);
  }else
  {
    buy = {
      sellIVolume: "",
      sellICount: "",
      buyIVolume: "",
      buyICount: "",
      sellNVolume: "",
      sellNCount: "",
      buyNVolume:"" ,
      buyNCount: "" ,
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
    response = await fetch(`${API_URL}/buydatas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    response = await fetch(`${API_URL}/buydatas/${DB.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
  delete(response);
  delete(body);
  delete(buy);
  delete(webdata);
  delete(resweb);
  delete(res);
  delete(DB);
}catch (error) {
    setTimeout(() => {
      getBuyData(code);
    }, 300);
  }
}

async function getAllMabnaDatas(source)
{
  for (let dat of source) {
    await sleep(210);
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
  let response;
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
    response = await fetch(`${API_URL}/mabnas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    response = await fetch(`${API_URL}/mabnas/${DB.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
  delete(body);
  delete(response);
  delete(webdata);
  delete(resweb);
  delete(DB);
  delete(res);
  delete(mabna1);
}catch (error) {
    setTimeout(() => {
      getMabnaData(code);
    }, 300);
  }
}


async function getAllDatas(source)
{
  for (let dat of source) {
    await sleep(210);
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
  let response;
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
    response = await fetch(`${API_URL}/maindatas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    response = await fetch(`${API_URL}/maindatas/${DB.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
  delete(response);
  delete(body);
  delete(DB);
  delete(webdata);
  delete(resweb);
  delete(res);
  delete(mainInformation);
  delete(volume);
  delete(data);
}catch (error) {
    setTimeout(() => {
      getData(code);
    }, 300);
  }
}

async function getAllStateDatas(source)
{
  for (let dat of source) {
    await sleep(2500);
    getStateData(dat.attributes.inscode);
  }
}
//get table data
async function getStateData(code){
  let data = {};
  try
  {
  const resweb = await fetch(
    `http://cdn.tsetmc.com/api/ClosingPrice/GetClosingPriceDailyList/${code}/9999`
  );
  data = await resweb.json();
  const res = await fetch(`${API_URL}/statedatas?filters[inscode]=${code}`);
  const DB = await res.json();
  let temp=[];
  let response;
  data = data.closingPriceDaily;
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
    response = await fetch(`${API_URL}/statedatas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    response = await fetch(`${API_URL}/statedatas/${DB.data[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
  delete(response);
  delete(body);
  delete(DB);
  delete(webdata);
  delete(resweb);
  delete(res);
  delete(temp);
  delete(data);
}catch (error) {
    setTimeout(() => {
      getStateData(code);
    }, 300);
  }
}

async function getAllSellDatas(source)
{
  for (let dat of source) {
    await sleep(2500);
    getSellData(dat.attributes.inscode);
  }
}
//get table data
async function getSellData(code){
  let data;
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
  data = await resweb.json();
  const res = await fetch(`${API_URL}/selldatas?filters[inscode]=${code}`);
  const DB = await res.json();
  data = data.clientType;
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
  }
  delete(response);
  delete(body);
  delete(DB);
  delete(webdata);
  delete(resweb);
  delete(res);
  delete(temp2);
  delete(data);
}catch (error) {
    setTimeout(() => {
      getSellData(code);
    }, 300);
  }
}

async function getAllMainStateDatas(source)
{
  for (let dat of source) {
    await sleep(2500);
    getMainStateData(dat.attributes.inscode);
  }
}
//get table data 
async function getMainStateData(code){
  let data = {};
  try
  {
  const resweb = await fetch(
    `http://cdn.tsetmc.com/api/Trade/GetTrade/${code}` , {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
  }
  );
  data = await resweb.json();
  const res = await fetch(`${API_URL}/mainstates?filters[inscode]=${code}`);
  const DB = await res.json();
  data = data.trade;
  let response;
  let da = [];
  let flag = 1;
  let id ;
  if (DB.data.length < 1)
  {
    flag = 0;
  }
  else
  {
    id = DB.data[0].id;
  }
  delete(DB);
  delete(resweb);
  delete(res);
  data.reverse();
  data.map((el) => {
      da.push({ qTitTran: el.qTitTran, pTran: el.pTran, hEven: el.hEven });
  });
  data = da;
  delete(da);

  data.reverse();
  let body = {
    data: {
      inscode: code,
      data: {
        mainStateData : data,
      },
    },
  };
  if (flag = 1) {
    response = await fetch(`${API_URL}/mainstates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    response = await fetch(`${API_URL}/mainstates/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
  delete(response);
  delete(body);
  delete(data);
}catch (error) {
    setTimeout(() => {
      getMainStateData(code);
    }, 300);
  }
}

//get all of companieys mainData
async function getAllMainData() {
  const resSource = await fetch(
    `${API_URL}/companies?pagination[page]=1&pagination[pageSize]=2000`
  );

  let source = await resSource.json();
  source = source.data;
  await sleep(3000);
  await getAllTableDatas(source);
  await sleep(3000);
  await getAllMabnaDatas(source);
  await sleep(3000);
  await getAllDatas(source);
  await sleep(3000);
  await getAllBuyDatas(source);
  delete(resSource);
  delete(source);
  await sleep(3000);
  
  // await getAllStateDatas(source);
  // await sleep(30 * 1000);
  // await getAllMainStateDatas(source);
  // await getAllSellDatas(source);
}

async function main() {
  while(true)
  {
    let  currentdate = new Date();
    currentdate = new Date(currentdate.getTime() + 3 * 1000 * 60 * 60 + 1000 * 60 * 30);
    let h = currentdate.getHours();
    let m = currentdate.getMinutes();

    if ((h < 12 && h > 8) || (h == 12 && m < 10)){
      await catchGroups();
      await getFirstPage();
      await sleep(1000);
      await getBestlimits();
      await sleep(1000);
      await sendAllCompaniesToDB();
      await sleep(1000);
      getAllMainData();
      await sleep( 3 * 60 * 1000);
    }
    else if (h >= 20 && h <21)
    {
      const resSource = await fetch(
        `${API_URL}/companies?pagination[page]=1&pagination[pageSize]=2000`
      );
    
      let source = await resSource.json();
      source = source.data;
      await getAllSellDatas(source);
      delete(source);
      delete(resSource);
      await sleep(1000 * 60 * 30)
    }
    else if(h >= 17 && h <18)
    {
      const resSource = await fetch(
        `${API_URL}/companies?pagination[page]=1&pagination[pageSize]=2000`
      );
    
      let source = await resSource.json();
      source = source.data;
      await getAllMainStateDatas(source);
      delete(source);
      delete(resSource);
      await sleep(1000 * 60 * 30)

    }
    else if(h >= 14 && h <15)
    {
      const resSource = await fetch(
        `${API_URL}/companies?pagination[page]=1&pagination[pageSize]=2000`
      );
    
      let source = await resSource.json();
      source = source.data;
      await getAllStateDatas(source);
      delete(source);
      delete(resSource);
      await sleep(1000 * 60 * 30)
    }
    else if (h == 23){break;}
    else
    {
      delete(currentdate);
      delete(h);
      await sleep(30 * 60 * 1000);
    }
    delete(currentdate);
    delete(h);
  }
  return 0;
}
let flag = 0;
while(true)
{
  let  currentdate = new Date();
  currentdate = new Date(currentdate.getTime() + 3 * 1000 * 60 * 60 + 1000 * 60 * 30);
  let h = currentdate.getHours();
  if (h == 6)
  {
    flag = 0;
  }
  if (h == 7 && flag == 0)
  {
    main();
  }
  await sleep(1000 * 60 * 30);
}