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
  onRefresh: PropTypes.func
};
export default CategoryItem;
