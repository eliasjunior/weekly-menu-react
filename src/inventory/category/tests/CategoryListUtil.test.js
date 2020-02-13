import CategoryFakeData from './categories'
import CategoryListUtil from '../CategoryListUtil'

describe('CategoryListUtil', () => {
    it('should change the list, simple list', () => {
        const {
            categoriesPrev,
            categories
        } = CategoryFakeData.case1
        expect(CategoryListUtil
            .isListChanged(categoriesPrev, categories, 'checked')).toBe(true);
    })
    it('should change the list(multiple items) ', () => {
        const {
            categoriesPrev,
            categories
        } = CategoryFakeData.case2
        expect(CategoryListUtil
            .isListChanged(categoriesPrev, categories, 'checked')).toBe(true);
    })
    it('should not change the list', () => {
        const {
            categoriesPrev,
            categories
        } = CategoryFakeData.case3
        expect(CategoryListUtil
            .isListChanged(categoriesPrev, categories, 'checked')).toBe(false);
    })
})