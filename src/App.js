import React, { Component } from 'react';
import CreateUsersForm from './components/createUsersForm.js';
import UsersList from './components/usersList.js';
import './css/index.css';
import firebaseDB from './js/firebase.js';
import Sort from './js/sort.js'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getUsers: [],
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
                ...this.state.getUsers,
                getUsers: previousUserData
            });
        });
    }

    editUserSubmit = (editedUserData, userId) => {
        firebaseDB.database().ref().child('user/' + userId).set(editedUserData);
        // console.log('user is being edited' + JSON.stringify(editedUserData.firstName));
    };

    deleteUser = (deletedUser) => {
        firebaseDB.database().ref().child('user/' + deletedUser.id).remove();
    }

    addNewUser = (newUserData) => {
        firebaseDB.database().ref().child('user').push(newUserData);
    }
    // for sorting the data
    sortDataTable = (sortedValue) => {
        const unSortedUsers = this.state.getUsers,
        sortedUsers = unSortedUsers.sort((a, b) =>
            a[sortedValue].localeCompare(b[sortedValue])
        );
        
        this.setState({
            getUsers: sortedUsers
        })
    }

    render() {
        const headerObject = Object.assign({}, this.state.getUsers[0]);
        const userDataHeader = Object.keys(headerObject);
        
        return (

            <div className='wrapper'>

                <CreateUsersForm addNewUser={this.addNewUser} />
                <Sort sortDataTable={this.sortDataTable} sortValues={userDataHeader} />
                <div>

                    <div className='div-table'>
                        <div className='div-table-row'>
                            <div className='div-table-col'>First Name</div>
                            <div className='div-table-col'>Last Name</div>
                            <div className='div-table-col'>Phone Number</div>
                            <div className='div-table-col'>Action</div>

                        </div>
                    </div>

                    {

                        this.state.getUsers.map((item) => {
                            return (

                                <div key={item.id}>
                                    <UsersList user={item} deleteUser={this.deleteUser} editUserSubmit={this.editUserSubmit} />
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        );
    }
}

export default App;
