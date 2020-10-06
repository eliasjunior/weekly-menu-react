import RequiredParameterError from "./RequiredParameterError";
import _ from "lodash";

export function requiredParameter(name) {
  throw new RequiredParameterError(`${name} is required`);
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
      return "https://week-menu-api.herokuapp.com/";
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
  return prodsDetail.reduce((prev, { id, quantity }) => {
    prev[id] = quantity;
    return prev;
  }, {});
}
