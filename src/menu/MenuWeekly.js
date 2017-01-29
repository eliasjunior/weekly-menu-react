import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuList from './MenuContent';

class MenuWeekly extends React.Component {

    render() {
        return (
            <MuiThemeProvider>
                <MenuList/>
            </MuiThemeProvider>
        )
    }
}

export default MenuWeekly