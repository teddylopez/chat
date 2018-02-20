import React, { Component } from 'react';
import './../styles/messages.css';

class Messages extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allMessages: [],
      displayedMessages: [],
      newMessageText: ''
    }
    this.messagesRef = this.props.firebase.database().ref('messages')
  }

  render() {
      return(
        <div className="message-list">
          <div>Messages noooo</div>
        </div>
      );
    }
}

export default Messages;
