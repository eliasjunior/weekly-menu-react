import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import ProductService from './ProductService';
import MessageComponent from '../../common/MessageComponent';

const SUCCESS_TYPE = 'S';
const styles = {
    button: {
        margin: '2px'
    },
    form: {
        marginLeft: '20px'
    },
    nameField: {
        marginTop: '20px'
    },
    buttonBox: {
        marginTop: '20px'
    }
}
class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: null,
            _creator: props.catId
        };
        this.saveProduct = this.saveProduct.bind(this);
        this.changeProduct = this.changeProduct.bind(this);
    }
    saveProduct() {
        ProductService.save(this.state)
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
                    <div style={styles.buttonBox}>
                        <Button style={styles.button} variant="contained" color="primary"
                            onClick={this.saveProduct}>
                            Save
                        </Button>
                        <Button style={styles.button} variant="contained" color="secondary"
                            onClick={ () => this.props.returnProdList()}>
                            Back
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}
export default ProductForm
