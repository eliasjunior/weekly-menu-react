## Requirements
  Easy accesss to product list to creation of products CRUD
  Product list should not be linked with Recipe (need api analysis)   
  Recipes CRUD, what's Recipe? a product ? need to review the (design)


## Tasks, for priority sequence

- New Shopping list
    1 - just select and create list based on the products
    2 - add recipe, ignore repeated

   description what need to work 
   * Type list ? cannot be a category type
      repeated products after add recipes
   * create action
      - get category and products ids to send
      - add recipe to the list
         - highlight recipe products
         * When the product is repeat ? 
         - remove products that does not need it


- Product list
     - update
       > call Rest api(NEED to fix and refactor it the API)
       > change update icon to save when the input is updatable
     - add(only name)
        > send category id
        > message success 
        > add back button
        > message fail 
    - Service 
        > filter only the data, service and component does not need to know the headers   

## DONE Cru not delete
- Category Crud
- New Shopping list
- Product Crud
- Recipe
 * List
 * update, name and prods

- Sub Documents Cat/Product List
  Update, trigger

### Backlog
  - Define Props component Very important 
  - Message Service
        * fade message , add transition  
  - Need to add test to it, but after a few more complexity
  - User account
  - Recipes recomendation based on products left
  - styles/colors, need a upgrade primary/secondary colors
  - delete Product(later)
  - add form validation Product
 