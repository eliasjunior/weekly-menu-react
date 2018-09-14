import React from 'react';
import TextField from "@material-ui/core/TextField";
import FormChildAction from '../../common/FormChildAction';
import ProductService from './ProductService';

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
        this.saveProduct = this.saveProduct.bind(this);
        this.changeProduct = this.changeProduct.bind(this);
    }
    saveProduct() {
        const productPayLoad = {
            product: {
                name: this.state.name,
                insertDate: new Date()
            },
            category: this.props.category
        }
        ProductService.save(productPayLoad)
            .then(() => {
                this.props.onHandleMessage({ message: 'Uhhuu Product saved', type: 'success' })
            })
            .catch(reason => this.props.onHandleMessage({ message: reason.message }));
    }
    changeProduct(ev) {
        this.setState({ name: ev.target.value });
    }
    render() {
        return (
            <div>
                <form style={styles.form}>
                    <TextField style={styles.nameField}
                        label="Product name"
                        onChange={this.changeProduct}>
                    </TextField>
                    <FormChildAction 
                        box={styles.actionBtn} 
                        saveAction={this.saveProduct}
                        returnBack={this.props.returnProdList}>
                    </FormChildAction>
                </form>
            </div>
        );
    }
}
const styles = {
    form: {
        marginLeft: '20px'
    },
    nameField: {
        marginTop: '20px'
    },
    box: {
        margin: '10px'
    },
    actionBtn: {
        marginTop: '10px'
    }
}
export default ProductForm
