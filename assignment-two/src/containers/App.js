import React, { Component } from 'react';

import styles from './App.module.css';

import Validation from '../components/ValidationComponent/Validation'
import CharList from '../components/CharList/CharList'
import StringInput from '../components/StringInput/StringInput'

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

    return (
      <div className={styles.App}>
        <StringInput 
          stringEntered = {this.stringEnteredHandler}
          length = {this.state.length}
          input = {this.state.input}
        /> 
        <Validation length={this.state.length}/>
        <CharList 
          inputArray = {this.state.inputArray} 
          clicked = {this.deleteCharHandler}/>
      </div>
    );
  }
}

export default App;
