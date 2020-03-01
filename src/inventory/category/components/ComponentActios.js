import { inventoryFilter } from "app-redux/actions/InventoryFilterAction";

export default function ComponentActions({ setSearchText, dispatch }) {
  return {
    handleSearchProduct: (value, categories) => {
      dispatch(inventoryFilter(value, categories));
      if (value === "") {
        setSearchText("");
        return;
      }
      setSearchText(value);
    }
  };
}
