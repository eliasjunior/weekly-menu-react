import React from 'react';
import { AppWeekBar } from "../../common/AppWeekBar";
import { CategoryList } from '../../inventory/category/CategoryList';
import { TextField } from '@material-ui/core';
import FormChildAction from '../../common/FormChildAction';
import RecipeService from '../RecipeService';
import UtilCollectionService from '../../service/UtilCollectionService';
import CategoryService from '../../inventory/category/CategoryService';
import RecipePageUtilService from '../../service/RecipePageUtilService';

class RecipePage extends React.Component {
    //React's constructor is called before DOM is mounted.
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedProducts: [],
            name: '',
            id: this.props.match.params.id,
            title: this.props.match.params.id ? 'Update Recipe' : 'New Recipe'
        };
        this.selectedProd = this.selectedProd.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
        this.updateRecipe = this.updateRecipe.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
    }
    componentDidMount() {
        CategoryService
            .get()
            .then(loadRecipe.bind(this, this.props.match.params.id))
            .then(recipe => {
                if (recipe) {
                    const categoriesOfRecipe = RecipePageUtilService
                        .matchProductRecipeAndAddCheck(recipe.categories, this.state.categories);
                    let selectedProducts = RecipePageUtilService.filterProdSelected(categoriesOfRecipe);
                    this.setState(prevState => factoryMode(prevState, {
                        name: recipe.name,
                        categories: categoriesOfRecipe,
                        selectedProducts
                    }));
                }
            })
            .catch(reason => this.props.onHandleMessage({ message: reason.message }));
    }
    selectedProd(selected) {
        // need to receice a category selected
        let selectedProducts = [...this.state.selectedProducts];
        const category = selected.category;
        const product = selected.product;

        if (selected.checked) {
            selectedProducts = UtilCollectionService.addItem({ category, product }, selectedProducts)
        } else {
            selectedProducts = UtilCollectionService.removeItem({ category, product }, selectedProducts)
        }
        this.setState(prevState => factoryMode(prevState, { selectedProducts }));
    }
    onChangeName(e) {
        this.setState({ name: e.target.value });
    }
    saveRecipe() {
        const recipe = {
            name: this.state.name,
            categories: this.state.selectedProducts
        };
        RecipeService
            .save(recipe)
            .then(() => this.props
                .onHandleMessage({ message: 'Hooray, recipe created!', type: 'success' }))
            .catch(reason => this.props.onHandleMessage({ message: reason.message }));

    }
    updateRecipe() {
        const recipe = {
            name: this.state.name,
            _id: this.state.id,
            categories: this.state.selectedProducts
        };
        RecipeService
            .update(recipe)
            .then(() => {
                this.props.onHandleMessage({ message: 'Hooray, recipe Update!', type: 'success' })
            })
            .catch(reason => this.props.onHandleMessage({ message: reason.message }));
    }
    render() {
        return (
            <div>
                <AppWeekBar title={this.state.title}></AppWeekBar>
                <TextField
                    style={styles.input}
                    label="Recipe name"
                    value={this.state.name}
                    onChange={this.onChangeName}>
                </TextField>
                <FormChildAction
                    returnBack={this.props.history.goBack}
                    isToUpdate={this.props.match.params.id ? true : false}
                    box={styles.input}
                    updateAction={this.updateRecipe}
                    saveAction={this.saveRecipe}>
                </FormChildAction>
                <CategoryList
                    list={this.state.categories}
                    parentComponent="RecipePage"
                    onSelectedProd={this.selectedProd}>
                </CategoryList>
            </div>
        );
    }
}
const styles = {
    box: {
        margin: '10px'
    },
    input: {
        margin: '10px'
    }
};
function loadRecipe(id, categories) {
    this.setState(prevState => factoryMode(prevState, { categories }));
    if (id) {
        return RecipeService.getOne(id);
    } else {
        return Promise.resolve(null);
    }
}
function factoryMode(prevState, newState){
    let {
        name = prevState.name,
        categories = prevState.categories,
        selectedProducts = prevState.selectedProducts,
        message = prevState.message
    } = newState;
    return { name, categories, selectedProducts, message };
};

export default RecipePage

