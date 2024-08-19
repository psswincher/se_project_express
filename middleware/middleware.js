module.exports.authorizeUser = (req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // paste the _id of the test user created in the previous step
  };
  next();
};

module.exports.logRequest = (req, res, next) => {
  console.log("request received");
  console.log(req.url);
  console.log(req.user);
  console.log(req.body);
  next();
};
