import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import ProductService from './ProductService';
import MessageComponent from '../../common/MessageComponent';
import { browserHistory } from 'react-router';

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
            message: '',
            _creator: props.catId
        };
        this.saveProduct = this.saveProduct.bind(this);
        this.changeProduct = this.changeProduct.bind(this)
    }
    saveProduct() {
        ProductService.save(this.state)
            .then(doc => {
                this.setState({
                    message: {
                        message: 'Product saved',
                        type: SUCCESS_TYPE
                    }
                });
            })
            .catch(reason => this.setState({ message: reason.message }));
    }
    changeProduct(ev) {
        this.setState({ name: ev.target.value });
    }
    render() {
        return (
            <div>
                <MessageComponent message={this.state.message}></MessageComponent>
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
                            onClick={browserHistory.goBack}>
                            Back
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}
export default ProductForm
