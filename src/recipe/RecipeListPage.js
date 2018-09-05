import React from "react";
import { AppWeekBar } from "../common/AppWeekBar";
import RecipeService from './RecipeService';
import { CategoryList } from "../inventory/category/CategoryList";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AppConstant } from '../common/AppConstant';

class RecipeListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        }
        this.selectedProd = this.selectedProd.bind(this);
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
    selectedProd(selected) {
        console.log(selected)
    }
    buildRecipeList() {
        // TODO style here
        return this.state.recipes.map((recipe, index) => {
            return (
                <div key={index} style={{ marginLeft: '5px' }}>
                    <div style={{ background: '#70ed416b' }}>
                        <Button variant="outlined" >
                            <Link to={`${AppConstant.PATH.NEW_RECIPE}/${recipe._id}`}>{recipe.name}</Link>
                        </Button>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <CategoryList
                            list={recipe.categories}
                            parentComponent="RecipeListPage"
                            onSelectedProd={this.selectedProd}>
                        </CategoryList>
                    </div>
                </div>)
        });
    }
    render() {
        return (
            <div>
                <AppWeekBar title='Recipe List'></AppWeekBar>
                {this.buildRecipeList()}
            </div>
        );
    }
}

export default RecipeListPage;