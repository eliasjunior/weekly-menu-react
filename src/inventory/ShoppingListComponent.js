import React from 'react';
import {CategoryList} from './CategoryList';

class ShoppingListComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listCategories : []
        }
    }

    componentDidMount() {
        this.setState({listCategories:  [{name: 'test'}, {name: 'test 2'}]});

    }

    render() {
        return (
            <CategoryList list={this.state.listCategories} ></CategoryList>
        );
    }
}

export default ShoppingListComponent 