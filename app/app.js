// Including the Main React Dependencies
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//Router variable
import routes from './config/routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { hashHistory, Router } from 'react-router';

injectTapEventPlugin();

//mounting point for index.html 
const where = document.getElementById('app');


ReactDOM.render(  
	<MuiThemeProvider muiTheme={getMuiTheme()}>
    	<Router history={hashHistory} routes={routes} />
  	</MuiThemeProvider>, where);
