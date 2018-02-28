import React, { Component } from 'react';
import './../styles/roomlist.css';

class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        name: '',
        rooms: []
      };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.selectRoom = this.selectRoom.bind(this);
    this.validateRoom = this.validateRoom.bind(this);
  }

  validateRoom(str) {
    const roomContent = str || this.state.name;
    const roomLength = roomContent.trim().length;
    if (roomLength > 0) { return true; }
    else {
      alert("Your new thread must have a name!");
      return false;
    }
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    if (this.validateRoom()) {
      this.roomsRef.push({ name: this.state.name });
      this.setState({ name: "" });
    }
  }

  deleteRoom(room) {
    this.roomsRef.child(room.key).remove();
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
      if (this.state.rooms.length === 1) { this.props.setRoom(room) }
    });
    this.roomsRef.on('child_removed', snapshot  => {
      this.setState({ rooms: this.state.rooms.filter( room => room.key !== snapshot.key )  })
    });
  }

  selectRoom(room) {
    this.props.setRoom(room);
  }

  render() {
    const roomForm = (
      <form onSubmit={this.createRoom}>
        <input type="text" value={this.state.name} placeholder="Room Name" autocomplete="off" onChange={this.handleChange} id="room-input"/>
        <div id="new-room">
          <input type="submit" value="Create" id="room-submit" />
        </div>
        </form>
      );

      return(
        <div className="chat-list">
          <div>{roomForm}</div>
          <ul className="room-names">
            {this.state.rooms.map( room =>
              <li key={room.key} onClick={(e) => this.selectRoom(room, e)}>{room.name}
                <button onClick={ () => this.deleteRoom(room) }>X</button>
              </li>
            )}
          </ul>
        </div>
      );
    }
}

export default RoomList
