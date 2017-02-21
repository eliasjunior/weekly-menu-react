import React from 'react';
import ListItem from 'material-ui/List/ListItem';
import CatIcon from 'material-ui/svg-icons/image/view-comfy';
import {indigo600} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import Util from '../common/Util';


class CategoryItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formatted: '',
            nested: []
        }
    }

    setLastCheck  = (ingredient, event, isInputChecked) => {

        if(isInputChecked) {

            let temp = this.state.nested;

            temp[ingredient._id] = Util.getCurrentDate()

            this.setState({
                formatted: Util.getCurrentDate(),
                nested: temp
            });

        }
    }

    test =(ingredient, event)=>{
        console.log("event", event)
        console.log("ggg", ingredient)
    }

    getChildren = (ingredients) => {

        return ingredients.map((ingredient) => {
            return <ListItem key={ingredient._id}
                             primaryText={ingredient.name}
                             secondaryText={this.state.nested[ingredient._id]}
                             leftCheckbox={<Checkbox   onCheck={this.setLastCheck.bind(this, ingredient)} />}
            />
        })

    }

    render() {
        return  (
                <ListItem
                    key={this.props.id}
                    initiallyOpen={true}
                    primaryText={this.props.name}
                    leftIcon={<CatIcon color={indigo600}></CatIcon>}
                    primaryTogglesNestedList={true}
                    nestedItems={this.getChildren(this.props.ingredients)}>

                </ListItem>
            )
    }
}
export default CategoryItem;