import React from 'react';
import CategoryList from '../category/CategoryList';
import { AppWeekBar } from '../../common/AppWeekBar';
import ApiService from '../../service/ApiService';
import { ShoppingCreateActions } from './ShoppingCreateActions';

const factoryMode = (prevState, newState) => {
    let {
        categories = prevState.categories,
        selectedProd = prevState.selectedProd,
        message = prevState
    } = newState;
    return { selectedProd, categories, message };
};
class ShoppingListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedProd: [],
            message: ''
        }
        this.selectedProd = this.selectedProd.bind(this);
        this.createShoppingList = this.createShoppingList.bind(this);
    }
    componentDidMount() {
        //this is the created list -> category/week/shopping 
        ApiService
            .get('v2/category')
            .then(categories => this.setState(() => ({ categories })))
            .catch(reason => this.setState({ message: reason }));
    }
    createShoppingList() {
        console.log('creating...', this.state.selectedProd)
    }
    selectedProd(selected) {
        let selectedProd = [...this.state.selectedProd];
        const productName = selected.prodName;
        const isProdIn = selectedProd.find(name => name === productName);

        if (selected.checked && !isProdIn) {
            selectedProd.push(selected.prodName);
        } else if (isProdIn) {
            selectedProd = selectedProd.filter(name => name !== productName);
        }
        this.setState(prevState => factoryMode(prevState, { selectedProd }));
    }
    render() {
        return (
            <div>
                <AppWeekBar title="New Shopping List"></AppWeekBar>
                <ShoppingCreateActions
                    createShoppingList={this.createShoppingList}>
                </ShoppingCreateActions>
                <CategoryList
                    list={this.state.categories}
                    location={this.props.location.pathname}
                    onSelectedProd={this.selectedProd}>
                </CategoryList>
            </div>
        )
    }
}

export default ShoppingListComponent 