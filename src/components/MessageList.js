import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        username: "",
        content: "",
        sentAt: "",
        roomId: "",
        messages: []
      }
      this.messagesRef = this.props.firebase.database().ref("messages");
      this.handleChange = this.handleChange.bind(this);
      this.createMessage = this.createMessage.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: "user",
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });
    this.setState({ username: "", content: "", sentAt: "", roomId: "" });
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }

  render() {
    const activeRoom = this.props.activeRoom;

    const messageBar = (
      <form onSubmit={this.createMessage}>
        <input type="text" value={this.state.content} placeholder="Enter Message" onChange={this.handleChange}/>
        <input type="submit" value="Send" />
      </form>
    );

    const messageList = (
      this.state.messages.map((message) => {
        if (message.roomId === activeRoom) {
          return <li key={message.key}>{message.content}</li>
        }
        return null;
      })
    );

    return(
      <div className="list">
        <div>{messageBar}</div>
        <ul>{messageList}</ul>
      </div>
    );
  }
}

export default MessageList;
