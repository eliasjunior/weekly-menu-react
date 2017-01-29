import React from 'react';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import AppWeekBar from '../commons/AppWeekBar';
import ApiService from '../service/ApiService';

class MenuList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recipeItemList : []
        }
    }

    componentDidMount() {
        //console.log("What;s it ?", ApiService.get())

        ApiService.get('recipe')
            .then(docs => {

                let data = docs.data.filter(recipe => recipe.isInMenuWeek === true);

                data = this.sortList(data);

                //console.log("Sorted ", data)

                let elements = data.map((recipe, index) => {
                    return <ListItem key={index} secondaryText={recipe.weekDay}>{recipe.name}</ListItem>
                })

                this.setState({recipeItemList: elements});
            });
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
            return -1
            //show first, if you want to show latest need to be bigger then 7 of the list
        } else {
            return dayValue[weekDay];
        }
    }

    render() {

        return(
            <div>
                <AppWeekBar></AppWeekBar>
                <List>
                    {this.state.recipeItemList}
                </List>
            </div>
        )
    }

}

export default MenuList;