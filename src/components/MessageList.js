import React, { Component } from 'react';
import './../styles/messagelist.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        username: this.props.user,
        content: "",
        sentAt: "",
        roomId: "",
        messages: []
      }
      this.messagesRef = this.props.firebase.database().ref("messages");
      this.handleChange = this.handleChange.bind(this);
      this.createMessage = this.createMessage.bind(this);
  }

  validateMessage(str) {
    const msgContent = str || this.state.content;
    const msgLength = msgContent.trim().length;
    if (msgLength > 0 && (this.props.activeRoom !== "")) { return true; }
    else {
      alert("Pick a thread and say something!");
      return false;
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.props.user,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }

  createMessage(e) {
    const activeRoom = this.props.activeRoom.key;
    const messagesRef = this.props.firebase.database().ref("messages");
    e.preventDefault();
    if (this.validateMessage()) {
      messagesRef.push({
        username: this.state.username,
        content: this.state.content,
        sentAt: this.state.sentAt,
        roomId: activeRoom
      });
      this.setState({ username: "", content: "", sentAt: "", roomId: ""});
    }
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }

  render() {
    const activeRoom = this.props.activeRoom.key;
    const activeUser = this.props.user;

    const messageBar = (
      <form id='create-message' onSubmit={this.createMessage}>
        <div className="message-input-wrapper">
          <input type='text' value={this.state.content} placeholder="Say something..." autocomplete="off" onChange={this.handleChange} id="msg-field"/>
        </div>
      <div className="message-send-wrapper">
        <input type="submit" value="Send" id="msg-send"/>
      </div>
      </form>
    );

    const messageList = (
      this.state.messages.map((message) => {
        if (message.roomId === activeRoom) {
          return <li key={message.key}>{message.username}: {message.content}</li>
        }
      })
    );

    return(
      <div className="list">
        <ul id="user-messages">{messageList}</ul>
        <div id="message-box">{messageBar}</div>
      </div>
    );
  }
}

export default MessageList;
