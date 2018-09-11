import React from 'react';
import { ListItemText, ListItem } from '@material-ui/core';
import { cyan } from '@material-ui/core/colors';

class ProductText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
        this.onItemCompleted = this.onItemCompleted.bind(this);
    }
    onItemCompleted() {
        this.setState({ completed: !this.state.completed })
    }
    render() {
        const displayText = () => {
            return this.state.recName ?
                <ListItemText style={this.state.completed ? styles.completed : styles.notCompleted}
                    primary={this.state.name}
                    secondary={`Recipe: ${this.state.recName}`}>
                </ListItemText>
                :
                <ListItemText style={this.state.completed ? styles.completed : styles.notCompleted}
                    primary={this.state.name}>
                </ListItemText>
        }

        return (
            <div>
                <ListItem dense={this.state.completed}
                    button onClick={this.onItemCompleted}
                    style={!this.state.completed ? styles.rowNotCompleted : styles.rowCompleted}>
                    {displayText()}
                </ListItem>
            </div>
        )
    }
}

const styles = {
    completed: {
        textDecoration: 'line-through',
        textDecorationColor: '#E18728'
    },
    notCompleted: {
        textDecoration: 'none',
        textDecorationColor: '#E18728'
    },
    rowNotCompleted: {
        backgroundColor: cyan[200]
    },
    rowCompleted: {
        backgroundColor: 'white'
    }
}

export default ProductText;