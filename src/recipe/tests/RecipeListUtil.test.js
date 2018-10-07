import RecipeListUtil from '../RecipeListUtil'
import RecipesFakeData from './recipes'

describe('RecipeListUtil', () => {
    it('should get categories in recipe', () => {
        const {
            recPrevId,
            recipes
        } = RecipesFakeData.case1

        const expected = recipes[0].categories;
        expect(RecipeListUtil
            .getCatsFromProps(recipes, recPrevId)).toEqual(expected);
    })
    it('should get categories in recipe case 2', () => {
        const {
            recPrevId,
            recipes
        } = RecipesFakeData.case2

        const expected = recipes[1].categories;
        expect(RecipeListUtil
            .getCatsFromProps(recipes, recPrevId)).toEqual(expected);
    })
})