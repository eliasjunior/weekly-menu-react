import React from "react";
import { AppWeekBar } from "../common/AppWeekBar";
import RecipeService from './RecipeService';
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import UtilCollectionService from "../service/UtilCollectionService";
import RecipeListComponent from "./RecipeListComponent";
import IncludeRecipe from '@material-ui/icons/PlaylistAdd';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles'
import CommonStyles from '../styles/CommonStyles'
import { Link } from "react-router-dom";
import { AppConstant } from "../common/AppConstant";

class RecipeListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            isFromShoppingList: props.location.search ? true : false
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
        // TODO replace this here with localApi
        const item = {
            recipe: UtilCollectionService.recipeToAdd(selected.recipe),
            checked: selected.checked
        };
        this.props
            .callbackIncludeRecipe(item);
    }
    render() {
        const { classes } = this.props
        const addButton = () => {
            return this.props.location.search ?
                <Button variant="fab"
                    color="secondary"
                    className={classes.floatingBtn}
                    aria-label="include Recipe"
                    onClick={() => this.props.history.goBack()}>
                    <IncludeRecipe />
                </Button> :
                <Button
                    variant="fab"
                    color="secondary"
                    className={classes.floatingBtn}
                    aria-label="new Recipe">
                    <Link
                        to={AppConstant.LOCATION.newRecipe.path}>
                        <AddIcon />
                    </Link>
                </Button>
        }
        return (
            <div >
                <AppWeekBar title='Recipe List'></AppWeekBar>
                {addButton()}
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
