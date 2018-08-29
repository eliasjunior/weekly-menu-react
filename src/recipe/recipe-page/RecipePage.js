import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppWeekBar } from "../../common/AppWeekBar";
import ApiService from '../../service/ApiService';
import { CategoryList } from '../../inventory/CategoryList';
import { Button } from '@material-ui/core';
import { EditableLabel } from '../../common/EditableLabel';
import { CrudActions } from '../../common/CrudActions';
import MessageComponent from '../../common/MessageComponent';
import RecipeService from '../RecipeService';

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
        this.updateName = this.updateName.bind(this);
        this.selectedProd = this.selectedProd.bind(this);
        this.createRecipe = this.createRecipe.bind(this);
    }
    componentDidMount() {
        ApiService
            .get('v2/category')
            .then(categories => this.setState(() => ({ categories })))
            .catch(reason => this.setState({ message: reason }));
    }
    updateName(name) {
        this.setState(prevState => factoryMode(prevState, { name }))
    }
    selectedProd(selected) {
        let selectedProducts = [...this.state.selectedProducts];
        const productSelected = {
            name: selected.name,
            _creator: selected.parentId,
            categoryName: selected.parentName
        };
        const isProdIn = selectedProducts.find(prod => prod.name === productSelected.name);

        if (selected.checked && !isProdIn) {
            selectedProducts.push(productSelected);
        } else if (isProdIn) {
            selectedProducts = selectedProducts.filter(prod => prod.name !== productSelected.name);
        }
        this.setState(prevState => factoryMode(prevState, { selectedProducts }));
    }
    createRecipe(event) {
        event.preventDefault();
        const recipe = {
            name: this.state.name,
            products: this.state.selectedProducts
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
            <MuiThemeProvider>
                <div>
                    <AppWeekBar title='New Recipe'></AppWeekBar>
                    <MessageComponent
                        message={this.state.message}>
                    </MessageComponent>
                    <Button variant="contained"
                        onClick={this.createRecipe}>
                        Create Recipe
                    </Button>
                    <div style={{ margin: '20px' }}>
                        <EditableLabel
                            inset={false}
                            editFieldMode={true}
                            onChangeName={this.updateName}>
                        </EditableLabel>
                        <CrudActions
                            editFieldMode={true}
                            updateName={this.updateName}>
                        </CrudActions>
                    </div>
                    <CategoryList
                        list={this.state.categories}
                        location={this.props.location.pathname}
                        onSelectedProd={this.selectedProd}>
                    </CategoryList>
                </div>
            </MuiThemeProvider>
        );
    }
}
RecipePage.propTypes = {
    name: React.PropTypes.string.isRequired
}
export default RecipePage

