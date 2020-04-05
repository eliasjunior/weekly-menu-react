import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { AppConstant } from "../common/AppConstant";
import { Menu } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { recipeUpdateCurrent } from "app-redux/actions/RecipeAction";

function MenuIconComponent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const displayMenuOption = event => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    console.log("Close menu");
    setAnchorEl(null);
  };

  const handleMenuClick = menuItem => {
    if (menuItem === AppConstant.LOCATION.newRecipe.label) {
      dispatch(recipeUpdateCurrent());
    }
  };
  const getItemsForSideMenu = () => {
    return Object.entries(AppConstant.LOCATION)
      .filter(([_, location]) => location.menu)
      .map(([key, location]) => {
        return (
          <MenuItem key={key} onClick={closeMenu}>
            <Link
              to={location.path}
              onClick={() => handleMenuClick(location.label)}
            >
              {location.label}
            </Link>
          </MenuItem>
        );
      });
  };

  return (
    <div>
      <IconButton
        aria-owns={anchorEl ? "menu-appbar" : null}
        onClick={displayMenuOption}
        aria-label="Menu"
        aria-haspopup="true"
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        onClose={() => console.log("was doing nothing before")}
      >
        {getItemsForSideMenu()}
      </Menu>
    </div>
  );
}

export default MenuIconComponent;
