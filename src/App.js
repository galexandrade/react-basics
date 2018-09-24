import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'

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

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
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
    let persons = null;
    let btnClass = '';

    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
              return <ErrorBoundary key={person.id}>
                  <Person
                    click={() => this.deletePersonHandler(index)}
                    name={person.name}
                    age={person.age}                    
                    changed={(event) => this.nameChangedHandler(event, person.id)}/>
                </ErrorBoundary>
          })}
        </div>
      );

      btnClass = classes.Red;
    }

    console.log(persons);

    const assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push(classes.red);
    }

    if(this.state.persons.length <= 1){
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi! I am a react app!!!</h1>
        <p className={assignedClasses.join(' ')}>This is really working</p>
        <button
          className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
        <p>{this.state.otherState}</p>
      </div>
    );

    //return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Hi! I am awsome!!!!'));
  }
}

export default App;
