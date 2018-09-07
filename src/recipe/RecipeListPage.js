import React from "react";
import { AppWeekBar } from "../common/AppWeekBar";
import RecipeService from './RecipeService';
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import SelectionCollectionService from "../service/SelectionCollectionService";
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
        console.log('***', selected);
        const item = {
            recipe: SelectionCollectionService.recipeToAdd(selected.recipe),
            checked: selected.checked
        };
        this.props
            .callbackIncludeRecipe(item);
    }
    render() {
        return (
            <div>
                <AppWeekBar title='Recipe List'></AppWeekBar>
                <Button variant="outlined" onClick={() => this.props.history.goBack()}>
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

RecipeListPage.propTypes = {
    callbackIncludeRecipe: PropTypes.func
}

export default RecipeListPage;