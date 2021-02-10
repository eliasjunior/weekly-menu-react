export const LOCATION = {
  dashboard: { path: "/", label: "Dashboard", menu: false },
  products: {
    path: "/products",
    label: "Products",
    menu: true,
    img: "/recipe/burgers.jpg",
  },
  newShoppingList: {
    path: "/newshopping",
    label: "New Shopping List",
    menu: true,
    img: "/recipe/shopping-foto2.jpg",
  },
  editShoppingList: { path: "/editshopping", label: "", menu: false },
  shoppingHistory: {
    path: "/shoppinghistory",
    label: "Shopping history",
    menu: true,
    img: "/recipe/checklist.jpg",
  },
  recipeList: {
    path: "/recipe",
    label: "Recipe List",
    menu: true,
    img: "/recipe/recipe-list.jpg",
  },
  newRecipe: {
    path: "/recipeCreate/new",
    label: "New Recipe",
    menu: true,
    img: "/recipe/new-recipe.jpg",
  },
  pickProducts: { path: "/pick-products", label: "Pick", menu: false },
  leftOver: {
    path: "/leftOver",
    label: "Left Over",
    menu: true,
    img: "/recipe/left-over.jpg",
  },
};

export const parentComponent = {
  RECIPE_PAGE: "RecipePage",
  RECIPE_LIST_PAGE: "RecipeListPage",
  SHOPPING_LIST_PAGE: "ShoppingListPage",
  INVENTORY_PAGE: "InventoryPage",
  PICKED_UP_PRODUCTS: "Pick",
};
