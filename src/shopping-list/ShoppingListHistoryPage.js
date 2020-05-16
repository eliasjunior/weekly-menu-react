import React from "react";
import {
  List,
  ListItem,
  Button,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { LOCATION, parentComponent } from "common/AppConstant";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPageLocation, setPageTitle } from "app-redux/actions/PageAction";
import { editShoppingListAction } from "app-redux/actions/ShoppingListAction";

function ShoppingListHistoryPage() {
  const dispatch = useDispatch();
  const shoppingHistory = useSelector((state) => state.shoppingHistory);
  const productMap = useSelector((state) => state.products);

  dispatch(setPageLocation(parentComponent.SHOPPING_LIST_PAGE));
  dispatch(setPageTitle("Shopping history"));
  console.log(">>", shoppingHistory);

  return (
    <List>
      {shoppingHistory.map((item) => {
        return (
          <ListItem key={item.id}>
            <Button color="primary" variant="outlined">
              <Link to={`${LOCATION.shopping.path}/${item.id}`}>
                {item.name}
              </Link>
            </Button>
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
