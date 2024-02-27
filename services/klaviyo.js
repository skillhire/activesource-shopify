import axios from "axios";
import { KLAVIYO_API_KEY } from "constants/shop";

export const subscribe = async (listId, email) => {
  try {
    let resp = await axios.post(
      `https://a.klaviyo.com/api/v2/list/${listId}/members`,
      {
        api_key: KLAVIYO_API_KEY,
        profiles: [
          {
            email: email,
          },
        ],
      }
    );
    return resp?.data;
  } catch (e) {
    console.log("Error", e);
  }
};
