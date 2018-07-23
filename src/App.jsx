import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Bio } from './pages/bio';
import { Contacts } from './pages/contacts';
import './App.css';

export const App = (props) => {
  return (
    <Router>
      <Fragment>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/bio" component={() => <Bio />} />
        <Route exact path="/contacts" component={() => <Contacts />} />
        {/*<Route exact path="/r/entities/:orgId" component={(props) => <Entities {...props} />} />*/}
      </Fragment>
    </Router>
  );
}


export default App;