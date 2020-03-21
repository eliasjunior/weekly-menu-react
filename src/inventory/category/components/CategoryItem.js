import React from "react";
import PropTypes from "prop-types";
import CategoryHead from "./CategoryHead";
import ProductList from "../../product/components/ProductList";

function CategoryItem(props) {
  return (
    <div>
      <CategoryHead
        category={props.category}
        onRefresh={props.onRefresh}
      ></CategoryHead>
      <ProductList category={props.category}></ProductList>
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
