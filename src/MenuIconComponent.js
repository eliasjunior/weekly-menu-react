import React from 'react';
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import { AppConstant } from './common/AppConstant';
import { Menu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

// TODO, later, generate the MenuItem dynamic, need to finish in AppConstants too
// const getItemsForSideMenu = () => {
//     return Object
//         .entries(AppConstant.LABEL)
//         .map(item => item[1])
// };

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
        const pageSelected = [event.currentTarget.innerText]
            .map(item => item.trim())
            .shift();

        console.log('Page => ', pageSelected)    
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
                    <MenuItem onClick={this.onDisplayClose}>
                        <Link to={AppConstant.PATH.DEFAULT_ROUTE}>{AppConstant.LABEL.HOME}</Link>
                    </MenuItem>
                    <MenuItem onClick={this.onDisplayClose}>
                        <Link to={AppConstant.PATH.NEW_RECIPE}>{AppConstant.LABEL.NEW_RECIPE}</Link>
                    </MenuItem>
                    <MenuItem onClick={this.onDisplayClose}>
                        <Link to={AppConstant.PATH.RECIPE_LIST}>{AppConstant.LABEL.RECIPE_LIST}</Link>
                    </MenuItem>
                    <MenuItem onClick={this.onDisplayClose}>
                        <Link to={AppConstant.PATH.SHOPPING}>{AppConstant.LABEL.SHOPPING}</Link>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default MenuIconComponent