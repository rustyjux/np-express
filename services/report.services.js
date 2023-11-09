const FetchApi = require("./fetch");
require('dotenv').config();
const npkey = process.env.NPAPIKEY;

const reportApi = async (amount) => {
  try {
    const result = await FetchApi(
      `https://api.nordic-pulse.com/v3/ski-areas/BC-BlackJack/full-report?apiKey=${npkey}`
    );
    // return result.slice(0, amount);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  reportApi,
};