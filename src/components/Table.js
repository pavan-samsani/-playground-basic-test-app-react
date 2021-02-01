import React, { Component } from "react";
import Search from "./Search";
import "react-datepicker/dist/react-datepicker.css";
import "./Table.css";

export default class Table extends Component {
  render() {
    return (
      <React.Fragment>
        <Search
          term={this.props.term}
          searchdob={this.props.dob}
          onSearchTerm={this.props.onTermChange}
          onSearchDob={this.props.onDobChange}
          onSearchFunc={this.props.onSearch}
        />

        {this.props.loading ? (
          <div style={{color: '#fff', margin: '0 auto'}}>Loading...</div>
        ) : (
          <table>
            <thead>
              <tr className="dataTable-head">
                <th className='column1'>Full Name</th>
                <th className='column2'>Gender</th>
                <th className='column3'>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.map((item) => (
                <tr key={item.id}>
                  <td className='column1'>{item.name}</td>
                  <td className='column2'>{item.gender}</td>
                  <td className='column3'>{item.dobß}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </React.Fragment>
    );
  }
}
