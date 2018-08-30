import React from "react";
import {AppWeekBar} from "../common/AppWeekBar";
import ApiService from "../service/ApiService";

import {RecipeList} from './RecipeList'

class RecipeListPage extends React.Component {
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
                    recipeList: response
                });
            })
            .catch(reason => {console.error(reason)});
    }
    render() {
        return (
                <div>
                    <AppWeekBar title='Recipe List'></AppWeekBar>
                    <RecipeList recipeList={this.state.recipeList} type="recipe_list"/>
                </div>
        );
    }
}

export default RecipeListPage;