import { requiredParameter } from "common/Util";

export function buildShopListPayload({
  byId = requiredParameter("byId"),
  selected = requiredParameter("byId"),
}) {
  const result = Object.entries(byId).reduce((prev, [keyId, prod]) => {
    prev[keyId] = {
      id: prod.id,
      recipes: prod.recipes ? prod.recipes : [],
      selected: selected.filter((prodId) => prodId === prod.id).length === 1,
    };

    return prev;
  }, {});

  return { productsMap: result };
}
