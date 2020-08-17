export function requiredParameter(name) {
  throw new Error(`${name} is required`);
}

export function logService(error) {
  console.group("alert");
  console.error(error);
  console.groupEnd("alert");
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
