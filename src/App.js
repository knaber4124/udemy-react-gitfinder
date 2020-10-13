import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert/Alert'
import About from './components/Pages/About'
import User from './components/users/User'
import axios from 'axios'
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos:[],
    loading: false,
    alert: null
  }

  // async componentDidMount() {
  //   this.setState({
  //     loading: true
  //   });
  //   const res = await axios.get(`https://api.github.com/users?client_id= ${process.env.REACT_APP_GITHUB_CLIENT_ID} & client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({
  //     users: res.data,
  //     loading: false
  //   })
  // }

  searchUsers = async text => {
    this.setState({
      loading: true
    })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id= ${process.env.REACT_APP_GITHUB_CLIENT_ID} & client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({
      users: res.data.items,
      loading: false
    })
  };

  getUserInfo = async username => {
    this.setState({
      loading: true
    })
    const res = await axios.get(`https://api.github.com/users/${username}?client_id= ${process.env.REACT_APP_GITHUB_CLIENT_ID} & client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({
      loading: false,
      user: res.data
    })
  }

  getUserRepo=async username=>{
    this.setState({
      loading:true
    })
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id= ${process.env.REACT_APP_GITHUB_CLIENT_ID} & client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({
      loading: false,
      repos:res.data
    })
  }

  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    })
  };

  setAlert = (message, type) => {
    this.setState({
      alert: { message, type }
    })
    setTimeout(() => this.setState({
      alert: null
    }), 5000)
  }

  render() {
    const { users, user, loading, repos } = this.state
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search setAlert={this.setAlert} searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/About' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUserInfo={this.getUserInfo} getUserRepo={this.getUserRepo} repos={repos} user={user} loading={loading} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
