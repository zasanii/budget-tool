import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl, Jumbotron, Label} from 'react-bootstrap';
import Header from './Header';

import './App.css';

class FirstView extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  state = {
    value: '',
    amount: '',
    myContribution: '',
    name : '',
    email: '',
    phoneNumber: '',
    contribution: '',
    lastname: 'List participants',
  }
  handleAmountChange = (event) => {
    this.setState({amount: event.target.value});
  };

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  };

  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  };

  handlePhoneChange = (event) => {
    this.setState({phoneNumber: event.target.value});
  };

  handleContributrionChange = (event) => {
    this.setState({contribution: event.target.value});
  };

  handleMyContributionChange = (event) => {
    this.setState({myContribution: event.target.value});
  };

  handleAddParicipant = () => 
  {
    const arrays = ['Smith', 'blue'];
    if(localStorage.getItem('participants')) {

      
    } else {

    }
    console.log(localStorage.getItem('pariticipants'));
    localStorage.setItem("participants", JSON.stringify(arrays));
    // const lastname = localStorage.getItem('array');
    console.log(localStorage);
    console.log(this.name.value, this.email.value);
    this.setState({lastname: this.name.value});
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Grid>
          <Row>
            <Col xs={12} md={6}>
            <h1 className = "text-left">Create a new Split</h1>
            <Jumbotron className= "text-left" >
              <form>
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>Enter Amount</ControlLabel>
          <FormControl
            bsSize = "lg"
            type="text"
            value={this.state.amount}
            placeholder="100"
            onChange={this.handleAmountChange}
          />
        </FormGroup>
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>My contribution</ControlLabel>
          <FormControl
            bsSize = "lg"
            type="text"
            value={this.state.myContribution}
            placeholder="50"
            onChange={this.handleMyContributionChange}
          />
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
      <ControlLabel>Currency</ControlLabel>
      <FormControl componentClass="select" placeholder="EUR-Euro" bsSize = "lg">
        <option value="select">EUR - Euro</option>
        <option value="other">USD - US Dollar</option>
      </FormControl>
    </FormGroup>
      </form>
        </Jumbotron>
            </Col>
            <Col xs={12} md={6} className = "text-left">
            <h1 className = "text-left">Participants</h1>
            <Jumbotron className="App-participants">
              <FormGroup
          controlId="formNameText"
        >
          <ControlLabel>Name</ControlLabel>
          <FormControl
            bsSize = "lg"
            type="text"
            value={this.state.name}
            placeholder="Laura"
            onChange={this.handleNameChange}
            inputRef={(ref) => {this.name = ref}}
          />
        </FormGroup>
         <FormGroup
          controlId="formNameText"
        >
          <ControlLabel>Email</ControlLabel>
          <FormControl
            bsSize = "lg"
            type="text"
            value={this.state.email}
            placeholder="email"
            onChange={this.handleEmailChange}
            inputRef={(ref) => {this.email = ref}}
          />
        </FormGroup>
         <FormGroup
          controlId="formNameText"
        >
          <ControlLabel>Phone Number</ControlLabel>
          <FormControl
            bsSize = "lg"
            type="text"
            value={this.state.phoneNumber}
            placeholder="phone"
            onChange={this.handlePhoneChange}
            inputRef={(ref) => {this.phoneNumber = ref}}
          />
        </FormGroup>
         <FormGroup
          controlId="formNameText"
        >
          <ControlLabel>Contribution</ControlLabel>
          <FormControl
            bsSize = "lg"
            type="text"
            value={this.state.contribution}
            placeholder="100"
            onChange={this.handleContributionChange}
            inputRef={(ref) => {this.contribution = ref}}
          
          />
        </FormGroup>
        <FormGroup>
      <Col smOffset={11} sm={12}>
        <Button type="submit" onClick={this.handleAddParicipant}>
          <span className="glyphicon glyphicon-plus"></span>
        </Button>
      </Col>
    </FormGroup>
            </Jumbotron>
            </Col>
          </Row>
          <Row className = "text-left">
            <Col xs={12} md={12} className="participants-list">
            <p>&nbsp;</p>
            <Label bsStyle="default">{this.state.lastname}</Label>&nbsp;
            <p>&nbsp;</p>
            </Col>
          </Row>
          <Row className = "text-left">
            <Col xs={12} md={12} className = "text-right">
              <p>&nbsp;</p>
              <Button bsStyle="default" bsSize="large">Calculate</Button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default FirstView;
