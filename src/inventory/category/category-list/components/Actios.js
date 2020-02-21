import CloneDeep from "lodash.clonedeep";

export default function Actions({ setSearchText, setDisplayCats }) {
  return {
    handleSearchProduct: (value, list) => {
      const cacheCat = CloneDeep(list);
      if (value === "") {
        setSearchText("");
        setDisplayCats(list);
        return;
      }

      // TODO don't fix it now, the search will change, cloneDeep hurts performance,
      const cats = cacheCat.filter(cat => {
        cat.products = cat.products.filter(prod => {
          return prod.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
        return cat.products.length > 0;
      });
      setSearchText(value);
      setDisplayCats(cats);
    }
  };
}
