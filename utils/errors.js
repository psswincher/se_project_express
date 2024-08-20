class API_ERROR extends Error {
  constructor(message) {
    super(message);
    this.name = "API_ERROR";
    this.statusCode = 500;
  }
}

class RESOURCE_NOT_FOUND extends API_ERROR {
  constructor(message) {
    super(message);
    this.name = "RESOURCE_NOT_FOUND";
    this.statusCode = 404;
  }
}

class BAD_REQUEST extends API_ERROR {
  constructor(message) {
    super(message);
    this.name = "INVALID_DATA";
    this.statusCode = 400;
  }
}

module.exports = {
  RESOURCE_NOT_FOUND,
  BAD_REQUEST,
  API_ERROR,
};
