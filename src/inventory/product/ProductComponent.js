import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ProductService from './ProductService';
import { ProductLabelInput } from './ProductLabelInput';
import {ProductActions} from './ProductActions';
import {ProductSelection} from './ProductSelection';

const factoryMode = (prevState, newState) => {
    const product = prevState.product;
    product.name = newState.newProductName || prevState.product.name

    return {
        product: product,
        editFieldMode: newState.editFieldMode === false ? false : true
    }    
}
const isASelecionPage = ({
    '/products' : false,
    '/shopping' : true
})
export class ProductComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.product,
            editFieldMode: false,
            isSelection: isASelecionPage[props.location]
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateName = this.updateName.bind(this);
        this.swapIcon = this.swapIcon.bind(this);
        this.onChangeSelection = this.onChangeSelection.bind(this);
    }
    swapIcon() {
        const newState = {
            editFieldMode: !this.state.editFieldMode
        };
        this.setState(prevState => factoryMode(prevState, newState));
    };
    updateName() {
        const newState = {
            editFieldMode: !this.state.editFieldMode,
        };
        ProductService
            .update(this.state.product)
            .then( () => this.setState(prevState => factoryMode(prevState, newState)))
            .catch(reason => console.error(reason));
    }
    onChangeName(name) {
        const options = { 
            newProductName: name 
        };
        this.setState((prevState, props) => factoryMode(prevState, options));
    }
    onChangeSelection(checked) {

    }
    isProductSelection() {
        return this.state.isSelection ? 
            <ProductSelection 
                onChangeSelection={this.onChangeSelection}
                selected={this.state.product.selected}
                name={this.state.product.name}>
            </ProductSelection>
            : ''
    }
    deleteItem(productId) {
        console.log('not implemented yet', productId)
    }
    render () {
        return  (
            <ListItem  key={this.state.product._id} >
                {this.isProductSelection()}
                <ProductLabelInput 
                    inset={!this.state.isSelection}
                    editFieldMode={this.state.editFieldMode} 
                    productName={this.state.product.name} 
                    onChangeName={this.onChangeName}>
                </ProductLabelInput>
                <ListItemSecondaryAction>
                    <ProductActions  
                        deleteItem={this.deleteItem} 
                        editFieldMode={this.state.editFieldMode}
                        updateName={this.updateName}
                        swapIcon={this.swapIcon}>
                    </ProductActions>    
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}