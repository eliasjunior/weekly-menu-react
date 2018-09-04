import React from 'react';
import TextField from "@material-ui/core/TextField";
import FormChildAction from '../../common/FormChildAction';
import ProductService from './ProductService';
import MessageComponent from '../../common/MessageComponent';

const SUCCESS_TYPE = 'S';
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
class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: null
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
            .then(doc => {
                console.log('Product created', doc)
                this.setState({
                    message: {
                        message: 'Product saved',
                        type: SUCCESS_TYPE
                    }
                });
            })
            .catch(reason => {
                this.setState({message: reason.message});
            });
    }
    renderMessage() {
        return this.state.message ? 
            <MessageComponent message={this.state.message}></MessageComponent> 
            : ''
    }
    changeProduct(ev) {
        this.setState({ name: ev.target.value });
    }
    render() {
        return (
            <div>
                {this.renderMessage()}
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
export default ProductForm
