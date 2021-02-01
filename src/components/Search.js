import React, { Component } from "react";
import DatePicker from "react-datepicker";
import styled from 'styled-components';
import moment from "moment";

const ViewButton = styled.button`
  margin: 10px;
  background-color: rgb(29, 161, 242);
  padding: 8px 16px;
  border-radius: 21px;
  border: 0;
  color: #fff;
  font-weight: bolder;
  font-size: 16px;
  cursor: pointer;`

export default class Search extends Component {
  handleTermChange = (event) => {
    if (this.isValidName(event.target.value)) {
      this.props.onSearchTerm && this.props.onSearchTerm(event.target.value);
    }
  };

  isValidName = (name) => {
    if (!name) {
      return true;
    }
    return /^[a-zA-Z ]+$/g.test(name);
  };

  handleDobChange = (date) => {
    if (this.isValidDate(moment(date).format("YYYY/MM/DD"))) {
      this.props.onSearchDob && this.props.onSearchDob(date);
    }
  };

  isValidDate = (date) => {
    // First check for the pattern
    if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(date)) return false;

    // Parse the date parts to integers
    const parts = date.split("/");
    const day = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
      monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  };

  render() {
    return (
      <div className="search-bar ui segment">
        <div className="field">
          <form
            className="ui form"
            onSubmit={(e) => {
              e.preventDefault();
              this.props.onSearchFunc && this.props.onSearchFunc();
            }}
          >
            <input
              type="text"
              className="searchTerm"
              placeholder="Enter Name..."
              value={this.props.term}
              onChange={this.handleTermChange}
            />
            <DatePicker
              dateFormat="yyyy/MM/dd"
              selected={this.props.searchdob}
              onChange={this.handleDobChange}
              placeholderText="Enter BirthDate..."
            />
            <ViewButton type="submit" className="searchButton">
              Search
            </ViewButton>
          </form>
        </div>
      </div>
    );
  }
}
