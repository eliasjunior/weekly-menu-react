import React from 'react';
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from  'material-ui/svg-icons/navigation/more-vert';
import {browserHistory} from 'react-router';


class MenuIconComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    onItemTouchTap = (event, menuItem) => {
        console.log("On Item unique!", menuItem.props.primaryText)

        switch (menuItem.props.primaryText) {
            case 'Recipes List':
                browserHistory.push('/recipe');
                break;
            case 'Shopping' :
                browserHistory.push('/shopping');
                break;
            case 'New recipe' :
                browserHistory.push('/recipe/form');
                break;
            case 'Products' :
                browserHistory.push('/product/form');
                break;
            default:
                browserHistory.push('/');
                break;
        }
    }

    render() {
        return (
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onItemTouchTap={this.onItemTouchTap}>

                <MenuItem primaryText="Home" > </MenuItem>
                <MenuItem primaryText="Recipes List"></MenuItem>
                <MenuItem primaryText="Shopping"></MenuItem>
                <MenuItem primaryText="New recipe"></MenuItem>
                <MenuItem primaryText="Products"></MenuItem>
            </IconMenu>
        );
    }
}

export default MenuIconComponent