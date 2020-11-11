import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GitHubState from './context/gitHub/GitHubState';
import AlertState from './context/alert/AlertState';
import Navbar from './components/layout/Navbar/Navbar';
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert/Alert'
import About from './components/Pages/About'
import User from './components/users/User'
import './App.css';

const App = () => {



  return (
    <AlertState>
      <GitHubState>
        <Router>
          <div className="App">
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path='/' render={props => (
                  <Fragment>
                    <Search />
                    <Users />
                  </Fragment>
                )} />
                <Route exact path='/About' component={About} />
                <Route exact path='/user/:login' component={User} />
              </Switch>
            </div>
          </div>
        </Router>
      </GitHubState>
    </AlertState>
  );

}

export default App;
