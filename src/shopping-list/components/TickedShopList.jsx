import React from "react";
import { useSelector } from "react-redux";
import { List, Divider, ListItem } from "@material-ui/core";
import { tickedTitle } from "styles/CommonStyles";
import { buildPickedList } from "shopping-list/ticked-shop-list";

export default function TickedShopList() {
  const { displayList } = useSelector((state) => state.listFilter);
  const pickedList = buildPickedList(displayList);
  return pickedList.length === 0 ? (
    ""
  ) : (
    <>
      <Divider></Divider>
      <div style={tickedTitle}>Ticked</div>
      <List>
        {pickedList.map((cat) => {
          return cat.products.map((prod) => (
            <ListItem key={prod.id}>{prod.name}</ListItem>
          ));
        })}
      </List>
    </>
  );
}
