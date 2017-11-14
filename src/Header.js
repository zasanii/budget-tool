import React, { Component } from 'react';
import logo from './calc_logo.svg';
import './App.css';

class Header extends Component {
  render() {
    return (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Budget Calculator</h1>
        </header>
    );
  }
}

export default Header;
