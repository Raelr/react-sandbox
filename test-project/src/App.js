import React, { Component } from 'react';
import Person from './Person/Person'
import './App.css';

class App extends Component {
  state = {
    persons: [
      {name: "Aryeh", age: 24},
      {name: "Hillel", age: 23},
      {name: "Menchy", age: 22}
    ],
    showPersons: false
  }

  switchNameHandler = (newName) => {
    this.setState({persons: [
      {name: newName, age: 24},
      {name: "Hillel", age: 23},
      {name: "Menchy", age: 26}
    ]})
  }

  nameChangedHandler = (event) => {
    this.setState({persons: [
      {name: "Aryeh", age: 24},
      {name: event.target.value, age: 23},
      {name: "Menchy", age: 26}
    ]})
  }

  togglePersonsHandler = () => {
    const isShowing = this.state.showPersons
    this.setState({showPersons: !isShowing})
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
    return (
      <div className="App">
        <h1>Hi, I'm a React app!</h1>
        <p>This is really working!</p>
        <button
          style={style} 
          onClick={this.togglePersonsHandler}>Show Persons</button>
        { this.state.showPersons ? 
          <div>
            <Person 
              name={this.state.persons[0].name} 
              age={this.state.persons[0].age} />
            <Person 
              name={this.state.persons[1].name} 
              age={this.state.persons[1].age} 
              click={this.switchNameHandler.bind(this, "Aryeh")}
              changed={this.nameChangedHandler} >My Hobbies: Gaming</Person>
            <Person 
              name={this.state.persons[2].name} 
              age={this.state.persons[2].age} />
        </div> : null}
      </div>
    );
  }
}

export default App;
