import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions
} from '@material-ui/core';
import FormChildAction from '../common/FormChildAction';

function FormDialog(props) {
    return (
        <div>
            <Dialog
                open={props.dialogProps.open}
                onClose={() => props.onCloseDialog()}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.dialogProps.title}</DialogTitle>
                <DialogContent>
                    <TextField 
                        label={props.dialogProps.form.placeHolder}
                        defaultValue={props.dialogProps.form.value}
                        onChange={props.onChangeName}>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <FormChildAction
                        onActionMethod={props.dialogProps.onActionMethod}
                        isUpdate={props.dialogProps.isUpdate}
                        onCloseDialog={props.onCloseDialog}>
                    </FormChildAction>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default FormDialog;