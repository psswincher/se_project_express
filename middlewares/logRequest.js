module.exports.logRequest = (req, res, next) => {
  console.log("request received");
  console.log(req.url);
  console.log(req.body);
  next();
};
