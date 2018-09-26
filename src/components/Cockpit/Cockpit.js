import React from 'react';
import classes from './Cockpit.css';
import Aux from '../../hoc/Auxiliary'

const cockpit = (props) => {
    const assignedClasses = [];
    if(props.persons.length <= 2){
      assignedClasses.push(classes.red);
    }

    if(props.persons.length <= 1){
      assignedClasses.push(classes.bold);
    }

    let btnClass = [classes.Button];
    if(props.showPersons){
        btnClass = [classes.Button, classes.Red];
    }

    return (
        <Aux>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working</p>
            <button
                className={btnClass.join(' ')}
                onClick={props.clicked}>Toggle Persons</button>

            <button onClick={props.login}>Log in</button>
        </Aux>
    );
}

export default cockpit;