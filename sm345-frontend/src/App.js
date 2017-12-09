import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {  } from 'mobx';
// import { Home } from 'routes';
// import Header from 'components/Header';
// import DrawerMenu from 'components/DrawerMenu';

const App = () => {
  return (
    <MuiThemeProvider>
        <Router>
          <div>
            {/* <Header/> */}
            {/* <DrawerMenu/> */}
            {/* <Route path="/" component={Home} /> */}
          </div>
        </Router>
    </MuiThemeProvider>
  )
}

export default App
