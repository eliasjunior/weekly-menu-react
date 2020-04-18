import React from "react";
import { List, ListItem, Button } from "@material-ui/core";
import { LOCATION } from "common/AppConstant";
import { Link } from "react-router-dom";
import AppWeekBar from "header/AppWeekBar";

function Dashboard() {
  return <List>{getItems()}</List>;
}
function getItems() {
  return Object.entries(LOCATION)
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
