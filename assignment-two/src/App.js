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
    let newArray = [];
    input.split('').forEach((element, index) => {
      newArray.push({char: element, id: element +  index})
    })
    this.setState({input: input, inputArray: newArray, length: input.length});
  }

  deleteCharHandler = (index) => {
    let strArray = [...this.state.inputArray]
    strArray.splice(index, 1)
    let newStr = [];
    strArray.forEach(element => {
      newStr.push(element.char);
    });
    this.setState({input: newStr.join(''), inputArray: strArray, length: strArray.length})
  }

  render() {
    const style = {
      padding: '2%',
      fontSize: '20px',
      fontFamily: 'Courier New',
      margin: 'auto'
    }

    let chars = null;

    if (this.state.inputArray.length > 0) {
      console.log(this.state.inputArray)
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
      <div style={style} className="App">
        <textarea className="str-input" type='text' onChange={(event) => this.stringEnteredHandler(event)} value={this.state.input}></textarea>
        <p><b>Length:</b> {this.state.length}</p>
        <Validation length={this.state.length}/>
        {chars}
      </div>
    );
  }
}

export default App;
