import React from 'react';
import SnackMessage from './SnackMessage';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { red, green } from '@material-ui/core/colors';

class MessageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.renderMessage = this.renderMessage.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    renderMessage() {
        let message = this.props.message;
        if (!message) {
            return null;
        }
        if (this.props.type !== MESSAGE_TYPE.SUCCESS) {
            return messageAttrs.call(this, message, 
                variantIcon[MESSAGE_TYPE.ERROR], styles.error);
        } else {
            return messageAttrs.call(this, message, 
                variantIcon[MESSAGE_TYPE.SUCCESS], styles.success);
        }
    }
    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.props.onClose({open: false})
    }
    render() {
        return (<div>{this.renderMessage()}</div>)
    }
}
function messageAttrs(messageValue, iconVariant, theme) {
    return <SnackMessage 
        icon={iconVariant} 
        message={messageValue}
        onClose={this.handleClose}
        open={this.props.isOpen}
        styles={theme}
        />
}

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
}
const MESSAGE_TYPE = {
    SUCCESS: 'success',
    ERROR: 'error'
}
const styles = {
    error: {
        snackContent: {
            backgroundColor: red[400],
            margin: '5px'
        }
    },
    success: {
        snackContent: {
            backgroundColor: green[400],
            margin: '5px'
        }
    }
}
export default MessageComponent