import React from 'react';
import { AppWeekBar } from "../../common/AppWeekBar";
import CategoryList from '../../inventory/category/CategoryList';
import { TextField } from '@material-ui/core';
import RecipeService from '../RecipeService';
import UtilCollectionService from '../../service/UtilCollectionService';
import CategoryService from '../../inventory/category/CategoryService';
import RecipePageUtilService from '../../service/RecipePageUtilService';
import RecipeActions from './RecipeActions';

class RecipePage extends React.Component {
    //React's constructor is called before DOM is mounted.
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            name: '',
            title: this.props.match.params.id ? 'Update Recipe' : 'New Recipe'
        };
        this.selectedProd = this.selectedProd.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
        this.updateRecipe = this.updateRecipe.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.selectAllProd = this.selectAllProd.bind(this);
        this.refresh = this.refresh.bind(this)
    }
    componentDidMount() {
        this.refresh()
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
    onChangeName(e) {
        this.setState({ name: e.target.value });
    }
    saveRecipe() {
        const recipe = {
            name: this.state.name,
            categories: UtilCollectionService.getCategorySelected(this.state.categories)
        };
        RecipeService
            .save(recipe)
            .then(() => this.props
                .onHandleMessage({ message: 'Hooray, recipe created!', type: 'success' }))
            .catch(reason => this.props.onHandleMessage({ message: reason.message }));

    }
    refresh() {
        CategoryService
            .get()
            .then(loadRecipe.bind(this, this.props.match.params.id))
            .then(recipe => {
                if (recipe) {
                    const categoriesOfRecipe = RecipePageUtilService
                        .matchProductRecipeAndAddCheck(recipe.categories, this.state.categories);

                    this.setState({
                        name: recipe.name,
                        categories: categoriesOfRecipe
                    })
                }
            })
            .catch(reason => this.props.onHandleMessage({ message: reason.message }));
    }
    updateRecipe() {
        const recipe = {
            name: this.state.name,
            _id: this.props.match.params.id,
            categories: UtilCollectionService.getCategorySelected(this.state.categories)
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
                <RecipeActions
                    isToUpdate={this.props.match.params.id ? true : false}
                    onUpdateAction={this.updateRecipe}
                    onSaveAction={this.saveRecipe}>
                </RecipeActions>
                <CategoryList
                    list={this.state.categories}
                    parentComponent="RecipePage"
                    onSelectedProd={this.selectedProd}
                    onSelectAllProd={this.selectAllProd}
                    onHandleMessage={this.props.onHandleMessage}
                    onRefresh={this.refresh}
                    onOpenDialog={this.openFormDialogCategory}>
                </CategoryList>
            </div>
        );
    }
}
const styles = {
    input: {
        margin: '10px'
    }
};
function loadRecipe(id, categories) {
    this.setState({ categories });
    if (id) {
        return RecipeService.getOne(id);
    } else {
        return Promise.resolve(null);
    }
}

export default RecipePage

