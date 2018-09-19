import React from 'react';
import { AppWeekBar } from '../common/AppWeekBar';
import ShoppingCreateActions from './ShoppingCreateActions';
import UtilCollectionService from '../service/UtilCollectionService';
import ErrorBoundary from '../ErrorBoundaryComponent';
import { ShoppingListUtilService } from './ShoppingListUtilService';
import CloneDeep from 'lodash.clonedeep';
import ShoppingListService from './ShoppingListService';
import { RecipeBox } from './RecipesBox';
import { ProductBox } from './ProductBox';
import CategoryService from '../inventory/category/CategoryService';

class ShoppingListPage extends React.Component {
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
        this.selectAllProd = this.selectAllProd.bind(this);
        this.selectAllProdOfCatRec = this.selectAllProdOfCatRec.bind(this);
    }
    componentDidMount() {
        CategoryService
            .get()
            .then(categories => {
                // TODO for update list I can't add another recipe at the moment
                // I need to merge this.props.shoppingList.recipes with this.props.recipesToInclude
                if (this.props.shoppingList) {
                    const shoppingList = this.props.shoppingList;
                    const existingCats = CloneDeep(shoppingList.categories);

                    const requestedCats =
                        UtilCollectionService.refreshSelectedItemsShopList(existingCats, categories)

                    this.setState({ recipesToInclude: shoppingList.recipes, categories: requestedCats });

                } else {
                    // edit items recipesToInclude
                    this.setState({ categories , recipesToInclude: this.props.recipesToInclude})
                }
            })
            .catch(reason => {
                this.props.onHandleMessage({ message: reason.message })
            });
    }
    createShoppingList() {
        const catsSelected = UtilCollectionService.getCategorySelected(this.state.categories)
        const shoppintList =
            buildObjectToSend(catsSelected, this.state.recipesToInclude);

        ShoppingListService
            .save(shoppintList)
            .then(() => {
                this.props.onHandleMessage({ message: 'Uhhuu Shopping list saved', type: 'success' })
            })
            .catch(reason => this.props.onHandleMessage({ message: reason.message }));

    }
    updateShoppingList() {
        const catsSelected = UtilCollectionService.getCategorySelected(this.state.categories)
        const shoppintList =
            buildObjectToSend(catsSelected,
                this.state.recipesToInclude, this.props.match.params.id);

        ShoppingListService
            .update(shoppintList)
            .then(() => {
                this.props.onHandleMessage({ message: 'Uhhuu Shopping list updated', type: 'success' })
            })
            .catch(reason => this.props.onHandleMessage({ message: reason.message }));
    }
    selectedProdRecipe(selected) {
        const recipesToInclude = ShoppingListUtilService
            .updateRecipesSelection(this.state.recipesToInclude, selected)

        this.setState({ recipesToInclude })
    }
    selectAllProdOfCatRec(selected) {
        const recipesToInclude = CloneDeep(this.state.recipesToInclude)
        const recipeIn = recipesToInclude.find(rec => rec._id === selected.recId)

        recipeIn.categories = UtilCollectionService
            .updateProductsSelection(recipeIn.categories, selected)

        this.setState({ recipesToInclude })
    }
    selectedProd(selected) {
        const categories = UtilCollectionService
            .updateProductSelection(this.state.categories, selected)

        this.setState({ categories });
    }
    selectAllProd(selected) {
        const categories =
            UtilCollectionService.updateProductsSelection(this.state.categories, selected);
        this.setState({ categories });
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
                    <RecipeBox
                        recipesToInclude={this.state.recipesToInclude}
                        onSelectedProdRecipe={this.selectedProdRecipe}
                        onSelectAllProdOfCatRec={this.selectAllProdOfCatRec}>
                    </RecipeBox>
                    <ProductBox
                        list={this.state.categories}
                        onSelectedProd={this.selectedProd}
                        onSelectAllProd={this.selectAllProd}>
                    </ProductBox>
                </ErrorBoundary>
            </div>
        )
    }
}

function buildObjectToSend(categories, recipesToInclude, id) {
    const recipes = UtilCollectionService
        .getCatsSelectedInRecipes(recipesToInclude);
    if (id) {
        return {
            categories: categories,
            recipes,
            _id: id
        }
    } else {
        return {
            categories: categories,
            recipes
        }
    }
}

export default ShoppingListPage 