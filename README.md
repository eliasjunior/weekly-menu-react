# TODO

## 2020 Fenix Program

### Sprint 07/04 - 14/04
0 - Product CRUD (2)
  Create TempAPI 
  Save, update delete, remove from cat 
1 - Select Recipe   (1)
2- shoppings refactoring (3)
   


### Sprint 31/03 - 07/04

0 - FIX display list --> DONE
1 - Update Recipe List - (3) - DONE
2 - Search name - (1) DONE
    On the top page (Inventory, Recipe)
   dispatch(listFilterAction("", recipes));
   I need a action and reducer to CREATE_DISPLAY_LIST, that copies from the DB   
3 - **SPIKE** convert the data to DB format, see https://github.com/eliasjunior/normalize/blob/master/normalization/normalization-instructions.txt (TIME-BOXED 1)



## Mock server

Start JSON server

```bash
json-server --watch db.json
```

Change port and change id defaul

```bash
json-server --watch db.json --port 3004 -i _id
```

[json server](https://www.npmjs.com/package/json-server)

## Tasks, for priority sequence

Bug include recipe in shop list, create a new SL and then try edit add another rec
maybe change the behaviour, instead save in memory always save
Fix duplicate prod name rec list(API)
Bug Duplicate prod in shopping list, should not check dupl in the SL
typing name too slow
Save by action rec list and shop list/ after update or create loses the checkbox
save prod when is creating shop list and copy the state / also for new recipe
Display prod total selected on
Fix data
bug recipes include, add recipes then save, add another one, not updating
History date shop list
Loading after action
RecipePage need to able to filter prod selected
Menu Item does not work properly,
click outside is not working
Add btn rec list when come from SL, one way flow, in case need to create a new rec list

Bug category name, if try same name

- Polish
- add test
- Review deep copy components

## DONE

- WRITE test for item selection and parent component, need to be consistend
- Search by name
- Bug select persist, add test for it
- Bug select all
- Add btn recipe list need to also go to new recipe
- add test recipe check
- Post should close or redirect to edit, new recipe
- Add qtd to shopping list
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
- Add select all to new shopping list
- sort products list, prod of recipe list

- Sub Documents Cat/Product List
  Update, trigger

### Backlog

- Update Shopping list

- Edit/update shopping list, leave for later
- Define Props component Very important
- Message Service \* fade message , add transition
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
