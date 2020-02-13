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
            anchorEl: null
        }
        this.displayMenuOption = this.displayMenuOption.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    displayMenuOption = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }
    closeMenu() {
        console.log('Close menu')
        this.setState({ anchorEl: null});
    }
    render() {
        const { anchorEl } = this.state;
        return (
            <div>
                <IconButton
                    aria-owns={anchorEl ? 'menu-appbar' : null}
                    onClick={this.displayMenuOption}
                    aria-label="Menu"
                    aria-haspopup="true"
                    color="inherit">
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
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
            return <MenuItem key={key} onClick={this.closeMenu}>
                <Link to={location.path}>{location.label}</Link>
            </MenuItem>
        });
};


export default MenuIconComponent