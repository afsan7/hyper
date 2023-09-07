const redisClient = require("../redis");

module.exports.rateLimiter = (limitsecond, limitamount) => 
  async (req, res, next) => {
    const ip =
      req.headers["x-forwarded-for"] ||
      (req.connection && req.connection.remoteAddress) ||
      "";
    const [response] = await redisClient
      .multi()
      .incr(ip)
      .expire(ip, limitsecond)
      .exec();
    if (response[1] > limitamount) {
       res.json( {
        loggedIn: false,
        status: "Too many requests in quick succession",
      });
    } else next();
  };
