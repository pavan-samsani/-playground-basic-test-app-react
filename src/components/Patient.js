import React, { Component } from "react";
import { getPatients } from "../services";
import Table from "./Table";
import moment from 'moment';

class Patient extends Component {
  state = {
    data: [],
    term: "",
    dob: null,
    loading: false,
    timestamp: null
  };

  handleSetTerm = (term) => {
     this.setState({ term });
  };

  handleSetDob = (dob) => {
     this.setState({ dob });
  };

  handleSearch = () => {
    let options = {};
    if (this.state.term) {
      options.name = this.state.term;
    }
    if (this.state.dob) {
      options.birthdate = this.state.dob.toISOString();
    }
    // options.birthdate = '1983-05-29T00:00:00'

    this.setState({ loading: true });
    getPatients(options).then((res) => {
      const data = res.data;
      const processedData = this.processQueryData(data);
      this.setState({
        data: processedData,
        loading: false,
        timestamp: moment()
      });
    });
  };

  extractDataFromResult = (entry) => {
    return (entry || []).map((item) => {
      const name = item.resource.name || [];
      return {
        id: item.resource.id,
        name: `${((name[0] || {}).given || []).join(" ")} ${(name[0] || {}).family
          }`,
        gender: item.resource.gender,
        dob: item.resource.birthDate,
      };
    });
  };



  componentDidMount() {
    this.setState({ loading: true });
    getPatients().then((res) => {
      const data = res.data;
      const processedData = this.processQueryData(data);
      this.setState({
        data: processedData,
        loading: false,
        timestamp: moment()
      });
    });
  }

  processQueryData = (data) => {
    const extractedData = this.extractDataFromResult(data.entry);
    const sortedData = this.sortBirthDate(extractedData);
    return sortedData;
  };

  sortBirthDate = (entry) => {
    if (!entry || entry.length === 0) {
      return [];
    }
    const data = [...entry];
    return data.sort((a, b) => {
      if (!a.dob || b.dob > a.dob) {
        return 1;
      }
      if (!b.dob || b.dob < a.dob) {
        return -1;
      }
      return 0;
    });
  };

  getTimeStamp = () => {
    if (!this.state.timestamp) {
      return null;
    }
    const timestamp = this.state.timestamp;
    return <div style={{color: '#fff', marginTop: '24px'}}>{`Data as of: ${timestamp.format('ddd DD MMM YYYY')} at ${timestamp.format('HH:mm:ss')}`}</div>
  }

  render() {
    return (
      <React.Fragment>
        <Table
          data={this.state.data}
          term={this.state.term}
          dob={this.state.dob}
          onTermChange={this.handleSetTerm}
          onDobChange={this.handleSetDob}
          onSearch={this.handleSearch}
          loading={this.state.loading}
        />
        {this.getTimeStamp()}
      </React.Fragment>

    );
  }
}

export default Patient;
