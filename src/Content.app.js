import React from 'react';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import AppWeekBar from './AppWeekBap';
import axios from 'axios';


class ContentApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recipeItemList : []
        }
    }

    componentDidMount() {

        const url = 'https://week-menu-api.herokuapp.com/recipe';
        //const url = 'http://localhost:3002/recipe';

        axios.get(url)
            .then(docs => {


                let data = docs.data.filter(recipe => recipe.isInMenuWeek === true);

                console.log("Filtered ", data)
                data = this.sortList(data);

                console.log("Sorted ", data)

                let elements = data.map((recipe, index) => {
                    return <ListItem key={index} secondaryText={recipe.weekDay}>{recipe.name}</ListItem>
                })

                this.setState({recipeItemList: elements});
            });
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
}

export default ContentApp;