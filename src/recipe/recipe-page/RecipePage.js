import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppWeekBar } from "../../common/AppWeekBar";
import ApiService from '../../service/ApiService';
import { CategoryList } from '../../inventory/CategoryList';
import { Button } from '@material-ui/core';
import { EditableLabel } from '../../common/EditableLabel';
import { CrudActions } from '../../common/CrudActions';

const factoryMode = (prevState, newState) => {
    let {
        name = prevState.name,
        categories = prevState.categories,
        selectedProd = prevState.selectedProd,
        message = prevState
    } = newState;
    return { name, categories, selectedProd, message };
};
class RecipePage extends React.Component {
    //React's constructor is called before DOM is mounted.
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            categories: [],
            selectedProd: [],
            name: ''
        }
        this.updateName = this.updateName.bind(this);
        this.swapIcon = this.swapIcon.bind(this);
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
        // ProductService
        //     .update(this.state.product)
        //     .then(() => this.setState(prevState => factoryMode(prevState, newState)))
        //     .catch(reason => console.error(reason));
    }
    swapIcon() {
        const newState = {
            editFieldMode: !this.state.editFieldMode
        };
        this.setState(prevState => factoryMode(prevState, newState));
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
    createRecipe() {
        console.log('create -> ', this.state.selectedProd)




    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppWeekBar title='New Recipe'></AppWeekBar>
                    <Button variant="contained"
                        onClick={this.createRecipe} >
                        Create Recipe
                    </Button>
                    <div>{this.state.name}</div>
                    <div style={{ margin: '20px' }}>
                        <EditableLabel
                            inset={false}
                            editFieldMode={true}
                            onChangeName={this.updateName}>
                        </EditableLabel>
                        <CrudActions
                            editFieldMode={true}
                            updateName={this.updateName}
                            swapIcon={this.swapIcon}>
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
export default RecipePage
