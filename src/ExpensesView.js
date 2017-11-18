import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Grid, Row, Col} from 'react-bootstrap';

import Header from './Header';
import './App.css';

class ExpensesView extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  state = {
    totalAmount: '',
    currency: '',
    mycontribution: '',
    allParticipants: '',
  }

  handleStart = () => {
    //localStorage.clear();
    this.context.router.history.push('/createsplit');
  }
  componentWillMount() {
    const creator = JSON.parse(localStorage.getItem('creator'));
    const participants = JSON.parse(localStorage.getItem('participants'));
    this.setState({ allParticipants: participants });
    console.log('data',localStorage);
    this.setState({totalAmount: creator.totalAmount, currency: creator.currency, mycontribution:creator.creatorContribution});
  }

  addUserData (userA, action, userB, amount) {
    let userData = {};
    userData.userA = userA;
    userData.action = action;
    userData.userB = userB;
    userData.amount = amount;
    return userData;
  }

  calcuateShare () {
    let result = [];
    const numberOfParticipants = this.state.allParticipants.length + 1;
    const participants = this.state.allParticipants;
    let totalCost = this.state.totalAmount;
    
    // Add the user of the app to the list of participants
    const participant = {};
    participant.name = "User";
    participant.email = "";
    participant.phoneNumber = "";
    participant.contribution = this.state.mycontribution;
    participants.push(participant);

    // Check if participants collected more than needed amount of money
    let aboveTheCost = participants.map(item => Number(item.contribution)).reduce((prev, next) => prev + next) - totalCost;

    // 1. Calculate fair cost per person
    let share = totalCost / numberOfParticipants;

    // 2. Calculate actual cost per person and save as map with persons names as keys
    let mapOfCosts = new Map(participants.map((item) => [item.name, item.contribution-share]));    

    // 3. Check if there was too much money collected and how much should be given to each contributor from the pool
    participants.forEach(participant => {
      if (mapOfCosts.get(participant.name) > 0 && aboveTheCost > 0) {
        if (aboveTheCost > mapOfCosts.get(participant.name)) {
          result.push(this.addUserData(participant.name, " gets from ", " the pool ", mapOfCosts.get(participant.name)));
          aboveTheCost -= mapOfCosts.get(participant.name);
          mapOfCosts.set(participant.name, 0.0);
        } else if (aboveTheCost > 0) {
          result.push(this.addUserData(participant.name, " gets from ", " the pool ", aboveTheCost));
          mapOfCosts.set(participant.name, mapOfCosts.get(participant.name) - aboveTheCost);
          aboveTheCost = 0.0;
        }
      }
    });

    // 4. Calculate who owes whom and how much
    participants.forEach(participantOuter => {
      if (mapOfCosts.get(participantOuter.name) > 0) {
        participants.forEach(participantInner => {
          if (!(JSON.stringify(participantOuter) === JSON.stringify(participantInner)) && mapOfCosts.get(participantInner.name) < 0) {
            if (mapOfCosts.get(participantOuter.name) > Math.abs(mapOfCosts.get(participantInner.name))) {
              result.push(this.addUserData(participantInner.name, " owes ", participantOuter.name, Math.abs(mapOfCosts.get(participantInner.name))));
              mapOfCosts.set(participantOuter.name, mapOfCosts.get(participantOuter.name) + mapOfCosts.get(participantInner.name));
              mapOfCosts.set(participantInner.name, 0.0);
            } else {
              result.push(this.addUserData(participantInner.name, " owes ", participantOuter.name, Math.abs(mapOfCosts.get(participantOuter.name))));
              mapOfCosts.set(participantOuter.name, 0.0);
              mapOfCosts.set(participantInner.name, mapOfCosts.get(participantInner.name) + mapOfCosts.get(participantOuter.name));
            }
          }
        })
      }
    });

    return result;
  }
  render() {
    const share = this.calcuateShare().map((item, index) =>(
      <tr key={index}>
        <td>{item.userA}</td>
        <td>{item.action}</td>
        <td>{item.userB}</td>
        <td>{item.amount}</td>
      </tr>
    ));
    return (
      <div className="App">
        <Header />
        <Grid>
          <Row>
            <Col xs={12} md={12}>
              <Jumbotron>
                <h1>Overview of expenses</h1>
              </Jumbotron>
            </Col>
          </Row>
          <Row className="text-left">
            <Col xs={12} md={12}>
              <Jumbotron>
                <h2>
                The group spent a total amount of &nbsp;
                <strong>{this.state.currency}&nbsp;{this.state.allParticipants.map(item => Number(item.contribution)).reduce((prev, next) => prev + next)}</strong>
                .</h2>
                <h2>
                The cost of shopping was &nbsp;
                <strong>&nbsp;{this.state.totalAmount}</strong>
                .</h2>
                <h2>
                  The following people paid : &nbsp;
                </h2>
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
                  {this.state.allParticipants.map(item =>(
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.contribution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>                  
                <h2>
                  Costs should be split the following way
                </h2>
                <table className="table table-condensed">
                <thead>
                  <tr>
                    <th>User A</th>
                    <th>Action</th>
                    <th>User B</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {share}
                </tbody>
              </table>  
              </Jumbotron>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ExpensesView;
