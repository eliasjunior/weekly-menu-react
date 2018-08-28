import React from 'react';
import CategoryList from './CategoryList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppWeekBar } from '../common/AppWeekBar';
import ApiService from '../service/ApiService';
import { ShoppingCreateActions } from './ShoppingCreateActions';

class ShoppingListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            location: props.location.pathname,
            selectedProd: []
        }
        this.selectedProd = this.selectedProd.bind(this);
        this.createShoppingList = this.createShoppingList.bind(this);
    }
    componentDidMount() {
        //this is the created list -> category/week/shopping 
        ApiService
            .get('category')
            .then( categories => this.setState(() => ({categories})))
            .catch( reason => this.setState({message: reason}));
    }
    createShoppingList() {
        console.log('creating...', this.state.selectedProd)
    }
    selectedProd(selected) {
        let selectedProds = [...this.state.selectedProd];
        const productName = selected.prodName;
        const isProdIn = selectedProds.find(name => name === productName);

        if (selected.checked) {
            if (!isProdIn) {
                selectedProds.push(selected.prodName);
                this.setState({ selectedProd: selectedProds })
            }
        } else if (isProdIn) {
            selectedProds = selectedProds.filter(name => name !== productName);
            this.setState({ selectedProd: selectedProds })
        }
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppWeekBar title="New Shopping List"></AppWeekBar>
                    <ShoppingCreateActions
                        createShoppingList={this.createShoppingList}>
                    </ShoppingCreateActions>
                    <CategoryList
                        list={this.state.categories}
                        location={this.state.location}
                        onSelectedProd={this.selectedProd}>
                    </CategoryList>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default ShoppingListComponent 