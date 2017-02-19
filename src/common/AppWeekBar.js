/**
 * Created by eliasmj on 24/01/2017.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuIconComponent from './MenuIconComponent';

export const AppWeekBar = (props) => (

    <AppBar
        title={props.title}
        iconElementLeft={<MenuIconComponent></MenuIconComponent>}>
    </AppBar>
)

AppWeekBar.propTypes = {
    title: React.PropTypes.string
}

AppWeekBar.defaultProps = {
    title: 'Weekly Menu'
}

//export default AppWeekBar;

