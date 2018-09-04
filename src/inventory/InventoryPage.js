import React from 'react';
import CategoryList from './category/CategoryList';
import { AppWeekBar } from '../common/AppWeekBar';
import CategoryService from './category/CategoryService';

class InventoryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            message: '',
            location: props.location.pathname
        }
    }
    componentDidMount() {
        CategoryService
            .get()
            .then(categories => this.setState(() => ({ categories })))
            .catch(reason => this.setState({ message: reason }));
    }
    render() {
        return (
            <div>
                <AppWeekBar title="Product List"></AppWeekBar>
                <CategoryList
                    list={this.state.categories}
                    location={this.state.location}>
                </CategoryList>
            </div>
        );
    }
}
export default InventoryComponent 