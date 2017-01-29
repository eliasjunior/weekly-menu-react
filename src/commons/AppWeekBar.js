/**
 * Created by eliasmj on 24/01/2017.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuApp from '../AppIconMenu'

class AppWeekBar extends React.Component {

    constructor(props) {
        super(props)
    }

    onRightIconButtonTouchTap = (event) => {
        console.log("I Click here!!")
    }

    onTitleTouchTap = ()=> {
        console.log("I TEXT here!!")
    }

    render() {
        let titleName = this.props.title;
        return (
            <AppBar
                title={titleName}
                iconElementLeft={<MenuApp></MenuApp>}>
            </AppBar>
        )
    }
}

AppWeekBar.propTypes = {
    title: React.PropTypes.string
}

AppWeekBar.defaultProps = {
    title: 'Weekly Menu'
}

export default AppWeekBar;

