import React, { useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import teal from "@material-ui/core/colors/orange";
import { MuiThemeProvider } from "@material-ui/core";
import ErrorHandlerMessage from "components/ErrorHandlerMessage";
import AlertMessage from "components/AlertMessage";
import Loading from "components/Loading";
import WeeklyRouters from "./WeeklyRouters";
import { useDispatch } from "react-redux";
import { fetchCategoryAsync } from "app-redux/actions/InventoryActions";

function Weekly() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function asyncFetch() {
      dispatch(fetchCategoryAsync());
    }
    asyncFetch();
  }, []);
  return (
    <MuiThemeProvider theme={theme}>
      <ErrorHandlerMessage></ErrorHandlerMessage>
      <AlertMessage></AlertMessage>
      <Loading></Loading>
      <WeeklyRouters></WeeklyRouters>
    </MuiThemeProvider>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: teal
  }
});

export default Weekly;
