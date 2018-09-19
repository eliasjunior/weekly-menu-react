## Tasks, for priority sequence


- Add select all to new shopping list
- sort products list, prod of recipe list
- Polish
- add test
- Review deep copy components

## DONE Cru not delete
- bug add/unadd selecte all
- review child changing state, should not change
- Shopping page load by id (back end too)
- fix bug repeated categories
- Category Crud
- New Shopping list
- Product Crud
- Recipe
 * List
 * update, name and prods
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
- New Shopping list
    1 - just select and create list based on the products
    2 - add recipe, ignore repeated        
- shopping list view and shopping list history

- Sub Documents Cat/Product List
  Update, trigger

### Backlog
  - Update Shopping list
  
  - Edit/update shopping list, leave for later
  - Define Props component Very important 
  - Message Service
        * fade message , add transition  
  - Need to add test to it, but after a few more complexity
  - User account
  - Recipes recomendation based on products left
  - styles/colors, need a upgrade primary/secondary colors
  - delete Product(later)
  - add form validation Product
  - form validation data
            TODO handle form server errors
                {  
                "message":"Internal server error",
                "name":"ValidationError",
                "errors":{  
                    "name":{  
                        "message":"Path `name` is required.",
                        "name":"ValidatorError",
                        "properties":{  
                            "type":"required",
                            "message":"Path `{PATH}` is required.",
                            "path":"name",
                            "value":""
                        },
                        "kind":"required",
                        "path":"name",
                        "value":""
                    }
                }
                }
            
 
 ## Requirements
  Easy accesss to product list to creation of products CRUD
  Product list should not be linked with Recipe (need api analysis)   
  Recipes CRUD, what's Recipe? a product ? need to review the (design)