import React from "react";
import CategoryItem from "./CategoryItem";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

//TODO review props on pages that call CategoryList
export default function CategoryList({
  onSelectedProd,
  onSelectAllProd,
  onRefresh
}) {
  const { displayList } = useSelector(state => state.listFilter);

  const buildList = () => {
    return displayList.map(category => {
      return (
        <CategoryItem
          key={category.id}
          category={{ ...category }}
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
