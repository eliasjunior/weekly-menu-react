import React from 'react';
import { Button } from '@material-ui/core';
import FormDialog from './FormDialog';
import ProductService from './product/ProductService';
import CategoryService from './category/CategoryService';

class CategoryActions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogProps: {
                open: false,
                isUpdate: false,
                form : {
                    placeHolder: 'Product name'
                }
            },
            name: ''
        }
        this.openFormDialogProduct = this.openFormDialogProduct.bind(this);
        this.openFormDialogCategory = this.openFormDialogCategory.bind(this);
        this.closeDialog = this.closeDialog.bind(this);

        this.saveProduct = this.saveProduct.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
    }
    openFormDialogProduct() {
        const dialogProps = {...this.state.dialogProps}
        dialogProps.open = true;
        dialogProps.title = 'New Product'
        dialogProps.form = {
            placeHolder: 'Product name',
            value: ''
        }
        dialogProps.onActionMethod = this.saveProduct
        this.setState({dialogProps})
    }
    openFormDialogCategory() {
        const dialogProps = {...this.state.dialogProps}
        dialogProps.title = 'Update Category'
        dialogProps.isUpdate = true
        dialogProps.open = true;
        dialogProps.form = {
            placeHolder: 'Category name',
            value: this.props.category.name
        }
        dialogProps.onActionMethod = this.updateCategory
        this.setState({dialogProps})
    }
    closeDialog() {
        const dialogProps = {...this.state.dialogProps};
        dialogProps.open = false;
        this.setState({ dialogProps })
    }
    saveProduct() {
        const category = this.props.category;
        const productPayLoad = {
            product: {
                name: this.state.name
            },
            category: {
                name: category.name,
                _id: category._id
            }
        }
        ProductService.save(productPayLoad)
            .then(() => {
                this.props.onHandleMessage({ message: 'Uhhuu Product saved', type: 'success' })
                this.closeDialog()
                this.props.onRefresh()
            })
            .catch(reason => this.props.onHandleMessage({ message: reason.message }));
    }
    updateCategory() {
        const category = {
            name: this.state.name,
            _id: this.props.category._id
        };
        CategoryService
            .update(category)
            .then(() => {
                this.props
                    .onHandleMessage({ message: 'Uhhuu Category saved', type: 'success' })
                this.closeDialog()
                this.props.onRefresh()
            })
            .catch(reason => this.props.onHandleMessage({ message: reason.message }));
    }
    onChangeName(ev) {
        this.setState({ name: ev.target.value });
    }
    render() {
        return <div>
                <FormDialog
                    dialogProps={this.state.dialogProps}
                    onChangeName={this.onChangeName}
                    onCloseDialog={this.closeDialog}>
                </FormDialog>
                <Button color="primary"
                    onClick={() => this.openFormDialogCategory()}>
                    Edit
                </Button>
                <Button color="primary" 
                    onClick={() => this.openFormDialogProduct()}>
                    New Product
                </Button>
        </div>;
    }
}
export default CategoryActions