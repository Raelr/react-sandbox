import React, { Component } from 'react';
import './App.css';
import UserInput from './io/UserInput'
import UserOutput from './io/UserOutput'

class App extends Component {
  state = {
    userName: 'Raelr'
  };

  changeUserNameHandler = (event) => {
    this.setState({
      userName: event.target.value
    });
  }

  render() {

    return (
      <div className="App">
        <UserInput changed={this.changeUserNameHandler} name={this.state.userName}/>
        <UserOutput 
          name={this.state.userName}/>
      </div>
    );
  }
}

export default App;
