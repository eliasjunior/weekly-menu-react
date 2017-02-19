import React from 'react';
import {AppWeekBar} from '../../common/AppWeekBar';
import ApiService from '../../service/ApiService';
import {RecipeList} from '../RecipeList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class MenuComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recipeItemList : []
        }
    }

    componentDidMount() {

        ApiService.get('recipe/week')
            .then(docs => {

                this.setState({recipeItemList:  docs.data});

            }).catch(reason => {console.error(reason)});
    }

    render() {

        return(
            <MuiThemeProvider>
                <div>
                    <AppWeekBar></AppWeekBar>
                    <RecipeList recipeList={this.state.recipeItemList} type="recipe_menu" />
                </div>
            </MuiThemeProvider>
        )
    }
}

export default MenuComponent;