import React from "react";
import { LOCATION } from "common/AppConstant";
import { Link } from "react-router-dom";
import CommmonStyles from "../styles/CommonStyles";
import { withStyles, Fab } from "@material-ui/core";
import IncludeIcon from "@material-ui/icons/Receipt";
import SaveIcon from "@material-ui/icons/Save";
import Shop from "@material-ui/icons/ShoppingCart";

function ShoppingCreateActions({ classes }) {
  const { recipeList, pickProducts } = LOCATION;
  const combinedClasses = `${classes.floatingPadding} ${classes.floatingBtn} gridFloatingBtn`;
  const { path: linkRecipe } = recipeList;
  const { path: linkProds } = pickProducts;
  return (
    <div className={combinedClasses}>
      <Fab color="primary">
        <Link to={linkRecipe}>
          <IncludeIcon />
        </Link>
      </Fab>
      <Fab color="primary">
        <Link to={linkProds}>
          <Shop />
        </Link>
      </Fab>
      <Fab color="secondary" onClick={() => console.log("not yet")}>
        <SaveIcon />
      </Fab>
    </div>
  );
}

export default withStyles(CommmonStyles)(ShoppingCreateActions);
