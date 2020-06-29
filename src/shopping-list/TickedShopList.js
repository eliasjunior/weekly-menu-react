import React from "react";
import { List, ListItem } from "@material-ui/core";
import { useSelector } from "react-redux";
import cloneDeep from "lodash.clonedeep";
import { tickedTitle } from "styles/CommonStyles2";

export default function TickedShopList() {
  const { displayList } = useSelector((state) => state.listFilter);

  const pickedList = cloneDeep(displayList).filter((cat) => {
    const pickedProds = cat.products.filter((prod) => prod.picked);
    cat.products = pickedProds;
    return cat.products.length > 0;
  });
  if (pickedList.length === 0) {
    return "";
  }
  return (
    <>
      <div style={tickedTitle}>Ticked</div>
      <List></List>
      {pickedList.map((cat) => {
        return cat.products.map((prod) => (
          <ListItem key={prod.id}>{prod.name}</ListItem>
        ));
      })}
    </>
  );
}
