import React, { useState } from "react";
import PropTypes from "prop-types";
import CloneDeep from "lodash.clonedeep";
import CategoryHead from "./CategoryHead";
import ProductList from "./ProductList";

function CategoryItem(props) {
  const [categorySelect, setCategorySelect] = useState(false);

  const selectAllNoneProd = () => {
    const category = CloneDeep(props.category);
    const itemSelected = {
      categoryName: category.name,
      catId: category._id,
      checked: !categorySelect
    };
    setCategorySelect(itemSelected.checked);
    props.onSelectAllProd(itemSelected);
  };
  return (
    <div>
      <CategoryHead
        category={props.category}
        parentComponent={props.parentComponent}
        onHandleMessage={props.onHandleMessage}
        onRefresh={props.onRefresh}
      ></CategoryHead>
      <ProductList
        parentComponent={props.parentComponent}
        category={props.category}
        onHandleMessage={props.onHandleMessage}
        onSelectedProd={props.onSelectedProd}
        onSelectAllNoneProd={selectAllNoneProd}
        categorySelect={categorySelect}
      ></ProductList>
    </div>
  );
}
CategoryItem.propTypes = {
  category: PropTypes.object,
  onHandleMessage: PropTypes.func,
  onRefresh: PropTypes.func,
  parentComponent: PropTypes.string
};
export default CategoryItem;
