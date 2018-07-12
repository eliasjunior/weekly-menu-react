import ApiService from '../../service/ApiService';

const ProductService = {
    update(product) {
        const productRequest = {
            ingredient: product
        }
        return ApiService.put('ingredient', productRequest)
    },
    delete() {

    },
    save() {

    }
}

export default ProductService;