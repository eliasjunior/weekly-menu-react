import React from 'react';
import { CrudActions } from '../common/CrudActions';

export default class CategoryForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        <div>
            <form style={styles.form}>
                <TextField 
                    label="Category name"
                    onChange={this.changeProduct}>
                </TextField>
                <CrudActions></CrudActions>
            </form>     
        </div>
    }
}