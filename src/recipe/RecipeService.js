import ApiService from '../../service/ApiService';

const RecipeService = {
    update(product) {
        return ApiService.put('recipe', product);
    },
    save(product) {
        return ApiService.post('recipe', product);
    },
    delete() {

    }
}

export default RecipeService;