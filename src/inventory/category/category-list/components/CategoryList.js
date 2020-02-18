import React, { useState, useEffect } from "react";
import CategoryItem from "../../CategoryItem";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";

import CategoryDisplayService from "../../CategoryDisplayService";
import SearchName from "../../../../common/SearchName";
import Presenter from "../../../presenter";
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
  const [catList, setCategories] = useState(categories);
  const [search, setSearch] = useState("");

  const { resetSearch, handleChange } = Actions({ setCategories, setSearch });

  useEffect(() => {
    const hasChanged = compareListsSize(catList, list);
    if (hasChanged) {
      setCategories(list);
    }
  });

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

  const displaySearch = () => {
    const isVisible = searchInput(parentComponent).display;
    if (!isVisible) {
      return "";
    }

    return (
      <SearchName
        onSearch={search}
        onChangeName={e => handleChange(e.target.value, catList)}
        onResetSearch={resetSearch}
        searchTitle={searchTitle}
      ></SearchName>
    );
  };
  return (
    <div>
      {displaySearch()}
      <List>{buildList()}</List>
    </div>
  );
}

CategoryList.propTypes = {
  onSelectedProd: PropTypes.func,
  onSelectAllProd: PropTypes.func,
  parentComponent: PropTypes.string,
  list: PropTypes.array
};
