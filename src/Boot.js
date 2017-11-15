import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import App from './App';
import CreateSplitView from './CreateSplitView';
import ExpensesView from './ExpensesView';

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
          <Route path="/createsplit" component={CreateSplitView} />
          <Route path="/expenses" component={ExpensesView} />
        </Switch>
      </div>
    );
  }
}

export default Boot;
