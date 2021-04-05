import React from "react";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import DisplayService from "inventory/category/services/CategoryDisplayHelper";
import SelectAllNone from "components/SelectAllNone";
import ProductRow from "./ProductRow";
import { useSelector } from "react-redux";

export default function ProductList({ products = [] }) {
  const location = useSelector((state) => state.pageData.location);
  const listProducts = () => {
    return products.map((product, index) => {
      return (
        <div key={index}>
          <ProductRow product={product}></ProductRow>
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
