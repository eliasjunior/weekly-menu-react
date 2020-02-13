const recipesTestCase = {
    case1 : {
        'recPrevId' : 'rec_1',
        'recipes' :  [
            {
                name: 'rec1',
                _id: 'rec_1',
                categories: ['not testing the content of this array']
            },
            {
                name: 'rec2',
                _id: 'rec_2',
            }
        ] 
    },
    case2: {
        'recPrevId' : 'rec_2',
        'recipes' :  [
            {
                name: 'rec1',
                _id: 'rec_1',
                categories: [{}, {}, {}]
            },
            {
                name: 'rec2',
                _id: 'rec_2',
                categories: [{}, {}]
            }
        ] 
    }
}
export default recipesTestCase;