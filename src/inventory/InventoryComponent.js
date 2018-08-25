import React from 'react';
import {CategoryList} from './CategoryList';
import ApiService from '../service/ApiService';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppWeekBar} from '../common/AppWeekBar';

class InventoryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCategories : [],
            message: '',
            location: props.location.pathname
        }
    }
    componentDidMount() {
        ApiService
            .get('category')
            .then( categories => {
                // TODO add callback, better practice, certain update
                this.setState({listCategories: categories})
            })
            .catch( reason => this.setState({message: reason}));
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppWeekBar title="Product List"></AppWeekBar>
                    <CategoryList 
                        list={this.state.listCategories} 
                        location={this.state.location}>
                    </CategoryList>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default InventoryComponent 