import React from 'react';
import { ListItemText, ListItem, Divider, ListItemSecondaryAction, Button } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import ShoppingListService from './ShoppingListService'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import {green, red} from '@material-ui/core/colors'
class ProductText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
        this.setComplete = this.setComplete.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.update = this.update.bind(this);
    }
    setComplete() {
        const shoppingListData = { ...this.state };
        shoppingListData.completed = !this.state.completed;
        this.setState({ completed: !this.state.completed });
        this.update(shoppingListData)
    }
    increment() {
        const shopList = {...this.state}
        shopList.quantity = this.state.quantity + 1
        this.setState({ quantity: this.state.quantity + 1 })
        this.update(shopList)
    }
    decrement() {
        const shopList = {...this.state}
        shopList.quantity = this.state.quantity - 1
        this.setState({ quantity: this.state.quantity - 1 })
        this.update(shopList)
    }
    update(shoppingListData) {
        ShoppingListService
            .updateItem(shoppingListData)
            .then(doc => {
                console.log('updated stuffs', doc)
            }).catch(reason => this.props.onHandleMessage({ message: reason.message }));
    }
    render() {
        return (
            <div>
                <ListItem dense={this.state.completed}
                    button  
                    style={!this.state.completed ? styles.rowNotCompleted : styles.rowCompleted}>
                    <ListItemText onClick={this.setComplete}
                        style={this.state.completed ? styles.completed : styles.notCompleted}
                        primary={this.state.name}
                        secondary={this.state.recName ? `Recipe: ${this.state.recName}` : ''}>
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <Add onClick={this.increment} style={{color: green[400]}} />
                        <Button> {this.state.quantity}</Button>
                        <Remove onClick={this.decrement} style={{color: red[400]}} />
                    </ListItemSecondaryAction>
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