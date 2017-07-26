import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppWeekBar} from "../../common/AppWeekBar";
import RecipeForm from './RecipeForm';
import ApiService from '../../service/ApiService'

class RecipeComponent extends React.Component {

    //React's constructor is called before DOM is mounted.
    constructor(props) {
        super(props);

        this.state = {
            recipe: {
                recipeId: props.recipeId
            }
        }
    }

    componentDidMount() {

        if(this.state.recipe.recipeId) {

            ApiService.get('recipe/'+this.state.recipe.recipeId)
             .then(response => {
                    this.setState({
                        recipe: response.data
                    });
                })
                .catch(reason => {console.error(reason)});    
        } 

    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppWeekBar title='Recipe'></AppWeekBar>
                    <RecipeForm {...this.state.recipe}></RecipeForm>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default RecipeComponent