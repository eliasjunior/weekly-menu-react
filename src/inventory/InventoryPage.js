import React from 'react';
import CategoryList from './category/category-list/components';
import { AppWeekBar } from '../common/AppWeekBar';
import CategoryService from './category/CategoryService';
import FormDialog from './FormDialog';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import CommmonStyles from '../styles/CommonStyles';
import AddIcon from '@material-ui/icons/Add'

class InventoryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            dialogProps: {
                open: false,
                isUpdate: false,
                form: {
                    placeHolder: 'Category name',
                }
            },
            name: ''
        }
        this.refresh = this.refresh.bind(this)
        this.onChangeName = this.onChangeName.bind(this);
        this.saveCategory = this.saveCategory.bind(this)
        this.openFormDialogCategory = this.openFormDialogCategory.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
    }
    componentDidMount() {
        request.call(this)
    }
    refresh() {
        request.call(this)
    }
    openFormDialogCategory() {
        const dialogProps = { ...this.state.dialogProps }
        dialogProps.title = 'Create Category'
        dialogProps.open = true;
        dialogProps.form.value = this.state.name
        dialogProps.onActionMethod = this.saveCategory
        this.setState({ dialogProps })
    }
    onChangeName(ev) {
        this.setState({ name: ev.target.value });
    }
    saveCategory() {
        const category = {
            name: this.state.name
        }
        CategoryService
            .save(category)
            .then(() => {
                this.props.onHandleMessage({ message: 'Uhhuu Category saved', type: 'success' })
                this.closeDialog()
                this.refresh()
            })
            .catch(reason => this.props.onHandleMessage({ message: reason.message }));

    }
    closeDialog() {
        const dialogProps = {...this.state.dialogProps};
        dialogProps.open = false;
        this.setState({ dialogProps })
    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <AppWeekBar title="Product List"></AppWeekBar>
                <CategoryList
                    list={this.state.categories}
                    parentComponent="InventoryPage"
                    onHandleMessage={this.props.onHandleMessage}
                    onRefresh={this.refresh}>
                </CategoryList>
                <Button color="primary"
                    variant="fab" className={classes.floatingBtn}
                    onClick={this.openFormDialogCategory}>
                    <AddIcon />
                </Button>
                <FormDialog
                    dialogProps={this.state.dialogProps}
                    onChangeName={this.onChangeName}
                    onCloseDialog={this.closeDialog}>
                </FormDialog>
            </div>
        );
    }
}
function request() {
    CategoryService
        .get()
        .then(categories => this.setState(() => ({ categories })))
        .catch(reason => this.setState({ message: reason }));
}
export default withStyles(CommmonStyles)(InventoryComponent)