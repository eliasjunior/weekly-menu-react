import { requiredParameter } from "common/Util";

export function buildProdDetails({
  selectedProducts,
  productMap,
  currentRecipe,
}) {
  //TODO NEED to fix backend its not saving
  return selectedProducts.reduce((prev, id) => {
    const prodDetail = currentRecipe.prodsDetail.find(
      (prodDetail) => prodDetail.id === id
    );
    if (!prodDetail) {
      requiredParameter("Prod detail current recipe");
    }
    const quantity = prodDetail.quantity
      ? prodDetail.quantity
      : productMap.byId[id].quantityDefault;

    // const quantity = quantityMap[id]
    //   ? quantityMap[id]
    //   : productMap.byId[id].quantityDefault;

    prev.push({
      id,
      detailId: prodDetail.detailId,
      quantity,
    });
    return prev;
  }, []);
}
