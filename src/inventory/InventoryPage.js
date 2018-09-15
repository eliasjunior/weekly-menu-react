import React from 'react';
import CategoryList from './category/CategoryList';
import { AppWeekBar } from '../common/AppWeekBar';
import CategoryService from './category/CategoryService';

class InventoryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
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
                    parentComponent="InventoryPage"
                    onHandleMessage={this.props.onHandleMessage}>
                </CategoryList>
            </div>
        );
    }
}
export default InventoryComponent 