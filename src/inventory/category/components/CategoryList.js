import React from "react";
import CategoryItem from "./CategoryItem";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function CategoryList({
  parentComponent,
  onSelectedProd,
  onSelectAllProd,
  onRefresh
}) {
  const categories = useSelector(state => state.categories);
  const catsFilter = useSelector(state => state.catsFilter);
  const { displayCats, textFilter } = catsFilter;
  const currentList = textFilter.length === 0 ? categories : displayCats;
  const buildList = () => {
    return currentList.map(category => {
      return (
        <CategoryItem
          key={category.id}
          category={{ ...category }}
          parentComponent={parentComponent}
          onSelectedProd={onSelectedProd}
          onSelectAllProd={onSelectAllProd}
          onRefresh={onRefresh}
        ></CategoryItem>
      );
    });
  };
  return (
    <React.Fragment>
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
