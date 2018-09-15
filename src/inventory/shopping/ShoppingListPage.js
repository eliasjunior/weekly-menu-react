import React from 'react';
import { AppWeekBar } from '../../common/AppWeekBar';
import { ShoppingCreateActions } from './ShoppingCreateActions';
import CategoryService from '../category/CategoryService';
import UtilCollectionService from '../../service/UtilCollectionService';
import ErrorBoundary from '../../ErrorBoundaryComponent';
import { ShoppingListUtilService } from './ShoppingListUtilService';
import CloneDeep from 'lodash.clonedeep';
import ShoppingListService from './ShoppingListService';
import { RecipeBox } from './RecipesBox';
import { ProductBox } from './ProductBox';


class ShoppingListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedProducts: [],
            recipesToInclude: CloneDeep(props.recipesToInclude),
            title: props.shoppingList ? 'Update Shopping list' : 'New Shopping list'
        }
        this.selectedProd = this.selectedProd.bind(this);
        this.selectedProdRecipe = this.selectedProdRecipe.bind(this);
        this.createShoppingList = this.createShoppingList.bind(this);
        this.updateShoppingList = this.updateShoppingList.bind(this);
    }
    componentDidMount() {
        //this is the created list -> category/week/shopping 
        CategoryService
            .get()
            .then(categories => {
                if (this.props.shoppingList) {
                    updateShoppingList.call(this, CloneDeep(this.props.shoppingList), categories)
                } else {
                    this.setState(() => ({ categories }))
                }
            })
            .catch(reason => {
                this.props.onHandleMessage({ message: reason.message })
            });
    }
    createShoppingList() {
        const shoppintList =
            buildObjectToSend(this.state.selectedProducts, this.state.recipesToInclude);

        ShoppingListService
            .save(shoppintList)
            .then(() => {
                this.props.onHandleMessage({ message: 'Uhhuu Shopping list saved', type: 'success' })
            })
            .catch(reason => this.props.onHandleMessage({ message: reason.message }));

    }
    updateShoppingList() {
        const shoppintList =
            buildObjectToSend(this.state.selectedProducts,
                this.state.recipesToInclude, this.props.match.params.id);

        ShoppingListService
            .update(shoppintList)
            .then(() => {
                this.props.onHandleMessage({ message: 'Uhhuu Shopping list updated', type: 'success' })
            })
            .catch(reason => this.props.onHandleMessage({ message: reason.message }));
    }
    selectedProd(selected) {
        let selectedProducts = [...this.state.selectedProducts];
        const category = selected.category;
        const product = selected.product;

        if (selected.checked) {
            selectedProducts = UtilCollectionService.addItem({ category, product }, selectedProducts);
        } else {
            selectedProducts = UtilCollectionService.removeItem({ category, product }, selectedProducts);
        }
        this.setState(prevState => factoryMode(prevState, { selectedProducts }));
    }
    selectedProdRecipe(selected) {
        const recipesToInclude = ShoppingListUtilService
            .updateRecipesSelection(this.state.recipesToInclude, selected)

        this.setState({ recipesToInclude })
    }

    render() {
        return (
            <div>
                <ErrorBoundary>
                    <AppWeekBar title={this.state.title}></AppWeekBar>
                    <ShoppingCreateActions isCreate={this.state.isCreate}
                        createShoppingList={this.createShoppingList}
                        updateShoppingList={this.updateShoppingList}
                        isUpdate={this.props.shoppingList ? true : false}>
                    </ShoppingCreateActions>
                    <RecipeBox recipesToInclude={this.state.recipesToInclude}
                        selectedProdRecipe={this.selectedProdRecipe}>
                    </RecipeBox>
                    <ProductBox
                        list={this.state.categories}
                        onSelectedProd={this.selectedProd}>
                    </ProductBox>
                </ErrorBoundary>
            </div>
        )
    }
}

function buildObjectToSend(selectedProducts, recipesToInclude, id) {
    const recipes = ShoppingListUtilService
        .filterSelectedProductInRecipes(recipesToInclude);
    if (id) {
        return {
            categories: selectedProducts,
            recipes,
            _id: id
        }
    } else {
        return {
            categories: selectedProducts,
            recipes
        }
    }
}

function updateShoppingList(shoppingList, categories) {
    const categoriesFromRec = shoppingList.categories;

    const allProducts = UtilCollectionService.getAllSortProducts(categoriesFromRec)

    let selectedProducts = [...this.state.selectedProducts];
    categories.forEach(category => {
        category.products.forEach(product => {
            if (UtilCollectionService.findItemBinarySearch(product.name, allProducts)) {
                product.checked = true;
                selectedProducts = UtilCollectionService.addItem({ category, product }, selectedProducts);
            }
        });
    });

    this.setState({ recipesToInclude: shoppingList.recipes, categories, selectedProducts });
}

function factoryMode(prevState, newState) {
    let {
        categories = prevState.categories,
        selectedProducts = prevState.selectedProducts,
        message = prevState.message
    } = newState;
    return { selectedProducts, categories, message };
}

export default ShoppingListComponent 