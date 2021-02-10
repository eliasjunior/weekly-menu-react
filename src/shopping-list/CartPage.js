import React from "react";
import CloneDeep from "lodash.clonedeep";
import ShoppingCreateBtns from "./ShoppingCreateBtns";
import CommonErrorBoundary from "../error-handlers/CommonErrorBoundary";
import {useDispatch, useSelector} from "react-redux";
import {setPageLocation, setPageTitle} from "app-redux/actions/PageAction";
import {setDisplayList} from "app-redux/actions/ListFilterAction";
import CategoryList from "inventory/category/components";
import TickedShopList from "./TickedShopList";

import TopBtns from "./TopBtns";
import {buildCartFromIds, mergeRecipeProducts,} from "shopping-list/helpers/ShoppingHelper";
import {categoriesSelector, productMapSelector, quantitiesSelector,} from "app-redux/selectors/ShoppingSelector";
import {formShoppingAction} from "app-redux/actions/ProductFormAction";
import {normalizeCategory} from "inventory/helpers/InventoryHelper";
import {parentComponent} from "common/AppConstant";
import Presentation from "./Presentation";

const CART_TEXT = " You can add an entire recipe products to the shopping list or simply" +
    "\nadd multiple products"
export default function CartPage() {
    const dispatch = useDispatch();

    const quantities = useSelector(quantitiesSelector);
    const productMap = CloneDeep(useSelector(productMapSelector));
    const categories = CloneDeep(useSelector(categoriesSelector));
    const recipeMap = useSelector((state) => state.recipes);
    const cart = useSelector((state) => state.cart);
    const title = cart.name
        ? cart.name
        : "New Shopping list";

    const tempCart = buildCartFromIds({
        quantities,
        productMap: CloneDeep(productMap),
        categoryMap: CloneDeep(normalizeCategory(categories)),
        shoppingListMap: cart,
    });

    const listDisplay = mergeRecipeProducts(recipeMap, tempCart);

    dispatch(setDisplayList(listDisplay));
    dispatch(setPageLocation(parentComponent.SHOPPING_LIST_PAGE));
    dispatch(formShoppingAction());
    dispatch(setPageTitle(title));

    const getCardDisplay = () => listDisplay.length !== 0 ? "" :
        <Presentation imgDisplay={"/recipe/checklist.jpg"} mainText={CART_TEXT}
                      title="New Shopping List">
            <ShoppingCreateBtns></ShoppingCreateBtns>
        </Presentation>;

    return (
        <CommonErrorBoundary>
            {getCardDisplay()}
            <TopBtns list={listDisplay} pageHeader={title}></TopBtns>
            <ShoppingCreateBtns></ShoppingCreateBtns>
            <CategoryList></CategoryList>
            <TickedShopList></TickedShopList>
        </CommonErrorBoundary>
    );
}
