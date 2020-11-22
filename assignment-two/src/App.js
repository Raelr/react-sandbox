import React, { Component } from 'react';
import './App.css';
import Validation from './ValidationComponent/Validation'
import Char from './CharComponent/CharComponent'

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

    const inputArray = this.state.input.split('')

    let chars = null;

    if (inputArray.length > 0) {
      chars = (
        <div>
          {inputArray.map((char, index) => {
            return (
              <Char char={char} />
            );
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <input type='text' onChange={(event) => this.stringEnteredHandler(event)} value={this.state.input}></input>
        <p>Length: {this.state.length}</p>
        <Validation length={this.state.length}/>
        {chars}
      </div>
    );
  }
}

export default App;
