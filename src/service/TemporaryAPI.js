import axios from "axios";
import { productsMapper } from "inventory/use-cases/CategoryMapper";
// this is a temporaty soluction until refactor the Back-end
export const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3004/"
    : "https://week-menu-api.herokuapp.com/";
};
export async function linkProds(parentList, idName) {
  const prodResponse = await axios.get(getBaseUrl() + "products");
  const prods = prodResponse.data;

  return parentList.map(parent => {
    parent.products = prods.filter(prod => prod[idName] === parent._id);
    return parent;
  });
}

export async function getProducts() {
  try {
    // Im not using mapper here because I'll treat this later
    const responseProd = await axios.get(getBaseUrl() + "products");
    return normalize(responseProd.data);
  } catch (error) {
    throw error;
  }
}

function normalize(data) {
  const makeByIdTable = (prev, { _id, name, catId }) => {
    prev.byId[_id] = {
      _id,
      name,
      catId
    };
    prev.allIds.push(_id);
    return prev;
  };
  return data.reduce(makeByIdTable, { byId: {}, allIds: [] });
}
