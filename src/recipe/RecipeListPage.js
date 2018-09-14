import React from "react";
import { AppWeekBar } from "../common/AppWeekBar";
import RecipeService from './RecipeService';
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import UtilCollectionService from "../service/UtilCollectionService";
import { RecipeListComponent } from "./RecipeListComponent";

class RecipeListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        }
        this.onSelectRecipe = this.onSelectRecipe.bind(this);
    }
    componentDidMount = () => {
        RecipeService.get('recipe')
            .then(response => {
                this.setState({
                    recipes: response
                });
            })
            .catch(reason => { console.error(reason) });
    }
    onSelectRecipe(selected) {
        const item = {
            recipe: UtilCollectionService.recipeToAdd(selected.recipe),
            checked: selected.checked
        };
        this.props
            .callbackIncludeRecipe(item);
    }
    render() {
        return (
            <div >
                <AppWeekBar title='Recipe List'></AppWeekBar>
                <Button style={styles.buttons}
                    color="secondary" 
                    variant="outlined" 
                    onClick={() => this.props.history.goBack()}>
                    Add
                </Button>
                <RecipeListComponent
                    recipes={this.state.recipes}
                    onSelectRecipe={this.onSelectRecipe}
                    parentComponent="RecipeListPage">
                </RecipeListComponent>
            </div>
        );
    }
}
const styles = {
    buttons : {
        margin: '10px'
    }
}

RecipeListPage.propTypes = {
    callbackIncludeRecipe: PropTypes.func
}

export default RecipeListPage;