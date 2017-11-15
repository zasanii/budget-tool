import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Grid, Row, Col, Label} from 'react-bootstrap';

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
    localStorage.clear();
    this.context.router.history.push('/createsplit');
  }
  componentWillMount() {
    const creator = JSON.parse(localStorage.getItem('creator'));
    const participants = JSON.parse(localStorage.getItem('participants'));
    this.setState({ allParticipants: participants });
    console.log('data',localStorage);
    this.setState({totalAmount: creator.totalAmount, currency: creator.currency, mycontribution:creator.creatorContribution});
  }

  calucateShare () {
    const numberOfParticipants = this.state.allParticipants.length + 1;
    return this.state.totalAmount/numberOfParticipants;
  }
  render() {
    const share = this.calucateShare();
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
                <strong>{this.state.currency}&nbsp;{this.state.totalAmount}</strong>
                .</h2>
                <h3> I have paid <strong>{this.state.currency}&nbsp;{this.state.mycontribution}</strong>
                </h3>
                <h3>
                  Everybody's share is <strong>{this.state.currency}&nbsp;{share} </strong>
                </h3>
               (to do) Do the calculations and provide info on who ows what...
              </Jumbotron>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ExpensesView;
