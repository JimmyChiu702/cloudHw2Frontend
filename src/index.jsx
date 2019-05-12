import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Main from 'components/Main.jsx';

import './index.css';

window.onload = function() {
    ReactDOM.render(
        <MuiThemeProvider theme={theme}>
            <Main />
        </MuiThemeProvider>,
        document.getElementById('root')
    );
};

const theme = createMuiTheme({

});