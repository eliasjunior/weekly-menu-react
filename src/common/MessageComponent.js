import React from 'react';

const msgStyle = {
    paddingLeft: 20,
    margin: '5px',
    color: 'white',
    border: '1px solid pink',
    backgroundColor: '#f591b3',
    fontWeight: 400,
    fontSize: 24
};
const msgStyleSuccess = {
    paddingLeft: 20,
    margin: '5px',
    color: 'white',
    border: '1px solid pink',
    fontWeight: 400,
    backgroundColor: 'rgba(0, 150, 136, 0.57)',
    fontSize: 24
};

class MessageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: props.message,
            type: props.type
        }
    }

    getMessageContent(message) {
        if(message) {
            //TODO review here, clean this code
            if(message && message.type === 'S') {
                return <div style={msgStyleSuccess}>{message.message}</div>
            }

            return <div style={msgStyle}>{message}</div>
        } else {
            return null;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({message: nextProps.message})
    }

    render() {
        return(
            <div>{this.getMessageContent(this.state.message)}</div>
        )
    }
}


export default MessageComponent