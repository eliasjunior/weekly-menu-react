import ApiService from '../service/ApiService';

const CategoryService = {
    update(category) {
        return ApiService.put('v2/category', category);
    },
    save(category) {
        return ApiService.post('v2/category', category);
    },
    delete() {

    }
}

export default CategoryService;