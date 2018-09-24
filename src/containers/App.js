import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';


class App extends Component {
  /* LIFECYCLE
  1 - constructor(props)
  2 - componentWillMount()
    Exists for historic reasons
  3 - render()
    Render Child Components
  4 - componentDidMount()  
  */

  constructor(props){
    super(props);
    console.log('[App.js] Inside Constructor', props);

    this.state = {
      persons: [
        {id: 1, name: 'Alex',  age: 28},
        {id: 2, name: 'Maria',  age: 26},
        {id: 3, name: 'Juliane',  age: 32}
      ],
      otherState: 'Other state',
      showPersons: false
    }
  }

  componentWillMount(){
    console.log('[App.js] Inside componentWillMount');
  }

  componentDidMount(){
    console.log('[App.js] Inside componentDidMount');
  }

  /*
  state = {
    persons: [
      {id: 1, name: 'Alex',  age: 28},
      {id: 2, name: 'Maria',  age: 26},
      {id: 3, name: 'Juliane',  age: 32}
    ],
    otherState: 'Other state',
    showPersons: false
  }
  */

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
    console.log('[App.js] Inside render');

    let persons = null;

    if(this.state.showPersons){
      persons = (
        <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}/>
      );
    }

    return (
      <div className={classes.App}>
        <Cockpit 
          title={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}/>
        {persons}
        <p>{this.state.otherState}</p>
      </div>
    );

    //return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Hi! I am awsome!!!!'));
  }
}

export default App;
