import React from 'react';
import { ListItemText, ListItem, Divider } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import ShoppingListService from './ShoppingListService'

class ProductText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
        this.onItemCompleted = this.onItemCompleted.bind(this);
    }
    onItemCompleted() {
        const updateData = {...this.state};
        updateData.completed = !this.state.completed;
        this.setState({ completed: !this.state.completed });

        console.log('to send', updateData)
        
        ShoppingListService
            .updateItem(updateData)
            .then( doc => {
                console.log('updated stuffs', doc)
            }).catch(reason => this.props.onHandleMessage({ message: reason.message }));
    }
    render() {
        const displayText = () => {
            return this.state.recName ?
                <ListItemText 
                    style={this.state.completed ? styles.completed : styles.notCompleted}
                    primary={this.state.name}
                    secondary={`Recipe: ${this.state.recName}`}>
                </ListItemText>
                :
                <ListItemText 
                    style={this.state.completed ? styles.completed : styles.notCompleted}
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
                <Divider></Divider>
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
        backgroundColor: blue[200]
    },
    rowCompleted: {
        backgroundColor: 'white'
    }
}

export default ProductText;