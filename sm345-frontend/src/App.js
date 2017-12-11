import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { Provider } from 'mobx-react';
import stores from './stores';

import { Home, Room, Excel, Login } from './pages';
import { Header, DrawerMenu } from './components';

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
						<Route path="/room" component={Room} />
						<Route path="/excel" component={Excel} />
						{/* <Route path="/room/create" component={CreateRoom} />
						<Route path="/room/:id" componrnt={} /> */}
					</div>
				</Router>
			</Provider>
		</MuiThemeProvider>
	)
}

export default App
