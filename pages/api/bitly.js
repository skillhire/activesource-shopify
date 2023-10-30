import bitly from "services/bitly";

export default async (req, res) => {
  let { url } = req.body;
  let resp;
  try {
    resp = await bitly.shorten(url);
  } catch (e) {
    console.log("Error", e);
  }
  res.status(200).json({ data: resp });
};
