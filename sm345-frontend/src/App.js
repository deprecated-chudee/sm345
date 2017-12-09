import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { Provider } from 'mobx-react';
import stores from './stores';

import { Home, Room } from './pages';
import { Header, DrawerMenu, RoomList } from './components';

const theme = createMuiTheme();

const App = () => {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider {...stores} >
				<Router>
				<div>
					<Header/>
					<DrawerMenu/>
					<Route path="/" exact component={Home} />
					<Route path="/room" component={Room} />
				</div>
				</Router>
			</Provider>
		</MuiThemeProvider>
	)
}

export default App
