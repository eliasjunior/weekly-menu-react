import React from "react";
import AppWeekBar from "../commons/AppWeekBar";
import List from "material-ui/List";
import ApiService from "../service/ApiService";
import ListItem from 'material-ui/List/ListItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class RecipeList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recipeList: []
        }
    }

    componentDidMount = ()=> {
        ApiService.get('recipe')
            .then(response => {
                let data = response.data.map((recipe, id) => {
                    
                    return <ListItem key={id} >{recipe.name}</ListItem>
                });

                this.setState({
                    recipeList: data
                });
            })
            .catch(reason => {console.error(reason)});
    }

    render() {
        return (
            <div>
                <AppWeekBar title='Recipe List'></AppWeekBar>
                <List>
                    {this.state.recipeList}
                </List>
            </div>
        );
    }
}

const RecipeListComponent = ()=> {

    return (
        <MuiThemeProvider>
            <RecipeList/>
        </MuiThemeProvider>
    );
}

export default RecipeListComponent;