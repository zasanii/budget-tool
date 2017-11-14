import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import App from './App';
import FirstView from './FirstView';

class Boot extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  state = {
    open: false,
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/firstview" component={FirstView} />
        </Switch>
      </div>
    );
  }
}

export default Boot;
