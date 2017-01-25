/**
 * Created by eliasmj on 24/01/2017.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';

class AppWeekBar extends React.Component {

    render() {
        let titleName = this.props.title;
        return (
            <AppBar
                title={titleName}>
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

