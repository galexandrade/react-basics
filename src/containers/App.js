import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  /* CREATE COMPONENTS LIFECYCLE
  1 - constructor(props)
  2 - componentWillMount()
    Exists for historic reasons
  3 - render()
    Render Child Components
  4 - componentDidMount()
  */

  /* UPDATE COMPONENTS LIFECYCLE
  1 - componentWillReceiveProps(nextProps)
  2 - shouldComponentUpdate(nextProps, nextState)
    If TRUE will update. Otherwise won't update
  3 - componentWillUpdate(nextProps, nextState)
  4 - render()
    Update Child Component Props
  5 - componentDidUpdate()
  */

  constructor(props){
    super(props);
    console.log('[App.js] Inside Constructor', props);

    this.state = {
      persons: [
        {id: 1, name: 'Alex',  age: "28"},
        {id: 2, name: 'Maria',  age: 26},
        {id: 3, name: 'Juliane',  age: 32}
      ],
      otherState: 'Other state',
      showPersons: false,
      toggleClicked: 0,
      isAuthenticated: false
    }
  }

  componentWillMount(){
    console.log('[App.js] Inside componentWillMount');
  }

  componentDidMount(){
    console.log('[App.js] Inside componentDidMount');
  }

  /*
  shouldComponentUpdate(nextProps, nextState){
      console.log('[UPDATE App.js] Inside souldComponentUpdate', nextProps, nextState);
      return nextState.persons !== this.state.persons ||
        nextState.showPersons !== this.state.showPersons;
  }
  */

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
    //If you relly on previous state, the best practice is using a function, because it runs assincronously
    this.setState( (prevState, props) => {
      return {
        showPersons: !prevState.showPersons,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  loginHandler = () => {
    this.setState({isAuthenticated: true});
  };

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
      <WithClass classes={classes.App}>
        <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
        <Cockpit
          title={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
          login={this.loginHandler}/>
        <AuthContext.Provider value={this.state.isAuthenticated}>
          {persons}
        </AuthContext.Provider>
        <p>{this.state.otherState}</p>
      </WithClass>
    );

    //return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Hi! I am awsome!!!!'));
  }
}

export default App;
