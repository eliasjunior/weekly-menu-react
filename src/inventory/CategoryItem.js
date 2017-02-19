import React from 'react';
import ListItem from 'material-ui/List/ListItem';
import CatIcon from 'material-ui/svg-icons/image/view-comfy';
import ProdIcon from 'material-ui/svg-icons/action/stars'
import {indigo200, purple500} from 'material-ui/styles/colors'

export const CategoryItem = (props) => {

    const listItem = (ingredients) => {

        console.log(">>>", ingredients)
        return ingredients.map((ingredient) => {
            return <ListItem key={ingredient._id} primaryText={ingredient.name}
                             leftIcon={<ProdIcon color={purple500}/>} />
        })

    }

    return  <ListItem
                key={props.id}
                initiallyOpen={true}
                primaryText={props.name}
                leftIcon={<CatIcon color={indigo200}></CatIcon>}
                primaryTogglesNestedList={true} nestedItems={listItem(props.ingredients)}>

            </ListItem>
}