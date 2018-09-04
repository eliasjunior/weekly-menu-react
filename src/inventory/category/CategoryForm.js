import React from 'react';
import { TextField } from '@material-ui/core';
import FormChildAction from '../../common/FormChildAction';
import CategoryService from './CategoryService';

const styles = {
    box: {
        margin: '10px'
    },
    actionBtn: {
        marginTop: '10px'
    }
}
const SUCCESS_TYPE = 'S';

const isNewCategory = id => id === 'new_category_create';

export default class CategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            id: isNewCategory(props.id) ? null : props.id,
            message: null
        }
        this.saveCategory = this.saveCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
    }
    saveCategory() {
        const category = {
            name: this.state.name
        }
        CategoryService
            .save(category)
            .then(doc => {
                console.log('Category created', doc);
                // TODO improve this message, maybe the service tells the ancestor/root ?
                this.setState({
                    message: {
                        message: 'Category saved',
                        type: SUCCESS_TYPE
                    }
                });
            })
            .catch(reason => {
                this.setState({ message: reason.message });
            });
    }
    updateCategory() {
        const category = {
            name: this.state.name,
            _id: this.state.id
        };
        CategoryService
            .update(category)
            .then(() => {
                console.log('Category updated');
            })
            .catch(reason => {
                // TODO add message 
                console.error('Category updated', reason);
            });
    }
    onChangeName(e) {
        this.setState({ name: e.target.value })
    }
    render() {
        return (
            <div>
                <form style={styles.box}>
                    <TextField
                        defaultValue={this.state.name}
                        label="Category name"
                        onChange={this.onChangeName}>
                    </TextField>
                    <FormChildAction
                        box={styles.actionBtn}
                        isToUpdate={!isNewCategory(this.props.id)}
                        updateAction={this.updateCategory}
                        saveAction={this.saveCategory}
                        returnBack={this.props.returnProdList}>
                    </FormChildAction>
                </form>
            </div>
        )
    }
}