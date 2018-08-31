import React from 'react';
import TextField from "material-ui/TextField";
import FormChildAction from '../../common/FormChildAction';

const styles = {
    box: {
        margin: '10px'
    },
    actionBtn: {
        marginTop: '10px'
    }
}
class RecipeForm extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.updateRecipe = this.updateRecipe.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
    }

    saveRecipe() {
    
    }
    render () {
        return (
            <div>
                <form style={styles.box}>
                    <TextField
                        defaultValue={this.state.name}
                        label="Recipe name"
                        onChange={this.onChangeName}>
                    </TextField>
                    <FormChildAction
                        box={styles.actionBtn}
                        isToUpdate={!isNewCategory(this.props.name)}
                        updateAction={this.updateRecipe}
                        saveAction={this.saveRecipe}
                        returnBack={this.props.returnRecipe}>
                    </FormChildAction>
                </form>
            </div>
        );
    }
}

export default RecipeForm;