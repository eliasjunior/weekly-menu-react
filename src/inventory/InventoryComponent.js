import React from 'react';
import {CategoryList} from './CategoryList';
import ApiService from '../service/ApiService';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppWeekBar} from '../common/AppWeekBar';

class InventoryComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list : []
        }
    }

    componentDidMount() {
        ApiService.get('category')
            .then( list => {
                console.log('cats', list.data);

                this.setState({list: list.data});

            }).catch( reason => console.log('Oops failed', reason));
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppWeekBar title="Product List"></AppWeekBar>
                    <CategoryList list={this.state.list} />
                </div>
            </MuiThemeProvider>
           
        );
    }
}

export default InventoryComponent 