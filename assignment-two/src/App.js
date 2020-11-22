import React, { Component } from 'react';
import './App.css';
import Validation from './ValidationComponent/Validation'

class App extends Component {
  state = {
    input : '',
    length : 0
  }

  stringEnteredHandler = (event) => {
    const input = event.target.value;
    const length = input.length;
    this.setState({input: event.target.value, length: length})
  }

  render() {
    return (
      <div className="App">
        <input type='text' onChange={(event) => this.stringEnteredHandler(event)} value={this.state.input}></input>
        <p>Length: {this.state.length}</p>
        <Validation length={this.state.length}/>
      </div>
    );
  }
}

export default App;
