import React from 'react';
import CategoryList from '../category/CategoryList';
import { AppWeekBar } from '../../common/AppWeekBar';
import { ShoppingCreateActions } from './ShoppingCreateActions';
import CategoryService from '../category/CategoryService';
import SelectionCollectionService from '../../service/SelectionCollectionService';
import ErrorBoundary from '../../ErrorBoundaryComponent';
import { CardContent, Card } from '@material-ui/core';
import { ShoppingListUtilService } from './ShoppingListUtilService';
import CloneDeep from 'lodash.clonedeep';
import ShoppingListService from './ShoppingListService';
import MessageComponent from '../../common/MessageComponent';
import { RecipeBox } from './RecipesBox';
import { ProductBox } from './ProductBox';

class ShoppingListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedProducts: [],
            message: '',
            recipesToInclude: CloneDeep(props.recipesToInclude)
        }

        this.selectedProd = this.selectedProd.bind(this);
        this.selectedProdRecipe = this.selectedProdRecipe.bind(this);
        this.createShoppingList = this.createShoppingList.bind(this);
    }
    componentDidMount() {
        //this is the created list -> category/week/shopping 
        CategoryService
            .get()
            .then(categories => this.setState(() => ({ categories })))
            .catch(reason => this.setState({ message: reason }));
    }
    createShoppingList() {
        const recipes = ShoppingListUtilService
            .filterSelectedProductInRecipes(this.state.recipesToInclude)

        console.log('creating...', recipes)
        console.log('creating...', this.state.selectedProducts)

        const shoppintList = {
            categories: this.state.selectedProducts,
            recipes
        }

        ShoppingListService
            .save(shoppintList)
            .then(() => {
                this.setState({ message: { message: 'Uhhuu Shopping list saved', type: 'S' } })
            })
            .catch(reason => this.setState({ message: reason.message }));

    }
    selectedProd(selected) {
        // need to receice a category selected
        console.log('SELE >>>>>', selected)
        let selectedProducts = [...this.state.selectedProducts];
        const category = selected.category;
        const product = selected.product;

        if (selected.checked) {
            selectedProducts = SelectionCollectionService.addItem({ category, product }, selectedProducts)
        } else {
            selectedProducts = SelectionCollectionService.removeItem({ category, product }, selectedProducts)
        }
        console.log('selectedProducts *****', selectedProducts)
        this.setState(prevState => factoryMode(prevState, { selectedProducts }));
    }
    selectedProdRecipe(selected) {
        console.log('>>>', selected)

        const recipesToInclude = ShoppingListUtilService
            .updateRecipesSelection(this.state.recipesToInclude, selected)

        this.setState({ recipesToInclude })
    }
    render() {
        return (
            <div>
                <ErrorBoundary>
                    <AppWeekBar title="New Shopping List"></AppWeekBar>
                    <MessageComponent
                        message={this.state.message}>
                    </MessageComponent>
                    <ShoppingCreateActions
                        createShoppingList={this.createShoppingList}>
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

function factoryMode(prevState, newState) {
    let {
        categories = prevState.categories,
        selectedProducts = prevState.selectedProducts,
        message = prevState.message
    } = newState;
    return { selectedProducts, categories, message };
}

export default ShoppingListComponent 