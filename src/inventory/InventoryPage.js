import React from 'react';
import CategoryList from './CategoryList';
import ApiService from '../service/ApiService';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppWeekBar} from '../common/AppWeekBar';

class InventoryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories : [],
            message: '',
            location: props.location.pathname
        }
    }
    componentDidMount() {
        ApiService
            .get('category')
            .then( categories => this.setState(() => ({categories})))
            .catch( reason => this.setState({message: reason}));
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppWeekBar title="Product List"></AppWeekBar>
                    <CategoryList 
                        list={this.state.categories} 
                        location={this.state.location}>
                    </CategoryList>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default InventoryComponent 