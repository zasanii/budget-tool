import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, Jumbotron} from 'react-bootstrap';

import Header from './Header';
import './App.css';

class App extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  state = {
    open: false,
  }

  handleStart = () => {
    this.context.router.history.push('/firstview');
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Jumbotron>
          <h1>Split your expenses</h1>
          <Button bsStyle="primary" bsSize="large" onClick={this.handleStart}>
                Start
          </Button>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
