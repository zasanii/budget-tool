import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'email-validator';
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl, Jumbotron, HelpBlock, Alert } from 'react-bootstrap';
import Header from './Header';

import './App.css';

class CreateSplitView extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  defaultState = {
    value: '',
    amount: '',
    amountValidationMessage: '',
    myContribution: '',
    myContributionValidationMessage: '',
    name: '',
    nameValidationMessage: '',
    email: '',
    emailValidationMessage: '',
    currency: 'CHF',
    phoneNumber: '',
    participantContribution: 0,
    infoMessage: '',
    allParticipants: null,
  }

  state = {
    value: '',
    amount: '',
    amountValidationMessage: '',
    myContribution: '',
    myContributionValidationMessage: '',
    name: '',
    nameValidationMessage: '',
    email: '',
    emailValidationMessage: '',
    currency: 'CHF',
    phoneNumber: '',
    participantContribution: 0,
    infoMessage: '',
    allParticipants: null,
  }

  handleAmountChange = (event) => {
    this.setState({ amount: event.target.value });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePhoneChange = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  handleContributionChange = (event) => {
    this.setState({ participantContribution: event.target.value });
  };

  handleMyContributionChange = (event) => {
    this.setState({ myContribution: event.target.value });
  };

  handleCurrencyChange = (event) => {
    this.setState({ currency: event.target.value });
  };

  handleAddParicipant = () => {
    const { name, email, phoneNumber, participantContribution } = this.state;
    const participant = {};
    if (name.length <= 0) {
      this.setState({ nameValidationMessage: "Please enter the participant name" });
    } else if (email.length <= 0) {
      this.setState({ emailValidationMessage: "Please enter the email" });
    } else {
      if (validator.validate(email)) {
        this.setState({ nameValidationMessage: "" });
        this.setState({ emailValidationMessage: "" });
        if (localStorage.getItem('participants')) {
          const participants = JSON.parse(localStorage.getItem('participants'));
          if (participants.length >= 5) {
            this.setState({ infoMessage: "The number of participants is limited to 5" });
          } else {
            participant.name = name
            participant.email = email;
            participant.phoneNumber = phoneNumber;
            participant.contribution = participantContribution;
            participants.push(participant);
            localStorage.setItem("participants", JSON.stringify(participants));
          }

        } else {
          const participants = [];
          participant.name = name;
          participant.email = email;
          participant.phoneNumber = phoneNumber;
          participant.contribution = participantContribution;
          participants.push(participant);
          localStorage.setItem("participants", JSON.stringify(participants));
        }
        const allParticipants = JSON.parse(localStorage.getItem('participants'));
        this.setState({ allParticipants });
        this.setState({ name: "", email: '', phoneNumber: '', participantContribution: 0 });
      } else {
        this.setState({ emailValidationMessage: "Please enter valid email" });
      }

    }


  }
  handleCalculate = () => {


    if (this.state.amount.length <= 0) {
      this.setState({ amountValidationMessage: 'Please enter the total amount' });
    } else if (this.state.myContribution.length <= 0) {
      this.setState({ myContributionValidationMessage: 'Please enter your contribution' });
    } else {
      this.setState({ amountValidationMessage: '', myContributionValidationMessage:'' });
      const creator = { totalAmount: this.state.amount, creatorContribution: this.state.myContribution, currency: this.state.currency };
      localStorage.setItem("creator", JSON.stringify(creator));
      this.context.router.history.push('/expenses');
    }

  }

  handleReset = () => {
    localStorage.clear();
    this.setState(this.defaultState);
  }
  render() {
    const { allParticipants } = this.state;
    let participantsList;
    if (allParticipants) {
      participantsList = allParticipants.map((item) => (
        <tr key={item.name}>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.phoneNumber}</td>
          <td>{item.contribution}</td>
        </tr>
      )
      );
    }
    return (
      <div className="App">
        <Header />
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <h1 className="text-left">Create a new Split</h1>
              <Jumbotron className="text-left" >
                <form>
                  <FormGroup
                    controlId="formAmountText"
                  >
                    <ControlLabel>Enter Total Amount</ControlLabel>
                    <FormControl
                      bsSize="lg"
                      type="text"
                      value={this.state.amount}
                      placeholder="100"
                      onChange={this.handleAmountChange}
                    />
                    <HelpBlock className="help-block">{this.state.amountValidationMessage}</HelpBlock>
                  </FormGroup>
                  <FormGroup
                    controlId="formBasicText"
                  >
                    <ControlLabel>Enter your contribution</ControlLabel>
                    <FormControl
                      bsSize="lg"
                      type="text"
                      value={this.state.myContribution}
                      placeholder="50"
                      onChange={this.handleMyContributionChange}
                    />
                    <HelpBlock className="help-block">{this.state.myContributionValidationMessage}</HelpBlock>
                  </FormGroup>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Currency</ControlLabel>
                    <FormControl componentClass="select" placeholder="Select" bsSize="lg" onChange={this.handleCurrencyChange} defaultValue="CHF">
                      <option value="CHF" >CHF</option>
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                    </FormControl>
                  </FormGroup>
                </form>
              </Jumbotron>
            </Col>
            <Col xs={12} md={6} className="text-left">
              <h1 className="text-left">Participants</h1>
              <Jumbotron className="App-participants">
                <FormGroup
                  controlId="formNameText"
                >
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    bsSize="lg"
                    type="text"
                    value={this.state.name}
                    placeholder="Laura"
                    onChange={this.handleNameChange}
                  />
                  <HelpBlock className="help-block">{this.state.nameValidationMessage}</HelpBlock>
                </FormGroup>
                <FormGroup
                  controlId="formNameText"
                >
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    bsSize="lg"
                    type="text"
                    value={this.state.email}
                    placeholder="email"
                    onChange={this.handleEmailChange}
                  />
                  <HelpBlock className="help-block">{this.state.emailValidationMessage}</HelpBlock>
                </FormGroup>
                <FormGroup
                  controlId="formNameText"
                >
                  <ControlLabel>Phone Number</ControlLabel>
                  <FormControl
                    bsSize="lg"
                    type="text"
                    value={this.state.phoneNumber}
                    placeholder="phone"
                    onChange={this.handlePhoneChange}

                  />
                </FormGroup>
                <FormGroup
                  controlId="formNameText"
                >
                  <ControlLabel>Contribution</ControlLabel>
                  <FormControl
                    bsSize="lg"
                    type="text"
                    value={this.state.participantContribution}
                    placeholder="100"
                    onChange={this.handleContributionChange}

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
          <Row className="text-left">
            <Col xs={12} md={12}>
              {this.state.infoMessage &&
                <Alert bsStyle="info">
                  <strong>INFO !</strong>{this.state.infoMessage}
                </Alert>
              }
            </Col>
          </Row>
          <Row className="text-left">
            <Col xs={12} md={12} className="participants-list">

              <h1>Participants overview</h1>
              <p>&nbsp;</p>
              <table className="table table-condensed">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {participantsList}
                </tbody>
              </table>
              <p>&nbsp;</p>
            </Col>
          </Row>
          <Row className="text-left">
            <Col xs={12} md={12} className="text-right">
              <p>&nbsp;</p>
              <Button bsStyle="default" bsSize="large" onClick={this.handleReset}>Reset</Button>&nbsp;
               <Button bsStyle="primary" bsSize="large" onClick={this.handleCalculate}>Calculate</Button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default CreateSplitView;
