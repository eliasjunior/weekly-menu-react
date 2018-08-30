import React from 'react';

const styles = {
    msg: {
        paddingLeft: 20,
        margin: '5px',
        color: 'white',
        border: '1px solid pink',
        fontWeight: 400,
        fontSize: 24
    },
    error: {
        backgroundColor: '#f591b3',
    },
    success: {
        backgroundColor: 'rgba(0, 150, 136, 0.57)',
    },
    // TO CONTINUE
    fade: {
        opacity: 1,
        transition: 'opacity .25s ease-in-out',
        '-moz-transition': 'opacity .25s ease-in-out',
        '-webkit-transition': 'opacity .25s ease-in-out'
    }
};

const MESSAGE_TYPE = {
    SUCCESS_TYPE: 'S'
}
// TODO need remove the message
function MessageComponent(props) {
    const manageMessage = () => {
        let alert = props.message;
        if (!alert) {
            return null;
        }

        if (typeof alert === 'string') {
            const msgError = Object.assign({}, styles.msg, styles.error);
            return <div style={msgError}>{alert}</div>

        } else {
            const msgStyle = alert.type === MESSAGE_TYPE.SUCCESS_TYPE ? styles.success : styles.error;
            const msg = Object.assign({}, styles.msg, msgStyle);

            return <div style={msg}>{alert.message}</div>
        }
    }
    return (<div>{manageMessage()}</div>)
}
export default MessageComponent