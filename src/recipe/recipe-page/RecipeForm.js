/**
 * Created by eliasmj on 30/03/2017.
 */
import React from 'react';
import TextField from "material-ui/TextField";
import {RadioButton, RadioButtonGroup} from 'material-ui';
import Util from '../../common/Util';
import RaisedButton from 'material-ui/RaisedButton';
import ApiService from '../../service/ApiService';

const styleForm = {
    paddingLeft: 20,
    paddingRight: 20
};

const getRecipe = (prevRecipe, options) => {
    return {
        recipe : {
            name: options.name || prevRecipe.name,
            description: options.description || prevRecipe.description,
            meal: options.meal || prevRecipe.meal
        }
    }
}

class RecipeForm extends React.Component {
    constructor(props) {
        super(props);

        let data = {
            recipe: {
                name: null,
                description: null,
                meal: null
            },
            formSaveCallback: props.formSaveCallback
        };

        if(props && props.name) {
            data = props;
        } 

        this.state = data;

        this.mealList = Util.getMainMealList();

        //this.updateRadio = this.updateRadio.bind(this);
        //this.updateName = this.updateName.bind(this);
    }

    saveRecipe() {
        if(!this.state.recipe.name) {
            this.state.formSaveCallback('Name cannot be empty');
            return
        }

        ApiService.post('recipe', this.state.recipe)
            .then(() => {
                this.state.formSaveCallback({message: 'Successfully saved!', type: 'S'});

            }).catch(reason => {
                this.state.formSaveCallback(reason.message)
            });
    }

    updateRadio(e) {
        this.setState({meal: e.currentTarget.value})
    }
    updateName(e) {
        //console.log('desc', this.state.recipe)
        const options =  {name: e.currentTarget.value};
        this.setState((prevState, props) => {
            return getRecipe(prevState.recipe, options);
        });
    }
    updateDescription(e) {
        //console.log('desc', this.state.recipe)
        const options =  {description: e.currentTarget.value};
        this.setState((prevState, props) => {
            return getRecipe(prevState.recipe, options);
        });
    }

    render () {
        return (
            <div style={styleForm}>
                <h1>{this.state.recipe.name}</h1>
                <TextField style={{display: 'block'}}
                    onChange={this.updateName.bind(this)}
                    hintText='Name' defaultValue={this.state.recipe.name} />
                <TextField hintText={'Description'} onChange={this.updateDescription.bind(this)}
                    defaultValue={this.state.recipe.description} />
                <RadioButtonGroup 
                    valueSelected={this.state.meal}
                    name='Recipe Type' onChange={this.updateRadio.bind(this)} >
                    {this.mealList.map( (meal, index) => {
                        return <RadioButton key={index} 
                                value={meal.name()} label={meal.label()}/>
                        }) 
                    }
                </RadioButtonGroup>
                <RaisedButton label="Save" secondary={true} onClick={this.saveRecipe.bind(this)} />
            </div>
        );
    }
}

export default RecipeForm;