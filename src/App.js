import React, { Component } from "react";
import { VIEWS } from './Constants';
import ViewSwitch from "./components/ViewSwitch";
import Patient from "./components/Patient";
import Questionnaire from "./components/Questionnaire";
import Practitioner from "./components/Practitioner";
import styled from "styled-components";
import ErrorBoundary from "./components/ErrorBoundary";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 24px;
  background-color: #15202b;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

class App extends Component {
  state = {
    currentView: VIEWS.PATIENT
  };

  getView = () => {
    const viewMap = {
      [VIEWS.PATIENT]: <Patient />,
      [VIEWS.QUESTIONNAIRE]: <Questionnaire />,
      [VIEWS.PRACTITIONER]: <Practitioner />
    };
    return viewMap[this.state.currentView];
  }

  handleViewChange = (view) => {
    this.setState({ currentView: view })
  }
  render() {
    return (
      <ErrorBoundary>
        <Container>
          <ViewSwitch onViewChange={this.handleViewChange} />
          {this.getView()}
        </Container>
      </ErrorBoundary>
    );
  }
}

export default App;
