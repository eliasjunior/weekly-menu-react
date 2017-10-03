import React from 'react';

class MessageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: props.message,
            type: props.type
        }
    }

    getMessageContent(isMessage) {
        if(isMessage) {
            return <h1>{this.state.message}</h1>
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