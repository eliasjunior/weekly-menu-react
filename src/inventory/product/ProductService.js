import ApiService from '../../service/ApiService';

const ProductService = {
    update(product) {
        return ApiService.put('product', product);
    },
    save(product) {
        return ApiService.post('product', product);
    },
    delete() {

    }
}

export default ProductService;