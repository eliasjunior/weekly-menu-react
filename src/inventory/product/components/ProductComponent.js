import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ProductForm from "inventory/product/components/ProductForm";
import ItemSelection from "common/ItemSelection";
import DisplayService from "inventory/category/services/CategoryDisplayService";

function ProductComponent({
  product,
  parentComponent,
  category,
  onSelectedProd
}) {
  return (
    <ListItem>
      <ProductForm
        product={product}
        category={category}
        inset={true}
        parentComponent={parentComponent}
        onSelectedProd={onSelectedProd}
      ></ProductForm>
    </ListItem>
  );
}
export default ProductComponent;
