import React, { Component } from 'react';
import Person from './Person/Person'
import './App.css';

class App extends Component {
  state = {
    persons: [
      {id: 'a', name: "Aryeh", age: 24},
      {id: 'b', name: "Hillel", age: 23},
      {id: 'c', name: "Menchy", age: 22}
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

  nameChangedHandler = (event, id) => {

    const personIdx = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIdx]
    }

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIdx] = person;

    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const isShowing = this.state.showPersons
    this.setState({showPersons: !isShowing})
  }

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({persons: persons})
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React app!</h1>
        <p>This is really working!</p>
        <button
          style={style} 
          onClick={this.togglePersonsHandler}>Show Persons</button>
          {persons}
      </div>
    );
  }
}

export default App;
