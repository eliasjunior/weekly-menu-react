import React from 'react';
import { AppWeekBar } from "../../common/AppWeekBar";
import ApiService from '../../service/ApiService';
import { CategoryList } from '../../inventory/category/CategoryList';
import { TextField } from '@material-ui/core';
import MessageComponent from '../../common/MessageComponent';
import FormChildAction from '../../common/FormChildAction';
import RecipeService from '../RecipeService';
import RecipeCollectionService from '../RecipeCollectionService';
import CategoryService from '../../inventory/category/CategoryService';

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

class RecipePage extends React.Component {
    //React's constructor is called before DOM is mounted.
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            categories: [],
            selectedProducts: [],
            name: ''
        };
        this.selectedProd = this.selectedProd.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
    }
    componentDidMount() {
        CategoryService
            .get()
            .then(categories => this.setState(() => ({ categories })))
            .catch(reason => this.setState({ message: reason }));
    }
    selectedProd(selected) {
        // need to receice a category selected
        console.log('SELE >>>>>', selected)
        let selectedProducts = [...this.state.selectedProducts];
        const category = selected.category;
        const product = selected.product;

        if(selected.checked) {
            selectedProducts = RecipeCollectionService.addItem({category, product}, selectedProducts)
        } else {
            selectedProducts = RecipeCollectionService.removeItem({category, product}, selectedProducts)
        }

        console.log('selectedProducts *****', selectedProducts)
        
        this.setState(prevState => factoryMode(prevState, { selectedProducts }));
    }
    onChangeName(e) {
        this.setState({name: e.target.value});
    }
    saveRecipe() {
        const recipe = {
            name: this.state.name,
            insertDate: new Date(),
            updateDate: new Date(),
            categories: this.state.selectedProducts
        };
        RecipeService
            .save(recipe)
            .then(response => {
                const newState = { message: { message: 'Hooray, recipe created!', type: 'S' } };
                this.setState(prevState => factoryMode(prevState, newState))
            })
            .catch(reason => this.setState({ message: reason.message }));
    }
    render() {
        return (
                <div>
                    <AppWeekBar title='New Recipe'></AppWeekBar>
                    <MessageComponent
                        message={this.state.message}>
                    </MessageComponent>
                    <TextField
                        style={styles.input}
                        defaultValue={this.state.name}
                        label="Recipe name"
                        onChange={this.onChangeName}>
                    </TextField>
                    <FormChildAction
                        box={styles.input}
                        updateAction={this.updateRecipe}
                        saveAction={this.saveRecipe}>
                    </FormChildAction>
                    <CategoryList
                        list={this.state.categories}
                        location={this.props.location.pathname}
                        onSelectedProd={this.selectedProd}>
                    </CategoryList>
                </div>
        );
    }
}
export default RecipePage

