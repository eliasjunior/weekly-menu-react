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
            nested: [],
            checked: []
        }
    }

    setLastCheck  = (ingredient, event, isInputChecked) => {

        if(isInputChecked) {

            let tempNested = this.state.nested;
            let checks = this.state.checked;

            tempNested[ingredient._id] = Util.getCurrentDate();
            checks[ingredient._id] = isInputChecked;

            //console.log('setLastCheck',this.state.checked)

            this.setState({
                nested: tempNested,
                checked: checks
            });

        }
    }

    getGranChildren = (attributes) => {

        //return [<ListItem primaryText="Children" />]

        return attributes.map( attribute => {
            return <ListItem key={attribute._id}
                             secondaryText={attribute.name}
            />
        });
    }

    getChildren = (ingredients) => {

        return ingredients.map((ingredient) => {
            return <ListItem key={ingredient._id}
                             primaryText={ingredient.name}
                             secondaryText={this.state.nested[ingredient._id]}
                             initiallyOpen={true}
                             nestedItems={this.getGranChildren(ingredient.attributes)}
                             leftCheckbox={<Checkbox onCheck={this.setLastCheck.bind(this, ingredient)} />}
            />
        })

    }

    getOpen = (total, checked)=> {

        let totalChecked = Object.keys(checked).length;

        console.log("checked", total , totalChecked )

        return total > totalChecked;
    }

    render() {
        return  (
                <ListItem
                    key={this.props.id}
                    open={this.getOpen(this.props.ingredients.length, this.state.checked)}
                    primaryText={this.props.name}
                    leftIcon={<CatIcon color={indigo600}></CatIcon>}
                    primaryTogglesNestedList={true}
                    nestedItems={this.getChildren(this.props.ingredients)}>

                </ListItem>
            )
    }
}
export default CategoryItem;