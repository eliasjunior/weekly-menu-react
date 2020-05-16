import React, { useEffect } from "react";
import AppWeekBar from "header/AppWeekBar";
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import teal from "@material-ui/core/colors/orange";
import { MuiThemeProvider } from "@material-ui/core";
import AlertMessage from "components/AlertMessage";
import Loading from "components/Loading";
import WeeklyRouters from "./WeeklyRouters";
import { useDispatch } from "react-redux";
import { fetchCategoryAsync } from "app-redux/actions/InventoryActions";
import { fetchRecipesAsync } from "app-redux/actions/RecipesActions";
import { fetchProductsAsync } from "app-redux/actions/ProductAction";
import { fetchShoppingHistoryAsync } from "app-redux/actions/ShoppingHistoryAction";

function Weekly() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function asyncFetch() {
      dispatch(fetchCategoryAsync());
      dispatch(fetchRecipesAsync());
      dispatch(fetchProductsAsync());
      dispatch(fetchShoppingHistoryAsync());
    }
    asyncFetch();
  }, []);
  return (
    <MuiThemeProvider theme={theme}>
      <AlertMessage></AlertMessage>
      <Loading></Loading>
      <AppWeekBar></AppWeekBar>
      <WeeklyRouters></WeeklyRouters>
    </MuiThemeProvider>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: teal,
  },
  typography: {
    useNextVariants: true,
  },
});

export default Weekly;
