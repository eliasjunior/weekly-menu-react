import { ShoppingListUtilService } from './ShoppingListUtilService';
import mockData from '../../tests/shopping.list';

describe("ShoppingListUtilService", () => {
    it('should add attrs to product', () => {
        const attrs = mockData.caseAttr;
        const expected = attrs.expected;

        const recipesChanged = ShoppingListUtilService
            .addRecInfoToProduct(attrs.recipes);

        expect(recipesChanged).toEqual(expected);

    });
    it('should merge recipe and categories case 1', () => {
        const case1 = mockData.case1;
        const shoppinpListData = case1.shoppinpListData;
        const expected = case1.expected;
        const categories = shoppinpListData.categories;

        const recipes = ShoppingListUtilService
            .addRecInfoToProduct(shoppinpListData.recipes);
       
        const mergeCategories = ShoppingListUtilService
            .mergeCategories(recipes, categories);

        expect(mergeCategories).toEqual(expected);
    });
    it('should merge recipe and categories case 2', () => {
        const case2 = mockData.case2;
        const shoppinpListData = case2.shoppinpListData;
        const expected = case2.expected;

        const recipes = ShoppingListUtilService
            .addRecInfoToProduct(shoppinpListData.recipes);
        const categories = shoppinpListData.categories;

        const mergeCategories = ShoppingListUtilService
            .mergeCategories(recipes, categories);

        expect(mergeCategories).toEqual(expected);
    });
    it('should merge recipe and categories case 3', () => {
        const case3 = mockData.case3;
        const shoppinpListData = case3.shoppinpListData;
        const expected = case3.expected;

        const recipes = ShoppingListUtilService
            .addRecInfoToProduct(shoppinpListData.recipes);

        const categories = shoppinpListData.categories;

        const mergeCategories = ShoppingListUtilService
            .mergeCategories(recipes, categories);

        expect(mergeCategories).toEqual(expected);
    });
    it('should merge recipe and categories case 4', () => {
        const case4 = mockData.case4;
        const shoppinpListData = case4.shoppinpListData;
        const expected = case4.expected;

        const recipes = ShoppingListUtilService
            .addRecInfoToProduct(shoppinpListData.recipes);
            
        const categories = shoppinpListData.categories;

        const mergeCategories = ShoppingListUtilService
            .mergeCategories(recipes, categories);

        expect(mergeCategories).toEqual(expected);
    });
    
    it('should merge, not repeat category case 5', () => {
        const case5 = mockData.case5;
        const shoppinpListData = case5.shoppinpListData;
        const expected = case5.expected;

        const recipes = ShoppingListUtilService
        .addRecInfoToProduct(shoppinpListData.recipes);

        const categories = shoppinpListData.categories;

        const mergeCategories = ShoppingListUtilService
        .mergeCategories(recipes, categories);

        expect(mergeCategories).toEqual(expected);
    });
});