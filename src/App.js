import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    open: false,
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, editsds <code>src/App.js</code> and save to reload.
        </p>
        <Grid>
          <Row>
            <Col xs={12} md={8}>
              <Button onClick={() => this.setState({ open: !this.state.open })}>
                click
              </Button>
              <Panel collapsible expanded={this.state.open}>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
              </Panel>
            </Col>
            <Col xs={6} md={4}>test</Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
