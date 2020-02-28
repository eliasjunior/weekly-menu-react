import React, { useState, useEffect } from "react";
import CategoryItem from "../../CategoryItem";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import CategoryDisplayService from "../../CategoryDisplayService";
import SearchName from "common/SearchName";
import Actions from "./Actios";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchCategoryAsync } from "vendor/actions/InventoryActions";

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

  const { handleSearchProduct } = Actions({
    setSearchText
  });
  const dispatch = useDispatch();
  //
  //const store = useStore();
  const categories = useSelector(state => state.categories, shallowEqual);
  // const cacheCats = CloneDeep(categories);
  // need to have a separate copy from the display because the search
  //setCacheCats(CloneDeep(categories));
  console.log("component Render", categories);
  useEffect(() => {
    console.log("*** useEffect *** ", categories.length);
    dispatch(fetchCategoryAsync());
  }, []);

  const buildList = () => {
    return categories.map(category => {
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
        onChangeName={e => handleSearchProduct(e.target.value, categories)}
        onResetSearch={() => {
          setSearchText("");
          //  setDisplayCats(categories);
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
