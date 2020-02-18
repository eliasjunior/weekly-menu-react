import CloneDeep from "lodash.clonedeep";

export default function Actions({ setSearch, setCategories }) {
  return {
    resetSearch: (search, list) => {
      setSearch(search);
      setCategories(list);
    },
    handleSearchProduct: (value, list) => {
      if (value === "") {
        setSearch("");
        setCategories(list);
        return;
      }

      // TODO don't fix it now, the search will change, cloneDeep hurts performance,
      const cats = CloneDeep(list).filter(cat => {
        cat.products = cat.products.filter(prod => {
          return prod.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
        return cat.products.length > 0;
      });
      setSearch(value);
      setCategories(cats);
    }
  };
}
