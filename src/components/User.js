import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './../styles/user.css';

class User extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.props.setUser(user);
    });
  }

  signOut() {
    this.props.firebase.auth().signOut().then(() => {
      this.props.setUser(null);
    });
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  render() {
    return(
      <div className="login-btn">
        <button className="sign-in-out" onClick={ this.props.user ? this.signOut.bind(this) : this.signIn.bind(this) }>
          <span>Sign { this.props.user ? 'out' : 'in' }</span>
        </button>
      </div>
      );
    }
}

export default User;
