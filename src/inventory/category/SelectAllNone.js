import React from 'react';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

function SelectAllNone(props) {
    const label = props.checked ? 'Unselect All' : 'Select All'
    return (
        <div style={styles.content}>
            <FormGroup row >
                <FormControlLabel
                    control={<Switch checked={props.checked}
                        onChange={() => props.onSelectAllNone()}
                        value={label}></Switch>}
                    label={label}>
                </FormControlLabel>
            </FormGroup>
        </div>
    )
}
const styles = {
    content: {
        marginLeft: '10px'
    }
}

export default SelectAllNone;