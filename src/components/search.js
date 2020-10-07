import React, { Component } from 'react';

class Search extends Component {

    handleChange = (e) => {
        this.props.searchUser(e.target.value);
    }

    render() {

        return (
            <div>
                <input
                    className='input-search input-form'
                    type='text'
                    name='search'
                    defaultValue=''
                    placeholder='Search here'
                    onChange={this.handleChange}
                ></input>
            </div>
        );
    }
}

export default Search;