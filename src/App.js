import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContentApp from './Content.app';

class App extends React.Component {

    render() {
        return (
            <MuiThemeProvider>
                <ContentApp/>
            </MuiThemeProvider>
        )
    }

}

export default App