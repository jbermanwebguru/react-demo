import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { store } from '../store';
import { push } from 'react-router-redux';

import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Roster from './Roster';
import AddPlayer from './AddPlayer';

import '../assets/stylesheets/base.scss';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/roster" component={Roster} />
          <Route path="/player/new" component={AddPlayer} />
          <Route path="*" component={Home} />
        </Switch>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
