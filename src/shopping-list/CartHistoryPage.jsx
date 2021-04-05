import React, { useEffect } from "react";
import {
  List,
  ListItem,
  Button,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { LOCATION, parentComponent } from "common/AppConstant";
import { useSelector, useDispatch } from "react-redux";
import { setPageLocation, setPageTitle } from "app-redux/actions/PageAction";
import { editCartAction } from "app-redux/actions/CartAction";
import { compareDates } from "common/Util";
import Presentation from "./Presentation";
import CartCreateBtn from "./CartCreateBtn";
import { fetchShoppingHistoryAsync } from "app-redux/actions/ShoppingHistoryAction";

export default function CartHistoryPage({ history }) {
  const dispatch = useDispatch();
  const shoppingHistory = useSelector((state) => state.shoppingHistory).sort(
    compareDates
  );
  useEffect(() => {
    async function asyncFetch() {
      dispatch(fetchShoppingHistoryAsync());
    }
    asyncFetch();
  }, [shoppingHistory.length]);

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

  const getCardDisplay = () =>
    shoppingHistory.length !== 0 ? (
      shoppingHistory.map((item) => {
        return (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={getProductsCount(item.id)}
            ></ListItemText>
            <ListItemSecondaryAction>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  history.push(`${LOCATION.editShoppingList.path}/${item.id}`);
                  dispatch(editCartAction(item, productMap));
                }}
              >
                EDIT
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })
    ) : (
      <Presentation
        imgDisplay={"/cart-history.jpg"}
        mainText={"Shopping history"}
      >
        <CartCreateBtn></CartCreateBtn>
      </Presentation>
    );

  return <List>{getCardDisplay()}</List>;
}
