import React from 'react';
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from  'material-ui/svg-icons/navigation/more-vert';
import {browserHistory} from 'react-router';
import {AppConstant} from './AppConstant';

const LABELS = ({
    shopping: 'New Shopping List',
    products: 'Products'

})
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
            case 'Recipe':
                browserHistory.push(AppConstant.RECIPE_LIST);
                break;
            case LABELS.shopping :
                browserHistory.push(AppConstant.SHOPPING);
                break;
            case 'New recipe' :
                browserHistory.push(AppConstant.NEW_RECIPE);
                break;
            case LABELS.products :
                browserHistory.push(AppConstant.PRODUCTS);
                break;
            default:
                browserHistory.push(AppConstant.DEFAULT_ROUTE);
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
                <MenuItem primaryText={LABELS.shopping}></MenuItem>
                <MenuItem primaryText="New recipe"></MenuItem>
                <MenuItem primaryText={LABELS.products}></MenuItem>
            </IconMenu>
        );
    }
}

export default MenuIconComponent