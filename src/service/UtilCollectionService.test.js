import UtilCollectionService from "./UtilCollectionService";

describe('Need to add test, item/removed deleted, Recipe collection test', () => {
    it('should add product', () => {
        const selectedItem =
        {
            product: {
                name: 'Orange Juice',
                _id: '3',
            },
            category: {
                name: 'Drinks',
                _id: '1'
            }
        };
        const categories = [
            {
                name: 'Drinks',
                _id: '1',
                products: [
                    { name: 'Water', _id: '2' }
                ]
            }
        ];

        const expected = [
            {
                name: 'Drinks',
                _id: '1',
                products: [
                    { name: 'Water', _id: '2' },
                    { name: 'Orange Juice', _id: '3' }
                ]
            }
        ];

    });

    it('should add one item to an empty [] ', () => {
        const selectedItem =
        {
            product: {
                name: 'Orange Juice',
                _id: '3',
            },
            category: {
                name: 'Drinks',
                _id: '1'
            }
        };
        const expected = [
            {
                name: 'Drinks',
                _id: '1',
                products: [
                    { name: 'Orange Juice', _id: '3' }
                ]
            }
        ];
    });

    it('should remove item from the list ', () => {
        const selectedItem =
        {
            product: { name: 'Water', _id: '2' },
            category: {
                name: 'Drinks',
                _id: '1'
            }
        };
        const list = [
            {
                name: 'Drinks',
                _id: '1',
                products: [
                    { name: 'Water', _id: '2' },
                    { name: 'Orange Juice', _id: '3' }
                ]
            }
        ];
        const expected = [
            {
                name: 'Drinks',
                _id: '1',
                products: [
                    { name: 'Orange Juice', _id: '3' }
                ]
            }
        ];
        
    });
    it('should remove cagegory from the list ', () => {
        const selectedItem =
        {
            product: { name: 'Water', _id: '2' },
            category: {
                name: 'Drinks',
                _id: '1'
            }
        };
        const list = [
            {
                name: 'Drinks',
                _id: '1',
                products: [
                    { name: 'Water', _id: '2' },
                ]
            }
        ];
    });
});
