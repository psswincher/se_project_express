module.exports.logRequest = (req, res, next) => {
  // console.log("request received");
  console.log(req.user);
  console.log(req.headers);
  console.log(req.body);
  next();
};
