/**
 * Created by eliasmj on 24/01/2017.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuApp from '../AppIconMenu'

export const AppWeekBar = (props) => (

    <AppBar
        title={props.title}
        iconElementLeft={<MenuApp></MenuApp>}>
    </AppBar>
)



AppWeekBar.propTypes = {
    title: React.PropTypes.string
}

AppWeekBar.defaultProps = {
    title: 'Weekly Menu'
}

//export default AppWeekBar;

