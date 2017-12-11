import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { Provider } from 'mobx-react';
import stores from './stores';

import { Home, Room, Excel, Login, Student } from './pages';
import { Header, DrawerMenu, PrivateRoute } from './components';

const theme = createMuiTheme();

const App = () => {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider {...stores} >
				<Router>
					<div>
						<Header/>
						<DrawerMenu/>
						<Route exact path="/" component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/excel" component={Excel} />
						<PrivateRoute path="/room" component={Room} />
						<PrivateRoute path="/student" component={Student} />
					</div>
				</Router>
			</Provider>
		</MuiThemeProvider>
	)
}

export default App
