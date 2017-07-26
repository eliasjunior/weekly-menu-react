/**
 * Created by eliasmj on 30/03/2017.
 */
import React from 'react';
import TextField from "material-ui/TextField";
import {RadioButton, RadioButtonGroup} from 'material-ui';
import Util from '../../common/Util';
import FlatButton from 'material-ui/FlatButton';
import ApiService from '../../service/ApiService';
        
class RecipeForm extends React.Component {

    constructor(props) {
        super(props);

        let recipe = {
                name: '',
                description: '',
                meal: '',
            };

        if(props && props.name) {
            recipe = props;
        } 

        this.state = recipe;

        this.mealList = Util.getMainMealList();

        //this.updateRadio = this.updateRadio.bind(this);
        //this.updateName = this.updateName.bind(this);
    }

    saveRecipe(e) {
        
        ApiService.post('recipe', this.state.recipe)
            .then(() => {
                 console.log("Saved!!")   
            }).catch((reason) => {console.error(reason)});
    }


    updateRadio(e) {
        this.setState({meal: e.currentTarget.value})
    }

    updateName(e) {
        console.log(e.currentTarget.value)

        this.setState({name: e.currentTarget.value})

        //this.setState({'name': e.currentTarget.value})
        console.log('**>', this.state)
    }
    updateDesc(e) {
        console.log(e.currentTarget.value)

        this.setState({description: e.currentTarget.value})

        //this.setState({'name': e.currentTarget.value})
        console.log('**>', this.state)
    }

    render () {
        return (
            <div>
                <TextField style={{display: 'block'}}
                    onChange={this.updateName.bind(this)}
                    hintText='Name' defaultValue={this.state.name} />
                <TextField hintText={'Description'} onChange={this.updateDesc.bind(this)}
                defaultValue={this.state.description} />    
                <RadioButtonGroup 
                    valueSelected={this.state.meal} style={{border: 'pink solid 2px'}}  
                    name='Recipe Type' onChange={this.updateRadio.bind(this)} >
                    {this.mealList.map( (meal, index) => {
                        return <RadioButton key={index} 
                                value={meal.name()} label={meal.label()}/>
                        }) 
                    }
                </RadioButtonGroup>
                <FlatButton label="Save" secondary={true} onClick={this.saveRecipe.bind(this)} />
                <h1>{this.state.meal}</h1>    
            </div>
        );
    }

}

export default RecipeForm;