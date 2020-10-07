import React, { Component } from 'react';

class EditUsers extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.user
        this.state = {
            editUserData: {
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                phoneNumber: this.user.phoneNumber
            }
        }
    }

    handleCancelEdit = () => {
        this.props.handleEditMode(false)
    };

    handleEditUserSubmit = () => {
        const editedUser = this.state.editUserData;
        this.props.editUserSubmit(editedUser);
    };

    handleEditUserChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({
            editUserData: {
                ...this.state.editUserData,
                [name]: value,
            }
        });
    }

    render() {
        return (
            <div className='form-wrapper'>
                <input
                    className='input-form'
                    type='text'
                    placeholder='firstName'
                    name='firstName'
                    value={this.state.editUserData.firstName}
                    onChange={this.handleEditUserChange}
                />
                <input
                    className='input-form'
                    type='text'
                    placeholder='lastName'
                    name='lastName'
                    value={this.state.editUserData.lastName}
                    onChange={this.handleEditUserChange}
                />
                <input
                    className='input-form'
                    type="number" pattern="[0-9]*" inputmode="numeric"
                    placeholder='phoneNumber'
                    name='phoneNumber'
                    value={this.state.editUserData.phoneNumber}
                    onChange={this.handleEditUserChange}
                />
                <div>
                    <input
                        className='form-button bg-green color-white'
                        type='button'
                        value='Update'
                        onClick={this.handleEditUserSubmit.bind(this)}
                    />
                    <input
                        className='form-button bg-red color-white'
                        type='button'
                        value='cancel'
                        onClick={this.handleCancelEdit}
                    />
                </div>
            </div>
        )
    }
}

export default EditUsers;