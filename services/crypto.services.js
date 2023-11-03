const FetchApi = require("./fetch");

const cryptoApi = async (amount) => {
  try {
    const result = await FetchApi(
      "https://catfact.ninja/fact"
    );
    // return result.slice(0, amount);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  cryptoApi,
};