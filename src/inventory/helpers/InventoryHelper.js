export default {
  compareListsSize: (listA, listB) => {
    const reducerCount = (acc, item) => {
      const totalSelected = item.products.filter((prod) => prod.checked).length;
      return acc + totalSelected;
    };
    const totalP = listA.reduce(reducerCount, 0);
    const totalC = listB.reduce(reducerCount, 0);

    return listA.length !== listB.length || totalC !== totalP;
  },
};

export function loadProductsToCategory(categories, allProducts) {
  console.log(categories, allProducts);
  if (!allProducts.byId) {
    return [];
  }
  return categories.reduce((prev, item) => {
    item.products = item.catProds.map((prodId) => allProducts.byId[prodId]);
    prev.push(item);
    return prev;
  }, []);
}
