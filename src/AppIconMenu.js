import React from 'react';
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from  'material-ui/svg-icons/navigation/more-vert';
import {browserHistory} from 'react-router';


class AppIconMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    onItemTouchTap = (event, menuItem) => {
        console.log("On Item unique!", menuItem)

        if(menuItem.props.primaryText === 'Recipes List')
            browserHistory.push('/recipe');
        else {
            browserHistory.push('/');
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
            </IconMenu>
        );
    }
}

export default AppIconMenu