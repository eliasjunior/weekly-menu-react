import React, { useState, useEffect } from "react";
import CategoryItem from "../../CategoryItem";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";

import CategoryDisplayService from "../../CategoryDisplayService";
import SearchName from "common/SearchName";
import Presenter from "inventory/presenter";
import Actions from "./Actios";
import CloneDeep from "lodash.clonedeep";

const { getCategories } = Presenter;
const { searchInput } = CategoryDisplayService;

export default function CategoryList({
  parentComponent,
  onHandleMessage,
  onSelectedProd,
  onSelectAllProd,
  onRefresh,
  searchTitle
}) {
  const [displayCats, setDisplayCats] = useState([]);
  const [cacheCats, setCacheCats] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { handleSearchProduct } = Actions({
    setDisplayCats,
    setSearchText
  });

  useEffect(() => {
    async function fetchCat() {
      const result = await getCategories();
      setDisplayCats(result);
      // need to have a separate copy from the display because the search
      setCacheCats(CloneDeep(result));
    }
    fetchCat();
  }, []);

  const buildList = () => {
    return displayCats.map(category => {
      return (
        <CategoryItem
          key={category._id}
          category={{ ...category }}
          parentComponent={parentComponent}
          onHandleMessage={onHandleMessage}
          onSelectedProd={onSelectedProd}
          onSelectAllProd={onSelectAllProd}
          onRefresh={onRefresh}
        ></CategoryItem>
      );
    });
  };

  return (
    <React.Fragment>
      <SearchName
        isVisible={searchInput(parentComponent).display}
        onSearch={searchText}
        onChangeName={e => handleSearchProduct(e.target.value, cacheCats)}
        onResetSearch={() => {
          setSearchText("");
          setDisplayCats(cacheCats);
        }}
        searchTitle={searchTitle}
      ></SearchName>
      <List>{buildList()}</List>
    </React.Fragment>
  );
}

CategoryList.propTypes = {
  onSelectedProd: PropTypes.func,
  onSelectAllProd: PropTypes.func,
  parentComponent: PropTypes.string,
  list: PropTypes.array
};
