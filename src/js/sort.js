import React, { Component } from 'react';

class Sort extends Component {

  handleChange = e => {
    const sort = e.target.value
    this.props.sortDataTable(sort);
  }
  render() {
    const sortValues = this.props.sortValues;
    return (
      <div>
        <label>Sort by:</label>
        <select onChange={this.handleChange}>
          {sortValues.map((value, index) => {
            return <option key={index} value={value}>{value}</option>
          })
          }
        </select>
      </div>
    );
  }
}

export default Sort;

