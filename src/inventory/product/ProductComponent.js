import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ProductService from './ProductService';
import { EditableLabel } from '../../common/EditableLabel';
import { CrudActions } from '../../common/CrudActions';
import { ProductSelection } from './ProductSelection';

// TODO add new states here
const factoryMode = (prevState, newState) => {
    const product = prevState.product;
    product.name = newState.newProductName || prevState.product.name
    return {
        product: product,
        editFieldMode: newState.editFieldMode === false ? false : true
    }
}
const isASelecionPage = ({
    '/products': false,
    '/shopping': true
})
export class ProductComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.product,
            editFieldMode: false,
            isCheckBoxDisplay: isASelecionPage[props.location],
            isActionBtnDisplay: !isASelecionPage[props.location],
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateName = this.updateName.bind(this);
        this.swapIcon = this.swapIcon.bind(this);
        this.selectedProd = this.selectedProd.bind(this);
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
            .then(() => this.setState(prevState => factoryMode(prevState, newState)))
            .catch(reason => console.error(reason));
    }
    onChangeName(name) {
        const newState = {
            newProductName: name
        };
        this.setState((prevState, props) => factoryMode(prevState, newState));
    }
    selectedProd(checked, prodName) {
        this.props.onSelectionProd({checked, prodName});
    }
    isProductSelection() {
        return this.state.isCheckBoxDisplay ?
            <ProductSelection
                onChangeSelection={this.selectedProd}
                selected={this.state.product.selected}
                name={this.state.product.name}>
            </ProductSelection>
            : ''
    }
    isActionButtonDisplay() {
        return this.state.isActionBtnDisplay ?
            <CrudActions
                deleteItem={this.deleteItem}
                editFieldMode={this.state.editFieldMode}
                updateName={this.updateName}
                swapIcon={this.swapIcon}>
            </CrudActions>
            : ''
    }
    deleteItem(productId) {
        console.log('not implemented  yet', productId)
    }
    render() {
        return (
            <ListItem key={this.state.product._id} >
                {this.isProductSelection()} 
                <EditableLabel
                    inset={true}
                    editFieldMode={this.state.editFieldMode}
                    inputValue={this.state.product.name}
                    onChangeName={this.onChangeName}>
                </EditableLabel>
                <ListItemSecondaryAction>
                    {this.isActionButtonDisplay()}
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}