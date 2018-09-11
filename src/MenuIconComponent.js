import React from 'react';
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import { AppConstant } from './common/AppConstant';
import { Menu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

class MenuIconComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null
        }
        this.onDisplayMenuOption = this.onDisplayMenuOption.bind(this);
        this.onDisplayClose = this.onDisplayClose.bind(this);
    }
    onDisplayMenuOption = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }
    onDisplayClose(event) {
        this.setState({ anchorEl: null, open: false });
    }
    render() {
        return (
            <div>
                <IconButton
                    aria-owns={this.state.open ? 'menu-appbar' : null}
                    onClick={this.onDisplayMenuOption}
                    aria-label="Menu"
                    aria-haspopup="true"
                    color="inherit">
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}>
                    {getItemsForSideMenu.call(this)}
                </Menu>
            </div>
        );
    }
}

function getItemsForSideMenu() {
    return Object
        .entries(AppConstant.LOCATION)
        .filter(([key, location]) => location.menu)
        .map(([key, location]) =>  {
            return <MenuItem key={key} onClick={this.onDisplayClose}>
                <Link to={location.path}>{location.label}</Link>
            </MenuItem>
        });
};


export default MenuIconComponent