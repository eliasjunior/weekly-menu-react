import React from 'react';
import { List, ListItem, Button, ListItemSecondaryAction } from '@material-ui/core';
import ShoppingListService from './ShoppingListService';
import { AppWeekBar } from '../../common/AppWeekBar';
import { AppConstant } from '../../common/AppConstant';
import { Link } from 'react-router-dom';

class ShoppingListHistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        ShoppingListService
            .get()
            .then(response => {
                this.setState({ list: response })
            }).catch(reason => this.props.onHandleMessage({ message: reason.message }));
    }
    render() {
        return (
            <div>
                <AppWeekBar title="Shopping history"></AppWeekBar>
                <List>
                    {this.state.list.map(item => {
                        return <ListItem key={item._id}>
                            <Button color="primary" variant="outlined">
                                <Link to={AppConstant.LOCATION.shopping.path}
                                    onClick={() => {
                                        this.props.selectedShopList(item)
                                    }}>
                                    {item.name}
                                </Link>
                            </Button>
                            <ListItemSecondaryAction>
                                <Button color="secondary" variant="outlined">
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