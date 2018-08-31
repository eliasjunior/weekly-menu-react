import React from 'react';
import Button from '@material-ui/core/Button';

function FormChildAction(props) {
    const styles = {
        buttonSave: {
            marginRight: '10px'
        }
    }
    const isUpdateOrSave = (isToUpdate) => {
        if (isToUpdate) {
            return <Button style={styles.buttonSave} variant="contained" color="primary"
                onClick={props.updateAction}>
                Update
                </Button>
        } else {
            return <Button style={styles.buttonSave} variant="contained" color="primary"
                onClick={props.saveAction}>
                Save
                </Button>
        }
    }
    const backButton = () => {
        return props.returnBack ?
            <Button variant="contained" color="secondary"
                onClick={() => props.returnBack()}>
                Back
            </Button>
            : '';
    }
    return (
        <div style={props.box}>
            {isUpdateOrSave(props.isToUpdate)}
            {backButton()}
        </div>
    )
}

export default FormChildAction;