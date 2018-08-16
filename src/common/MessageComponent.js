import React from 'react';

const styles = {
    msgStyle: {
        paddingLeft: 20,
        margin: '5px',
        color: 'white',
        border: '1px solid pink',
        backgroundColor: '#f591b3',
        fontWeight: 400,
        fontSize: 24
    },
    msgStyleSuccess: {
        paddingLeft: 20,
        margin: '5px',
        color: 'white',
        border: '1px solid pink',
        fontWeight: 400,
        backgroundColor: 'rgba(0, 150, 136, 0.57)',
        fontSize: 24
    },
    // TO CONTINUE
    fade: {
        opacity: 1,
        transition: 'opacity .25s ease-in-out',
        '-moz-transition': 'opacity .25s ease-in-out',
        '-webkit-transition': 'opacity .25s ease-in-out'
    }
};

const messageToDisplay = (message) => {
    return {
        basicErrorMessage: <div style={styles.msgStyle}>{message}</div>,
        successMessage: <div style={styles.msgStyleSuccess}>{message}</div>
    }
}

class MessageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: props.message,
            type: props.type
        }
    }
    manageMessage(alert) {
        if(!alert) {
            return null
        } else if(typeof alert === 'string') {
            return this.getMessage(alert);
        } else {
            return this.getMessageObj(alert);
        }
    }
    getMessage(alert) {
        return messageToDisplay(alert).basicErrorMessage;
    }

    getMessageObj(alert) {
        if(alert.type === 'S') {
            return messageToDisplay(alert.message).successMessage
        } else {
            return messageToDisplay(alert).basicErrorMessage;
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({message: nextProps.message})
    }
    render() {
        return(
            <div>{this.manageMessage(this.state.message)}</div>
        )
    }
}


export default MessageComponent