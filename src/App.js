import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id: 1, name: 'Alex',  age: 28},
      {id: 2, name: 'Maria',  age: 26},
      {id: 3, name: 'Juliane',  age: 32}
    ],
    otherState: 'Other state',
    showPersons: false
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        {name: event.target.value,  age: 48},
        {name: 'Maria',  age: 26},
        {name: 'Juliane',  age: 32}
      ]
    });
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);

    this.setState({
      persons: persons
    });
  }

  togglePersonsHandler = () => {
    this.setState({showPersons: !this.state.showPersons});
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

    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
              return <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}/>
          })}
        </div>
      );
    }

    console.log(persons);

    return (
      <div className="App">
        <h1>Hi! I am a react app!!!</h1>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
        <p>{this.state.otherState}</p>
      </div>
    );

    //return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Hi! I am awsome!!!!'));
  }
}

export default App;
