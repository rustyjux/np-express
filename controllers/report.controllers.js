const { reportCache } = require("../middleware/report.cache");
const { reportApi } = require("../services/report.services");

const reportController = async (req, res) => {
  try {
    const data = await reportApi(25);
    reportCache.set("report-list", data);
    res.send(data);
    res.status(200);
  } catch (err) {
    res.status(500);
    console.log(err);
    throw err;
  }
};

module.exports = {
  reportController,
};