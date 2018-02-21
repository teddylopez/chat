import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBbaQg_RBFBD078qRilJHs_GmwTuNceaDQ",
  authDomain: "react-chat-edd54.firebaseapp.com",
  databaseURL: "https://react-chat-edd54.firebaseio.com",
  projectId: "react-chat-edd54",
  storageBucket: "react-chat-edd54.appspot.com",
  messagingSenderId: "419133942033"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        activeRoom: '',
        user: ''
      };
      this.setRoom = this.setRoom.bind(this);
      this.setUser = this.setUser.bind(this);
    }

  setRoom(room) {
    this.setState({ activeRoom: room })
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    const showMessages = this.state.activeRoom;
    return (
      <div className="App">
        <nav id="main">
          <span id="logo">tedchat</span>
          <User firebase={firebase}
            setUser={this.setUser.bind(this)}
            user={this.state.user}
          />
        </nav>

        <aside id="sidebar">
          <h1 id="wordmark">Chat!</h1>
          <RoomList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            setRoom={this.setRoom.bind(this)}
            setUser={this.setUser.bind(this)}
            user={this.state.user}
          />
        </aside>
        <main>
        <div className="main-container">{this.state.activeRoom.name || "Select A Room"}</div>
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            setRoom={this.setRoom.bind(this)}
            setUser={this.setUser.bind(this)}
            user={this.state.user}
          />
        </main>
      </div>
    );
  }
}

export default App;
