import React from "react";
import {AppWeekBar} from "../common/AppWeekBar";
import ApiService from "../service/ApiService";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RecipeList} from './RecipeList'


class RecipeListComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recipeList: []
        }
    }

    componentDidMount = ()=> {
        ApiService.get('recipe')
            .then(response => {
                this.setState({
                    recipeList: response.data
                });
            })
            .catch(reason => {console.error(reason)});
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppWeekBar title='Recipe List'></AppWeekBar>
                    <RecipeList recipeList={this.state.recipeList} type="recipe_list"/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default RecipeListComponent;