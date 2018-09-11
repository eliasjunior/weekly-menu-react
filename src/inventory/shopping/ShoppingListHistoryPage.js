import React from 'react';
import { List, ListItem, ListItemText, Button, ListItemSecondaryAction } from '@material-ui/core';
import ShoppingListService from './ShoppingListService';
import MessageComponent from '../../common/MessageComponent';
import { AppWeekBar } from '../../common/AppWeekBar';
import { AppConstant } from '../../common/AppConstant';
import { Link } from 'react-router-dom';

class ShoppingListHistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            list: []
        }
    }
    componentDidMount() {
        ShoppingListService
            .get()
            .then(response => {
                this.setState({ list: response })
            })
            .catch(reason => this.setState({ message: reason.message }));
    }
    render() {
        return (
            <div>
                <AppWeekBar title="Shopping history"></AppWeekBar>
                <MessageComponent message={this.state.message}></MessageComponent>
                <List>
                    {this.state.list.map(item => {
                        return <ListItem key={item._id}>
                            <Button color="primary">
                                <Link to={`${AppConstant.LOCATION.shopping.path}`}
                                    onClick={() => this.props.selectedShopList(item)}>
                                    {item.name}
                                </Link>
                            </Button>
                            <ListItemSecondaryAction>
                                <Button color="primary">
                                    <Link to={`${AppConstant.LOCATION.editShoppingList.path}/${item._id}`}
                                        onClick={() => this.props.editShoppingList(item)}>
                                        EDIT
                                    </Link>
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    })}
                </List>
            </div>
        )
    }
}

export default ShoppingListHistoryPage;