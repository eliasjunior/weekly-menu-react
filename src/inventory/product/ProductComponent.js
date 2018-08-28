import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ProductService from './ProductService';
import { EditableLabel } from '../../common/EditableLabel';
import { CrudActions } from '../../common/CrudActions';
import { ItemSelection } from '../../common/ItemSelection'; 
import DisplayService  from '../../DisplayService';

// TODO add new states here
const factoryMode = (prevState, newState) => {
    const product = prevState.product;
    product.name = newState.newProductName || prevState.product.name
    return {
        product: product,
        editFieldMode: newState.editFieldMode === false ? false : true
    }
}
export class ProductComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.product,
            editFieldMode: false
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
    displayCheckBtn() {
        return DisplayService.productCheckBtn(this.props.location).display ?
            <ItemSelection
                onChangeSelection={this.selectedProd}
                selected={this.state.product.selected}
                name={this.state.product.name}>
            </ItemSelection>
            : ''
    }
    isActionButtonDisplay() {
        return DisplayService.crudActions(this.props.location).display ?
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
                {this.displayCheckBtn()} 
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