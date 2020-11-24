import React from "react";
import {
  List,
  ListItem,
  Button,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { LOCATION, parentComponent } from "common/AppConstant";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPageLocation, setPageTitle } from "app-redux/actions/PageAction";
import { editShoppingListAction } from "app-redux/actions/ShoppingListAction";
import { compareObject } from "common/Util";

function ShoppingListHistoryPage() {
  const dispatch = useDispatch();
  const shoppingHistory = useSelector((state) => state.shoppingHistory).sort(
    compareObject
  );
  const productMap = useSelector((state) => state.products);

  dispatch(setPageLocation(parentComponent.SHOPPING_LIST_PAGE));
  dispatch(setPageTitle("Shopping history"));

  const getProductsCount = (id) => {
    const count = shoppingHistory
      .filter((shop) => shop.id === id)
      .reduce((prev, shop) => {
        prev = prev + shop.products.length;
        return prev;
      }, 0);

    return `${count} products`;
  };

  return (
    <List>
      {shoppingHistory.map((item) => {
        return (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={getProductsCount(item.id)}
            ></ListItemText>
            <ListItemSecondaryAction>
              <Button color="secondary" variant="outlined">
                <Link
                  to={`${LOCATION.editShoppingList.path}/${item.id}`}
                  onClick={() => {
                    dispatch(editShoppingListAction(item, productMap));
                  }}
                >
                  EDIT
                </Link>
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

export default ShoppingListHistoryPage;
