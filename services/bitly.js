import { BITLY_ACCESS_TOKEN } from "constants/shop";
const BitlyClient = require("bitly").BitlyClient;
const bitly = new BitlyClient(BITLY_ACCESS_TOKEN);
export default bitly;
