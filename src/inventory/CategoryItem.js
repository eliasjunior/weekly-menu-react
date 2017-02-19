import React from 'react';
import ListItem from 'material-ui/List/ListItem';
import CatIcon from 'material-ui/svg-icons/image/view-comfy';
import {indigo600} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox'

export const CategoryItem = (props) => {

    const listItem = (ingredients) => {

        console.log(">>>", ingredients)

        return ingredients.map((ingredient) => {
            return <ListItem key={ingredient._id} primaryText={ingredient.name}
                             leftCheckbox={<Checkbox />} />
        })

    }

    return  <ListItem
                key={props.id}
                initiallyOpen={true}
                primaryText={props.name}
                leftIcon={<CatIcon color={indigo600}></CatIcon>}
                primaryTogglesNestedList={true} nestedItems={listItem(props.ingredients)}>

            </ListItem>
}