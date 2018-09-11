import React from 'react';
import { SnackbarContent, Snackbar } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

function SnackMessage(props) {
    const Icon = props.icon;
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={props.open}
            autoHideDuration={6000}
            onClose={props.onClose}>
            <SnackbarContent
                aria-describedby="client-snackbar"
                style={props.styles.snackContent}
                message={
                    <span id="client-snackbar" style={styles.message}>
                        <Icon style={styles.icon} />
                        {props.message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={props.onClose}>
                        <CloseIcon />
                    </IconButton>,
                ]}
            ></SnackbarContent>
        </Snackbar>
    )
}

const styles = {
    message: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        paddingRight: '5px'
    }
}

export default SnackMessage;