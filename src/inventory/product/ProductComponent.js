import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ProductService from './ProductService';
import { EditableLabel } from '../../common/EditableLabel';
import { CrudActions } from '../../common/CrudActions';
import ItemSelection from '../../common/ItemSelection';
import DisplayService from '../category/CategoryDisplayService';
import CloneDeep from 'lodash.clonedeep'

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
            editFieldMode: false,
            newProductName: props.product.name
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateName = this.updateName.bind(this);
        this.swapIcon = this.swapIcon.bind(this);
    }
    componentDidUpdate(prevProps) {
        const prevProduct = prevProps.product;
        const currentProd = this.props.product;
        // TODO revise here, calling all prods in check/recipe includes
        if (prevProduct.checked !== currentProd.checked) {
            this.setState({ product: CloneDeep(currentProd) })
        }
    }
    swapIcon() {
        const newState = {
            editFieldMode: !this.state.editFieldMode
        };
        this.setState(prevState => factoryMode(prevState, newState));
    };
    updateName() {
        const productPayLoad = {
            product: this.state.product,
            category: this.props.category
        }
        ProductService
            .update(productPayLoad)
            .then(() => {
                const newState = {
                    editFieldMode: !this.state.editFieldMode,
                };
                this.setState(prevState => factoryMode(prevState, newState));
            }).catch(reason => this.props.onHandleMessage({ message: reason.message }));
    }
    onChangeName(name) {
        const newState = {
            newProductName: name
        };
        this.setState((prevState, props) => factoryMode(prevState, newState));
    }
    displayCheckBtn() {
        // TODO check names, it will be generic or cat/prod
        return DisplayService.productCheckboxBtn(this.props.parentComponent).display ?
            <ItemSelection
                onChangeSelection={this.props.onSelectedProd}
                product={this.state.product}
                parent={this.props.category}>
            </ItemSelection>
            : ''
    }
    isActionButtonDisplay() {
        return DisplayService.crudActions(this.props.parentComponent).display ?
            <CrudActions
                deleteItem={this.deleteItem}
                editFieldMode={this.state.editFieldMode}
                updateName={this.updateName}
                swapIcon={this.swapIcon}
                id={this.props.product._id}>
            </CrudActions>
            : ''
    }
    deleteItem() {
        this.props.onHandleMessage({ message: 'not implemented  yet' })
    }
    render() {
        return (
            <ListItem key={this.props.product._id}   >
                {this.displayCheckBtn()}
                <EditableLabel
                    product={this.props.product}
                    name={this.props.product.name}
                    inset={true}
                    editFieldMode={this.state.editFieldMode}
                    onChangeName={this.onChangeName}>
                </EditableLabel>
                <ListItemSecondaryAction>
                    {this.isActionButtonDisplay()}
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}