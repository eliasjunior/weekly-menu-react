import React from "react";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import DisplayService from "inventory/category/services/CategoryDisplayService";
import SelectAllNone from "components/SelectAllNone";
import ProductForm from "./ProductForm";

export default function ProductList({ category }) {
  const listProducts = () => {
    const products = category.products;
    if (!products.length) {
      return "";
    }
    return products.map((product, index) => {
      return (
        <div key={index}>
          <ProductForm category={category} product={product}></ProductForm>
        </div>
      );
    });
  };
  const displaySelectedAll = () => {
    //TODO move to redux parentComponent
    return DisplayService.selectAllBtn("RecipePage").display ? (
      <SelectAllNone products={category.products}></SelectAllNone>
    ) : (
      ""
    );
  };
  return (
    <Collapse in={true} timeout="auto" unmountOnExit>
      {displaySelectedAll()}
      <List component="div" disablePadding>
        {listProducts()}
      </List>
    </Collapse>
  );
}
