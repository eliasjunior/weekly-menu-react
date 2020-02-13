import ApiService from '../../service/ApiService';

const ProductService = {
    update(product) {
        return ApiService.put('v2/product', product);
    },
    save(product) {
        return ApiService.post('v2/product', product);
    },
    delete() {

    }
}

export default ProductService;