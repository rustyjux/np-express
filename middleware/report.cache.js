const Cache = require("node-cache");
const reportCache = new Cache({ stdTTL: 60 * 5 });

const reportCacheMiddleware = (req, res, next) => {
  try {
    if (reportCache.has("report-list")) {
      res.setHeader('X-Cache-Status', 'HIT');
      return res.send(reportCache.get("report-list")).status(200);
    }
    res.setHeader('X-Cache-Status', 'MISS');
    return next();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  reportCacheMiddleware,
  reportCache,
};