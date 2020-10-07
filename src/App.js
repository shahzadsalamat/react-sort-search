import React, { Component } from 'react';
import CreateUsersForm from './components/createUsersForm.js';
import UsersList from './components/usersList.js';
import './css/index.css';
import firebaseDB from './js/firebase.js';
import Sort from './components/sort.js';
import Search from './components/search.js'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filterUsers: []
        }
    }

    componentDidMount = () => {
        firebaseDB.database().ref().child('user').on('value', (snap) => {
            const previousUserData = [];
            snap.forEach((item) => {
                previousUserData.push({
                    id: item.key,
                    firstName: item.val().firstName,
                    lastName: item.val().lastName,
                    phoneNumber: item.val().phoneNumber
                });
            })
            this.setState({
                ...this.state.users,
                users: previousUserData,
                filterUsers: previousUserData
            });
        });
    }

    editUserSubmit = (editedUserData, userId) => {
        firebaseDB.database().ref().child('user/' + userId).set(editedUserData);
    };

    deleteUser = (deletedUser) => {
        firebaseDB.database().ref().child('user/' + deletedUser.id).remove();
    }

    addNewUser = (newUserData) => {
        firebaseDB.database().ref().child('user').push(newUserData);
    }
  
    sortDataTable = (sortedValue) => {
        const unSortedUsers = this.state.users;
        const sortedUsers = unSortedUsers.sort((a, b) =>
            a[sortedValue].localeCompare(b[sortedValue])
        );
        this.setState({
            filterUsers: sortedUsers
        })
    }

    searchUser = (searchInputValue) => {
        this.setState({
            filterUsers: this.state.users
        });
        const users = this.state.users;
        const filteredResult = users.filter(data => {
            if (searchInputValue == null)
                return data
            else if (data.firstName.toLowerCase().includes(searchInputValue.toLowerCase()) || data.lastName.toLowerCase().includes(searchInputValue.toLowerCase())) {
                return data
            }
            else {
                return null
            }
        });
        this.setState({
            filterUsers: filteredResult
        });
    }

    render() {
        // for sorting
        const headerObject = Object.assign({}, this.state.users[0]);
        const userDataHeader = Object.keys(headerObject);
        return (
            <div className='wrapper'>
             <div className='container'>
                <CreateUsersForm addNewUser={this.addNewUser} />
                <div className='container-search-sort'>
                    <div className='input-search'>               
                        <Search searchInputValue={this.state.searchInputValue} users={this.state.users} searchUser={this.searchUser} />
                    </div>
                    <div className='input-sort'>
                        <Sort sortDataTable={this.sortDataTable} sortValues={userDataHeader} />
                    </div>
                </div>
                <div>
                    <div className='table-wrapper'>
                        <div className='table-header'>
                            <div className='table-col'>First Name</div>
                            <div className='table-col'>Last Name</div>
                            <div className='table-col'>Phone Number</div>
                            <div className='table-col'>Action</div>
                        </div>
                    </div>
                    {
                        this.state.filterUsers.map((item) => {
                            return (

                                <div key={item.id}>
                                    <UsersList user={item} deleteUser={this.deleteUser} editUserSubmit={this.editUserSubmit} />
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
