import React from 'react';
import {AppWeekBar} from '../../common/AppWeekBar';
import ApiService from '../../service/ApiService';
import {RecipeList} from '../RecipeList';

class MenuPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipeItemList : []
        }
    }
    componentDidMount() {
        ApiService.get('recipe/week')
            .then(docs => {
                this.setState({recipeItemList:  docs});
            }).catch(reason => {console.error(reason)});
    }
    render() {
        return(
                <div>
                    <AppWeekBar title="Menu"></AppWeekBar>
                    <RecipeList recipeList={this.state.recipeItemList} type="recipe_menu" />
                </div>
        )
    }
}
export default MenuPage;