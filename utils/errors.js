class API_ERROR extends Error {
  constructor(message) {
    super(message);
    this.name = "API_ERROR";
    this.statusCode = 500;
  }
}

class ROUTE_NOT_FOUND extends API_ERROR {
  constructor(message) {
    super(message);
    this.name = "ROUTE_NOT_FOUND";
    this.statusCode = 404;
  }
}

class ROUTE_CAST_ERROR extends API_ERROR {
  constructor(message) {
    super(message);
    this.name = "ROUTE_CAST_ERROR";
    this.statusCode = 400;
  }
}

class INVALID_DATA extends API_ERROR {
  constructor(message) {
    super(message);
    this.name = "INVALID_DATA";
    this.statusCode = 400;
  }
}

class INVALID_USER_DATA extends INVALID_DATA {
  constructor(message) {
    super(message);
    this.name = "INVALID_USER_DATA";
  }
}
class INVALID_ITEM_DATA extends INVALID_DATA {
  constructor(message) {
    super(message);
    this.name = "INVALID_ITEM_DATA";
  }
}

class NO_MATCHING_ID extends API_ERROR {
  constructor(message) {
    super(message);
    this.name = "NO_MATCHING_ID";
    this.statusCode = 400;
  }
}

class NO_MATCHING_USER_ID extends NO_MATCHING_ID {
  constructor(message) {
    super(message);
    this.name = "NO_MATCHING_USER_ID";
  }
}

class NO_MATCHING_ITEM_ID extends NO_MATCHING_ID {
  constructor(message) {
    super(message);
    this.name = "NO_MATCHING_ITEM_ID";
  }
}

module.exports = {
  ROUTE_CAST_ERROR,
  ROUTE_NOT_FOUND,
  INVALID_USER_DATA,
  INVALID_ITEM_DATA,
  NO_MATCHING_USER_ID,
  NO_MATCHING_ITEM_ID,
  API_ERROR,
};
