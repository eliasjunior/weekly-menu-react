import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';

export const EditableLabel = (props) => {
    const getEventChange = (e) => {
        props.onChangeName(e.target.value)
    }
    const displayNameOrInput = () => {
        const {name, secondaryLabel} = props;
        return props.editFieldMode ? 
            <TextField onChange={getEventChange} 
                defaultValue={props.inputValue}>
            </TextField> :
            <ListItemText 
                primary={name}
                secondary={secondaryLabel}>
            </ListItemText>
    }
    return (<div style={props.style}>{displayNameOrInput()}</div>)
}   