export const PAGE_LOCATION = "PAGE_LOCATION";
export const PAGE_TITLE = "PAGE_TITLE";

export function setPageLocation(location) {
  return {
    type: PAGE_LOCATION,
    payload: {
      location,
    },
  };
}

export function setPageTitle(title) {
  return {
    type: PAGE_TITLE,
    payload: {
      title,
    },
  };
}
