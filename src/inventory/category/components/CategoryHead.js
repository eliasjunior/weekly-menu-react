import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { grey } from "@material-ui/core/colors";
import CategoryBtnActions from "./CategoryBtnActions";
import DisplayService from "../services/CategoryDisplayService";
import { useSelector } from "react-redux";

export default function CategoryHead(props) {
  const parentLocation = useSelector((state) => state.pageData.location);
  const categoryButtons = () => {
    return DisplayService.categoryBtns(parentLocation).display ? (
      <CategoryBtnActions
        name={props.category.name}
        id={props.category.id}
        category={props.category}
        onHandleMessage={props.onHandleMessage}
        onRefresh={props.onRefresh}
      ></CategoryBtnActions>
    ) : (
      ""
    );
  };
  const content = () => {
    if (DisplayService.categoryLineHide(props.parentComponent).display) {
      return "";
    }
    return (
      <ListItem style={{ backgroundColor: grey[200] }} key={props.category.id}>
        <ListItemText primary={props.category.name}></ListItemText>
        {categoryButtons()}
      </ListItem>
    );
  };
  return <div>{content()}</div>;
}
