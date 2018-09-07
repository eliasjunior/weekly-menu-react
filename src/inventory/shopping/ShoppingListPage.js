import React from 'react';
import CategoryList from '../category/CategoryList';
import { AppWeekBar } from '../../common/AppWeekBar';
import { ShoppingCreateActions } from './ShoppingCreateActions';
import CategoryService from '../category/CategoryService';
import SelectionCollectionService from '../../service/SelectionCollectionService';
import ErrorBoundary from '../../ErrorBoundaryComponent';
import { RecipeListComponent } from '../../recipe/RecipeListComponent';
import { Divider } from '@material-ui/core';

class ShoppingListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedProducts: [],
            message: '',
            recipesToInclude: props.recipesToInclude
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
        console.log('creating...', this.state.selectedProducts)
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

        //selected.checked
       
        console.log('add to state', SelectionCollectionService.recipeToAdd(selected.recipe))
    }
    render() {
        return (
            <div>
                <ErrorBoundary>
                    <AppWeekBar title="New Shopping List"></AppWeekBar>
                    <ShoppingCreateActions
                        createShoppingList={this.createShoppingList}>
                    </ShoppingCreateActions>
                    <RecipeListComponent 
                        title="Recipe included"
                        isNotEditable={true}
                        isRecipeNotSelectable={true}
                        recipes={this.state.recipesToInclude}
                        onSelectAction={this.selectedProdRecipe}
                        parentComponent="ShoppingListPage">
                    </RecipeListComponent>
                    <CategoryList
                        list={this.state.categories}
                        parentComponent="ShoppingListPage"
                        onSelectedProd={this.onSelectedProd}>
                    </CategoryList>
                    <Divider />
                </ErrorBoundary>
            </div>
        )
    }
}

function factoryMode(prevState, newState){
    let {
        categories = prevState.categories,
        selectedProducts = prevState.selectedProducts,
        message = prevState
    } = newState;
    return { selectedProducts, categories, message };
}

export default ShoppingListComponent 