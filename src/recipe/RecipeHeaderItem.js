import React from 'react';
import { Link } from "react-router-dom";
import { AppConstant } from '../common/AppConstant';
import { Button, ListItem, Checkbox, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import PropTypes from 'prop-types';
import {grey} from '@material-ui/core/colors';

export const RecipeHeaderItem = (props) => {
    const onCheckAction = (e) => {
        props.recipe.checked = e.target.checked;
        const itemProps = {
            checked: props.recipe.checked,
            recipe: props.recipe
        };
        props.onSelectRecipe(itemProps);
    }

    // TODO do like in category, add to a service
    const isCheckboxDisplay = () => {
        if (props.isRecipeNotSelectable) {
            return ''
        } else {
            return <Checkbox checked={props.recipe.checked}
                onClick={onCheckAction}
                value={props.recipe._id}>
            </Checkbox>
        }
    }
    // TODO do like in category, add to a service
    const isEditBtnDisplay = () => {
        if (props.isNotEditable) {
            return ''
        } else {
            return <ListItemSecondaryAction >
                <Button variant="outlined" color="primary">
                    <Link to={`${AppConstant.LOCATION.newRecipe.path}/${props.recipe._id}`}>
                        EDIT
                    </Link>
                </Button>
            </ListItemSecondaryAction>
        }
    }

    return ( 
        <ListItem 
            style={{backgroundColor:grey[400]}}>
            {isCheckboxDisplay()}
            <ListItemText primary={props.recipe.name} />
            {isEditBtnDisplay()}
        </ListItem>
    )
}

RecipeHeaderItem.propTypes = {
    recipe: PropTypes.object,
    isNotEditable: PropTypes.bool,
    isRecipeNotSelectable: PropTypes.bool,
    onSelectRecipe: PropTypes.func
}