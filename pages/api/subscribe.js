import { subscribe } from "services/klaviyo";
import { KAVIYO_LIST_ID } from "constants/shop";

export default async (req, res) => {
  let { email } = req.body;
  try {
    await subscribe(KAVIYO_LIST_ID, email);
  } catch (e) {
    console.log("Error", e);
  }
  res.status(200).json({ data: email });
};
