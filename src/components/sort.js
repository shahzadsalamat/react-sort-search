import React, { Component } from 'react';

class Sort extends Component {

  handleChange = (e) => {
    this.props.sortDataTable(e.target.value);
  }
  render() {
    const sortValues = this.props.sortValues;
    return (
      <div>
        <label>Sort by:</label>
        <select  className='input-sort' onChange={this.handleChange}>
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

