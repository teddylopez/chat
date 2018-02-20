import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';

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
        activeRoom: ''
      };
      //this.setRoom = this.setRoom.bind(this);
    }

  setRoom(room) {
    this.setState({ activeRoom: room })
  }

  render() {
    return (
      <div className="App">
        <nav id="main">
          tedchat
        </nav>

        <aside id="sidebar">
          <div id="logo"></div>
          <h1 id="wordmark">Chat!</h1>
          <RoomList
            firebase={firebase}
            setRoom={this.setRoom.bind(this)}
          />
        </aside>
        <main>
        <div className="main-container">{this.state.activeRoom.name || "Select A Room"}</div>
          <MessageList
            firebase={firebase}
            setRoom={this.state.activeRoom}
          />
        </main>
      </div>
    );
  }
}

export default App;
