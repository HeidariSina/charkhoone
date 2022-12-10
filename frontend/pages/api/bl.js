export default async function handler(req, res) {
  let i = req.body.code;
  if (req.method == "POST") {
    const resDB = await fetch(
      `http://cdn.tsetmc.com/api/ClosingPrice/GetTradeTop/MostVisited/${i}/9999`
    );
    const data = await resDB.json();
    res.status(200).json({
      data,
    });
  }
}
