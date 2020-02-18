import React, { useState, useEffect } from "react";
import CategoryItem from "../../CategoryItem";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";

import CategoryDisplayService from "../../CategoryDisplayService";
import SearchName from "../../../../common/SearchName";
import Presenter from "../../presenter";
import Actions from "./Actios";

const { categories, compareListsSize } = Presenter;
const { searchInput } = CategoryDisplayService;

export default function CategoryList({
  list,
  parentComponent,
  onHandleMessage,
  onSelectedProd,
  onSelectAllProd,
  onRefresh,
  searchTitle
}) {
  const [catList, setCatList] = useState(categories);
  const [search, setSearch] = useState("");

  const { resetSearch, handleSearchProduct } = Actions({
    setCatList,
    setSearch
  });

  useEffect(() => {
    const hasChanged = compareListsSize(catList, list);
    if (hasChanged) {
      setCatList(list);
    }
  }, [catList, list]);

  const buildList = () => {
    return catList.map(category => {
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
        onSearch={search}
        onChangeName={e => handleSearchProduct(e.target.value, catList)}
        onResetSearch={resetSearch}
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
