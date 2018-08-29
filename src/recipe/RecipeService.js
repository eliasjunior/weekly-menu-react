import ApiService from '../service/ApiService';

const RecipeService = {
    update(product) {
        return ApiService.put('v2/recipe', product);
    },
    save(product) {
        return ApiService.post('v2/recipe', product);
    },
    get(){
        return ApiService.get('v2/recipe');
    },
    delete() {

    }
}

export default RecipeService;