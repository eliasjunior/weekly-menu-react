/**
 * Created by eliasmj on 24/01/2017.
 */
import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import MenuIconComponent from "./MenuIconComponent";
import { Toolbar, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export const AppWeekBar = () => {
  const page = useSelector((state) => state.pageData);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <MenuIconComponent></MenuIconComponent>
          <Typography variant="h6" color="inherit">
            {page.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

AppWeekBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppWeekBar;
