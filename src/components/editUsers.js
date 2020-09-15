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
     //   console.log('editeduser' + JSON.stringify(editedUser));
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
            <div>
                <form style={{ backgroundcolor: "white" }}>
                    <input
                        className='form-input'
                        type='text'
                        placeholder='firstName'
                        name='firstName'
                        value={this.state.editUserData.firstName}
                        onChange={this.handleEditUserChange}
                    />
                    <input
                        className='form-input'
                        type='text'
                        placeholder='lastName'
                        name='lastName'
                        value={this.state.editUserData.lastName}
                        onChange={this.handleEditUserChange}
                    />
                    <input
                        className='form-input'
                        type="text" 
                        pattern="[0-9]*"
                        placeholder='phoneNumber'
                        name='phoneNumber'
                        value={this.state.editUserData.phoneNumber}
                        onChange={this.handleEditUserChange}
                    />
                    <input
                        className='form-button bg-blue color-white'
                        type='button'
                        value='submit'
                        onClick={this.handleEditUserSubmit.bind(this)}
                    />
                    <input
                        className='form-button bg-blue color-white'
                        type='button'
                        value='cancel'
                        onClick={this.handleCancelEdit}
                    />
                </form>
            </div>
        )
    }
}

export default EditUsers;