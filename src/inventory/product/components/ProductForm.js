import React from "react";
import { useSelector } from "react-redux";
import { requiredParameter } from "common/Util";
import { ListItem } from "@material-ui/core";
import FormComponents from "./ComponentCatelog";

export default function ProductForm({
  product = requiredParameter("product"),
  category = requiredParameter("category"),
  onSelectedProd
}) {
  const { formProduct = requiredParameter("formProduct") } = useSelector(
    state => state
  );

  const formComponents = FormComponents({
    product,
    category,
    onSelectedProd
  });

  const componentKeys = [...formProduct];

  const buildForm = () => {
    const result = [];

    while (componentKeys.length) {
      const currentKey = componentKeys.shift(); // always remove
      const component = formComponents(currentKey); // search in the catalog
      if (component) {
        result.push(component);
      }
    }
    return result;
  };
  return (
    <ListItem>
      <form>{buildForm()}</form>
    </ListItem>
  );
}
