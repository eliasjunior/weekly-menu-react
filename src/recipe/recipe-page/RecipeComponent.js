import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppWeekBar} from "../../common/AppWeekBar";
import RecipeForm from './RecipeForm';
import ApiService from '../../service/ApiService';
import MessageComponent from '../../common/MessageComponent';

class RecipeComponent extends React.Component {

    //React's constructor is called before DOM is mounted.
    constructor(props) {
        super(props);

        this.state = {
            recipe: {
                recipeId: props.recipeId
            },
            message: 'Initial state'
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

    calledFromMyChild(params) {
        this.setState({message: params})
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <div>{this.state.message}</div>
                    <AppWeekBar title='Recipe'></AppWeekBar>
                    <MessageComponent message={this.state.message}></MessageComponent>
                    <RecipeForm {...this.state.recipe} actionReaction={this.calledFromMyChild.bind(this)} ></RecipeForm>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default RecipeComponent