import Button from "@material-ui/core/Button";
import React from "react";
import { AppConstant } from "../common/AppConstant";
import { Link } from "react-router-dom";
import CommmonStyles from "../styles/CommonStyles";
import { withStyles } from "@material-ui/core";
import IncludeIcon from "@material-ui/icons/Receipt";
import SaveIcon from "@material-ui/icons/Save";

function ShoppingCreateActions(props) {
  const { classes } = props;
  const combinedClasses = `${classes.floatingPadding} ${classes.floatingBtn} gridFloatingBtn`;

  return (
    <div className={combinedClasses}>
      <Button color="primary" variant="fab">
        <Link to={`${AppConstant.LOCATION.recipeList.path}?include=true`}>
          <IncludeIcon />
        </Link>
      </Button>
      <Button
        color="secondary"
        variant="fab"
        onClick={() => props.onSaveShoppingList()}
      >
        <SaveIcon />
      </Button>
    </div>
  );
}

export default withStyles(CommmonStyles)(ShoppingCreateActions);
