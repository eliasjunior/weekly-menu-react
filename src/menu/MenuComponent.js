import React from 'react';
import {AppWeekBar} from '../commons/AppWeekBar';
import ApiService from '../service/ApiService';
import {RecipeList} from '../recipe/RecipeList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class MenuComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recipeItemList : []
        }
    }

    componentDidMount() {

        ApiService.get('recipe')
            .then(docs => {

                let data = docs.data.filter(recipe => recipe.isInMenuWeek === true);
                this.setState({recipeItemList: this.sortList(data)});

            }).catch(reason => {console.error(reason)});
    }

    sortList(recipes) {
        const that = this;
        //console.log("t*** ", recipes)

        //sort by week day
        let result = recipes.sort(function(a, b){

            if(that.getDayValue(a.weekDay) < that.getDayValue(b.weekDay)) {
                return -1
            }

            if(that.getDayValue(a.weekDay) > that.getDayValue(b.weekDay)) {
                return 1
            }
            return 0;
        });

        return result;
    }

    getDayValue(weekDay) {
        let dayValue = { "Sunday" : 0, "Monday" : 1, "Tuesday" : 2, "Wednesday" : 3,
            "Thursday" : 4, "Friday" : 5, "Saturday": 6};

        if(!weekDay) {
            return -1;
            //show first, if you want to show latest need to be bigger then 7 of the list
        } else {
            return dayValue[weekDay];
        }
    }

    render() {

        return(
            <MuiThemeProvider>
                <div>
                    <AppWeekBar></AppWeekBar>
                    <RecipeList recipeList={this.state.recipeItemList} type="recipe_menu" />
                </div>
            </MuiThemeProvider>
        )
    }

}

export default MenuComponent;