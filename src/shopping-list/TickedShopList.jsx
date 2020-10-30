import React from "react";
import { useSelector } from "react-redux";
import { ListItem } from "@material-ui/core";
import { List, Divider } from "@material-ui/core";
import { tickedTitle } from "styles/CommonStyles2";
import { buildPickedList } from "./ticked-shop-list";

export default function TickedShopList() {
  const { displayList } = useSelector((state) => state.listFilter);
  const pickedList = buildPickedList(displayList);
  return pickedList.length === 0 ? (
    ""
  ) : (
    <>
      <Divider></Divider>
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
