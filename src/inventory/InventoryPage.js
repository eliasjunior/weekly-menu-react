import React from 'react';
import CategoryList from './CategoryList';
import ApiService from '../service/ApiService';
import { AppWeekBar } from '../common/AppWeekBar';

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
        ApiService
            .get('v2/category')
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