import React from 'react';
import {CategoryList} from './CategoryList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppWeekBar} from '../common/AppWeekBar';
import ApiService from '../service/ApiService';


class ShoppingListComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listCategories : []
        }
    }

    componentDidMount() {
        ApiService.get('category/week/shopping')
            .then((response)=> {

                console.log("****", response.data)

                this.setState({
                    listCategories: response.data
                });

            }).catch(reason => {console.error(reason)});
    }

    render() {
        return(
            <MuiThemeProvider>
                <div>
                    <AppWeekBar title="Shopping List"></AppWeekBar>
                    <CategoryList list={this.state.listCategories} ></CategoryList>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default ShoppingListComponent 