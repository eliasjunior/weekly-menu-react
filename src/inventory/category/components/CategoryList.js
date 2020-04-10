import React from "react";
import CategoryItem from "./CategoryItem";
import List from "@material-ui/core/List";
import { useSelector } from "react-redux";

//TODO review props on pages that call CategoryList
export default function CategoryList() {
  const { displayList = [] } = useSelector((state) => state.listFilter);

  const buildList = () => {
    return displayList.map((category) => {
      return (
        <CategoryItem
          key={category.id}
          category={{ ...category }}
        ></CategoryItem>
      );
    });
  };
  return (
    <React.Fragment>
      <List>{buildList()}</List>
    </React.Fragment>
  );
}
