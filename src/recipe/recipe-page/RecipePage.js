import React from 'react';
import { AppWeekBar } from "../../common/AppWeekBar";
import { CategoryList } from '../../inventory/category/CategoryList';
import { TextField } from '@material-ui/core';
import MessageComponent from '../../common/MessageComponent';
import FormChildAction from '../../common/FormChildAction';
import RecipeService from '../RecipeService';
import RecipeCollectionService from '../RecipeCollectionService';
import CategoryService from '../../inventory/category/CategoryService';
import RecipePageUtilService from './RecipePageUtilService';

const styles = {
    box: {
        margin: '10px'
    },
    input: {
        margin: '10px'
    }
};

const factoryMode = (prevState, newState) => {
    let {
        name = prevState.name,
        categories = prevState.categories,
        selectedProducts = prevState.selectedProducts,
        message = prevState.message
    } = newState;
    return { name, categories, selectedProducts, message };
};

function loadRecipe(id, categories) {
    this.setState(prevState => factoryMode(prevState, { categories }));
    if (id) {
        return RecipeService.getOne(id);
    } else {
        return Promise.resolve(null);
    }
}

class RecipePage extends React.Component {
    //React's constructor is called before DOM is mounted.
    constructor(props) {
        super(props);
        this.state = {
            message: '',
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
                    const categoriesOfRecipe = RecipePageUtilService.matchProductRecipe(recipe.categories, this.state.categories);

                    // TEST FOR THIS,
                    console.log('categoriesOfRecipe', categoriesOfRecipe)

                    let selectedProducts = RecipePageUtilService.filterProdSelected(categoriesOfRecipe);

                    console.log('selectedProducts $$$$', categoriesOfRecipe)

                    this.setState(prevState => factoryMode(prevState, {
                        name: recipe.name,
                        categories: categoriesOfRecipe,
                        selectedProducts
                    }));
                }
            })
            .catch(reason => this.setState({ message: reason }));
    }
    selectedProd(selected) {
        // need to receice a category selected
        console.log('SELE >>>>>', selected)
        let selectedProducts = [...this.state.selectedProducts];
        const category = selected.category;
        const product = selected.product;

        if (selected.checked) {
            selectedProducts = RecipeCollectionService.addItem({ category, product }, selectedProducts)
        } else {
            selectedProducts = RecipeCollectionService.removeItem({ category, product }, selectedProducts)
        }

        console.log('selectedProducts *****', selectedProducts)

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
            .then(() => {
                const newState = { message: { message: 'Hooray, recipe created!', type: 'S' } };
                this.setState(prevState => factoryMode(prevState, newState))
            })
            .catch(reason => this.setState({ message: reason.message }));
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
                const newState = { message: { message: 'Hooray, recipe Update!', type: 'S' } };
                this.setState(prevState => factoryMode(prevState, newState))
            })
            .catch(reason => this.setState({ message: reason.message }));
    }
    render() {
        return (
            <div>
                <AppWeekBar title={this.state.title}></AppWeekBar>
                <MessageComponent
                    message={this.state.message}>
                </MessageComponent>
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
export default RecipePage

