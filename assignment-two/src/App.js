import React, { Component } from 'react';
import './App.css';
import Validation from './ValidationComponent/Validation'
import Char from './CharComponent/CharComponent'

class App extends Component {
  state = {
    input : '',
    inputArray : [],
    length : 0,
  }

  stringEnteredHandler = (event) => {
    
    const input = event.target.value;
    const length = input.length;
    const inputArray = input.split('')
    let newArray = [...inputArray];
    inputArray.forEach((element,index) => {
      newArray[index] = {char: element, id: element + Date.now()};
    });

    console.log(newArray)
    this.setState({input: event.target.value, inputArray: newArray, length: length});
  }

  deleteCharHandler = (index) => {
    let strArray = [...this.state.inputArray]
    strArray.splice(index, 1)
    const str = strArray.join('')
    this.setState({input: str, inputArray: strArray, length: strArray.length})
  }

  render() {

    let chars = null;

    if (this.state.inputArray.length > 0) {
      chars = (
        <div>
          {this.state.inputArray.map((char, index) => {
            return (
              <Char 
                click={() => this.deleteCharHandler(index)} 
                char={char.char} 
                index={index}
                key={char.id} />
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
