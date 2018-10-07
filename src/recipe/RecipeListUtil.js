const RecipeListUtil = {
    getCatsFromProps(recipes,  recPrevId) {
        const currentRec = recipes
            .filter(rec => rec._id === recPrevId)
            .pop();
        if(!currentRec) {
            console.error('componentDidUpdate props is ansync with prevProps')
            return
        }
        return currentRec.categories
    }
}

export default RecipeListUtil
