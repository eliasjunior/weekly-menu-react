import RequiredParameterError from "./RequiredParameterError";
import _ from "lodash";

// null has to be sanitized and just expected undefined
export function requiredParameter(name, isThrow = true) {
  //TODO add log monitoring
  if (isThrow) {
    throw new RequiredParameterError(`${name} is required`);
  } else {
    console.error(`${name} is required *`);
  }
}

//TODO move to other function/gateways, but test first
export function cleanFromApi(data) {
  return data.map((item) => {
    return Object.keys(item).reduce((acc, key) => {
      acc[key] = item[key];
      if (acc[key] === null || acc[key] === "null") {
        acc[key] = undefined;
      }
      return acc;
    }, {});
  });
}

export function requiredList(list = requiredParameter("list from required list"),
                             name = requiredParameter("name from required list")) {
  if (list.length === 0) {
    console.warn(`${name} has length 0`);
  } else {
    console.debug(`${name} filled up`);
  }
}

export function isEmpty(value) {
  return _.isEmpty(value);
}

export function isNull(value) {
  return _.isNull(value);
}

export function isUndefined(value) {
  return _.isUndefined(value);
}

export function isNumber(value) {
  return _.isNumber(value);
}

export function toNumber(value) {
  return _.toNumber(value);
}

export function logService(error) {
  if (process.env.NODE_ENV !== "test") {
    console.group("alert");
    console.error(error);
    console.groupEnd("alert");
  }
}

export function getServerUrl() {
  const {
    REACT_APP_SERVER_DEV_PROTOCOL,
    REACT_APP_SERVER_DEV_HOST,
    REACT_APP_SERVER_DEV_PORT,
    NODE_ENV,
  } = process.env;
  switch (NODE_ENV) {
    case "production":
      return "https://weekly-menu-java.herokuapp.com/v1/";
    case "test":
    default:
      return (
        REACT_APP_SERVER_DEV_PROTOCOL +
        "://" +
        REACT_APP_SERVER_DEV_HOST +
        ":" +
        REACT_APP_SERVER_DEV_PORT +
        "/v1/"
      );
  }
}

//are those belong here ?
export function quantityMapper(productMap) {
  return productMap.allIds.reduce((prev, prodId) => {
    const prod = productMap.byId[prodId];
    if (!prod) {
      requiredParameter("prod for quantity map");
    }
    prev[prodId] = prod.quantityDefault;
    return prev;
  }, {});
}

export function quantityMapperProdsDetail(prodsDetail) {
  return prodsDetail.reduce((prev, {id, quantity}) => {
    prev[id] = quantity;
    return prev;
  }, {});
}

export function upperCaseFirstChar(row) {
  if (!row.name) {
    return row;
  }
  row.name = row.name.charAt(0).toUpperCase().concat(row.name.slice(1));
  return row;
}

export function compareObject({nameA = ""}, {nameB = ""}) {
  if (nameA === "") {
    return 0;
  }
  const tempA = nameA.toUpperCase();
  const tempB = nameB.toUpperCase();
  if (tempA < tempB) {
    return -1;
  }
  if (tempA > tempB) {
    return 1;
  }
  // names must be equal
  return 0;
}

export function compareDates({name: dateStrA = ""}, {name: dateStrB = ""}) {
  if (dateStrA === "") {
    return 0;
  }
  const tempA = new Date(dateStrA);
  const tempB = new Date(dateStrB);
  if (tempA.getTime() > tempB.getTime()) {
    return -1;
  }
  if (tempA.getTime() < tempB.getTime()) {
    return 1;
  }
  // names must be equal
  return 0;
}
