import React from "react";
import { List, ListItem, Button } from "@material-ui/core";
import { AppConstant } from "../common/AppConstant";
import { Link } from "react-router-dom";
import { AppWeekBar } from "../header/AppWeekBar";

function Dashboard() {
  return (
    <div>
      <AppWeekBar title="Dashboard"></AppWeekBar>
      <List>{getItems()}</List>
    </div>
  );
}
function getItems() {
  return Object.entries(AppConstant.LOCATION)
    .filter(([key, location]) => location.menu)
    .map(([key, location]) => {
      return (
        <ListItem key={key}>
          <Button color="primary" variant="outlined">
            <Link to={location.path}>{location.label}</Link>
          </Button>
        </ListItem>
      );
    });
}

export default Dashboard;
