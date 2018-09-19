import React from "react";
import { AppWeekBar } from "../common/AppWeekBar";
import RecipeService from './RecipeService';
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import UtilCollectionService from "../service/UtilCollectionService";
import { RecipeListComponent } from "./RecipeListComponent";
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from '@material-ui/core/styles'
import CommonStyles from '../styles/CommonStyles'

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
        const {classes} = this.props
        return (
            <div >
                <AppWeekBar title='Recipe List'></AppWeekBar>
                <Button variant="fab" 
                    color="secondary" 
                    className={classes.floatingBtn}
                    aria-label="Add" 
                    onClick={() => this.props.history.goBack()}>
                    <AddIcon />
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

export default withStyles(CommonStyles)(RecipeListPage);
