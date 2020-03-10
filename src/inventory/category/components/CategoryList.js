import React, { useState, useEffect } from "react";
import CategoryItem from "./CategoryItem";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import CategoryDisplayService from "../services/CategoryDisplayService";
import SearchName from "common/SearchName";
import ComponentActions from "./ComponentActios";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchCategoryAsync } from "app-redux/actions/InventoryActions";

const { searchInput } = CategoryDisplayService;

export default function CategoryList({
  parentComponent,
  onHandleMessage,
  onSelectedProd,
  onSelectAllProd,
  onRefresh,
  searchTitle
}) {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { handleSearchProduct } = ComponentActions({
    setSearchText,
    dispatch
  });

  const { categories, catsFilter } = useSelector(state => state, shallowEqual);

  useEffect(() => {
    async function asyncFetch() {
      dispatch(fetchCategoryAsync());
    }
    asyncFetch();
  }, []);

  const buildList = () => {
    const displayCategory = searchText.length === 0 ? categories : catsFilter;
    return displayCategory.map(category => {
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
        onChangeName={({ target }) => {
          handleSearchProduct(target.value, categories);
        }}
        onResetSearch={() => {
          setSearchText("");
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
