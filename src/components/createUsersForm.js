import React, { Component } from 'react';

class CreateUsersForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                phoneNumber: ''
            }
        }
        this.intialState = this.state
    }

    handleUserFormChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            user: {
                ...this.state.user,
                [name]: value,
            }
        });
    }

    handleCreateUserSubmit = (newUserData) => {
        this.props.addNewUser(newUserData);
        this.setState(this.intialState);
    }

    render() {
        return (
            <div>
                <form>
                    <input
                        className='form-input'
                        type='text'
                        name='firstName'
                        placeholder='firstName'
                        value={this.state.user.firstName}
                        onChange={this.handleUserFormChange}
                    ></input>
                    <input
                        className='form-input'
                        type='text'
                        name='lastName'
                        value={this.state.user.lastName}
                        placeholder='lastName'
                        onChange={this.handleUserFormChange}
                    ></input>
                    
                    <input
                        className='form-input'
                        name='phoneNumber'
                        placeholder='phoneNumber'
                        value={this.state.user.phoneNumber}
                        onChange={this.handleUserFormChange}>
                    </input>
                    
                    <input
                        className='form-button bg-green'
                        type='button'
                        value='Add New User'
                        onClick={this.handleCreateUserSubmit.bind(this, this.state.user)}
                    ></input>

                </form>
            </div>
        );
    }
}

export default CreateUsersForm;