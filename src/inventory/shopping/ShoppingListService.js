import ApiService from '../../service/ApiService';

const ShoppingListService = {
    update(shoppingList) {
        return ApiService.put('v2/shoppingList', shoppingList);
    },
    save(shoppingList) {
        return ApiService.post('v2/shoppingList', shoppingList);
    },
    get() {
        return ApiService.get('v2/shoppingList');
    },
    getOne(id) {
        return ApiService.get(`v2/shoppingList${id}`);
    },
    delete() {

    }
}
export default ShoppingListService;