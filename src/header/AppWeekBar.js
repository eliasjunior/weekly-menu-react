/**
 * Created by eliasmj on 24/01/2017.
 */
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import MenuIconComponent from "./MenuIconComponent";
import { Toolbar, Typography, withStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBack";
import CommmonStyles from "styles/CommonStyles";

//TODO previousPage, maybe pass by URL ?param because it's quite simple and it's sibling of the parent page
function AppWeekBar({ previousPage, history, classes }) {
  const page = useSelector((state) => state.pageData);
  const displayBackBtn = () => {
    return history ? (
      <ArrowBack onClick={() => history.goBack()}></ArrowBack>
    ) : (
      ""
    );
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <MenuIconComponent></MenuIconComponent>
          <Typography variant="h6" color="inherit">
            {page.title}
          </Typography>
          {/* {displayBackBtn()} */}
          {/* <ArrowBack onClick={() => history.goBack()}></ArrowBack> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(CommmonStyles)(AppWeekBar);
