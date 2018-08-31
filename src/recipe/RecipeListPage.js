import React from "react";
import { AppWeekBar } from "../common/AppWeekBar";
import RecipeService from './RecipeService';
import { CategoryList } from "../inventory/category/CategoryList";

class RecipeListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        }
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
    render() {
        return (
            <div>
                <AppWeekBar title='Recipe List'></AppWeekBar>
                <CategoryList
                    list={this.state.recipes}
                    location={this.state.location}>
                </CategoryList>
            </div>
        );
    }
}

export default RecipeListPage;