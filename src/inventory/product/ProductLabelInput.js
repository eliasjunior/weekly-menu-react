import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';

export const ProductLabelInput = (props) => {
    const getEventChange = (e) => {
        props.onChangeName(e.target.value)
    }
    const displayNameOrInput = () => {
        return props.editFieldMode ? 
            <TextField onChange={getEventChange} 
                defaultValue={props.productName} /> :
            <ListItemText inset={props.inset} primary={props.productName} />
    }
    return (<div>{displayNameOrInput()}</div>)
}   