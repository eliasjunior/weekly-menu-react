import React from 'react';
import {CategoryList} from './CategoryList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppWeekBar} from '../common/AppWeekBar';
import ApiService from '../service/ApiService';

class ShoppingListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCategories : [],
            location: props.location.pathname
        }
    }
    componentDidMount() {
        //category/week/shopping before 
        ApiService.get('category')
            .then((categories)=> {
                this.setState({
                    listCategories: categories
                });

            }).catch(reason => {console.error(reason)});
    }

    render() {
        return(
            <MuiThemeProvider>
                <div>
                    <AppWeekBar title="Shopping List"></AppWeekBar>
                    <CategoryList 
                        list={this.state.listCategories} 
                        location={this.state.location}>
                    </CategoryList>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default ShoppingListComponent 