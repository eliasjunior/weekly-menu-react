import React from "react";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ProductComponent from "./ProductComponent";
import DisplayService from "../../category/services/CategoryDisplayService";
import SelectAllNone from "common/SelectAllNone";

export default function ProductList({
  category,
  parentComponent,
  onSelectedProd,
  onSelectAllNoneProd,
  categorySelect
}) {
  const listProducts = () => {
    const products = category.products;
    if (!products.length) {
      return "";
    }
    const productListView = (product, index) => {
      return (
        <div key={index}>
          <ProductComponent
            category={category}
            product={product}
            parentComponent={parentComponent}
            onSelectedProd={onSelectedProd}
          ></ProductComponent>
        </div>
      );
    };
    return products.map(productListView);
  };
  const displaySelectedAll = () => {
    return DisplayService.selectAllBtn(parentComponent).display ? (
      <SelectAllNone
        checked={categorySelect}
        onSelectAllNone={onSelectAllNoneProd}
      ></SelectAllNone>
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
