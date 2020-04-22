import React from "react";
import PropTypes from "prop-types";
import CategoryHead from "./CategoryHead";
import ProductList from "../../product/components/ProductList";

function CategoryItem({ category }) {
  return (
    <>
      <CategoryHead category={category}></CategoryHead>
      <ProductList products={category.products}></ProductList>
    </>
  );
}
CategoryItem.propTypes = {
  category: PropTypes.object,
};
export default CategoryItem;
