export const AppConstant =  {
    PATH: {
        RECIPE_LIST : '/recipe',
        NEW_RECIPE: '/recipeCreate/new',
        SHOPPING: '/shopping', 
        CATEGORY: '/category',
        PRODUCTS: '/product',
        DEFAULT_ROUTE: '/'
    },
    LABEL: {
        SHOPPING: 'New Shopping List',
        NEW_RECIPE: 'New Recipe',
        HOME: 'Products',
        RECIPE_LIST: 'Recipe List'
    },
    // TODO
    ROUTE: {
        RECIPE_LIST: {PATH: '/recipe', LABEL: 'Recipe List'},
        RECIPE: {PATH: '/recipeCreate', LABEL: 'New Recipe'}
    },
    PARENT_COMPONENT: {
        RECIPE_PAGE: 'RecipePage',
        RECIPE_LIST_PAGE: 'RecipeListPage',
        SHOPPING_LIST_PAGE: 'ShoppingListPage',
        INVENTORY_PAGE: 'InventoryPage'
    }
}