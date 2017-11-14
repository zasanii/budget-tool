import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Boot from './Boot';

class Root extends Component {
  state = {
    open: false,
  }
  render() {
    return (
      <BrowserRouter>
        <Route component = {Boot} />
      </BrowserRouter>
    );
  }
}

export default Root;
