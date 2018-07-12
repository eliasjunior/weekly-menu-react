import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { green500, red400 } from 'material-ui/styles/colors';
import ProductService from './ProductService';

const styles = {
    saveIcon: {
        color: green500
    },
    editIcon: {
        color: green500
    },
    deleteIcon: {
        color: red400
    }
}
const factoryMode = (prevState, newState) => {
    const product = prevState.product;
    product.name = newState.newProductName || prevState.product.name

    return {
        product: product,
        editFieldMode: newState.editFieldMode === false ? false : true
    }    
}
export class ProductViewLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.product,
            editFieldMode: false
        }
    }
    changeViewFieldProduct() {
        const newState = {
            editFieldMode: !this.state.editFieldMode,
            product: this.state.product
        };
        if(this.state.editFieldMode){
            console.log('send put(construction)', this.state.product.name)
            ProductService.update(this.state.product)
                .then(response => {
                    console.log('Success', response)
                })
                .catch(reason => console.error(reason))
        }
        this.setState((prevState, props) => factoryMode(prevState, newState));
    };
    deleteItem(productId) {
        console.log('not implemented yet', productId)
    }
    updateProductName(e) {
        const options = { 
            newProductName: e.target.value 
        };
        this.setState((prevState, props) => factoryMode(prevState, options));
    }
    displayNameOrInput() {
        return this.state.editFieldMode ? 
            <TextField onChange={this.updateProductName.bind(this)} 
                defaultValue={this.state.product.name} /> :
            <ListItemText inset primary={this.state.product.name} />
    }
    displaySaveOrEditIcon() {
        return this.state.editFieldMode ? 
            <SaveIcon style={styles.saveIcon} 
                onClick={this.changeViewFieldProduct.bind(this)} /> :
            <CreateIcon style={styles.editIcon} 
                onClick={this.changeViewFieldProduct.bind(this)} />;
    }
    render () {
        return  (
            <ListItem  key={this.state.product._id} >
                {this.displayNameOrInput()} 
                <ListItemSecondaryAction>
                    <IconButton aria-label="Comments">
                        {this.displaySaveOrEditIcon()}
                    </IconButton>
                    <IconButton aria-label="Comments">
                        <DeleteIcon  style={styles.deleteIcon} 
                            onClick={this.deleteItem.bind(this, this.state.product._id)} />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}