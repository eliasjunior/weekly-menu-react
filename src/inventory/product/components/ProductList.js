import React from "react";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import DisplayService from "inventory/category/services/CategoryDisplayService";
import SelectAllNone from "components/SelectAllNone";
import ProductForm from "./ProductForm";
import { useSelector } from "react-redux";

export default function ProductList({ products = [] }) {
  const location = useSelector((state) => state.pageData.location);
  const listProducts = () => {
    if (!products.length) {
      return "";
    }
    return products.map((product, index) => {
      return (
        <div key={index}>
          <ProductForm product={product}></ProductForm>
        </div>
      );
    });
  };
  const displaySelectedAll = () => {
    //TODO move to redux parentComponent
    return DisplayService.selectAllBtn(location).display ? (
      <SelectAllNone products={products}></SelectAllNone>
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