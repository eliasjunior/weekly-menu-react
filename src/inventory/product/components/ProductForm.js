import React from "react";
import { useSelector } from "react-redux";
import { requiredParameter } from "common/Util";
import { ListItem } from "@material-ui/core";
import FormComponents from "./ComponentCatalog";

export default function ProductForm({
  product = requiredParameter("product"),
  onSelectedProd,
}) {
  const componentFormNames = useSelector((state) => state.componentFormNames);

  const formComponents = FormComponents({
    product,
    onSelectedProd,
  });

  const componentKeys = [...componentFormNames];

  const buildForm = () => {
    const result = [];

    while (componentKeys.length > 0) {
      const currentKey = componentKeys.shift();
      const component = formComponents(currentKey); // search in the catalog
      if (component) {
        result.push(component);
      }
    }
    return result;
  };
  return <ListItem>{buildForm()}</ListItem>;
}
