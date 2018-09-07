import ApiService from '../../service/ApiService';

const CategoryService = {
    update(category) {
        return ApiService.put('v2/category', category);
    },
    save(category) {
        return ApiService.post('v2/category', category);
    },
    get() {
        return ApiService.get('v2/category');
    },
    getOne(id) {
        return ApiService.get(`v2/category${id}`);
    },
    delete() {

    }
}
export default CategoryService;