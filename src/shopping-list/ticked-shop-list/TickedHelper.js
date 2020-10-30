import { requiredParameter } from "common/Util";

export default function TicketHelper({ getDeepCopy }) {
  return {
    filterByPicked: function (displayList) {
      const copiedList = getDeepCopy(displayList);
      if (!copiedList) {
        return [];
      }
      return copiedList.filter((cat) => {
        if (!cat.products) {
          requiredParameter("products from category");
        }
        const pickedProds = cat.products.filter((prod) => prod.picked);
        cat.products = pickedProds;
        return cat.products.length > 0;
      });
    },
  };
}
