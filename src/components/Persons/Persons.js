import React, { PureComponent } from 'react';
import Person from './Person/Person';

/*
Has a comparizon on the method shouldComponentUpdate that look each change
*/
class Persons extends PureComponent{
    constructor(props){
        super(props);
        console.log('[Persons.js] Inside Constructor', props);
        this.lastPersonRef = React.createRef();
    }

    componentWillMount(){
        console.log('[Persons.js] Inside componentWillMount');
    }

    componentDidMount(){
        console.log('[Persons.js] Inside componentDidMount');
        this.lastPersonRef.current.focus();
    }

    componentWillReceiveProps(nextProps){
        console.log('[UPDATE Persons.js] Inside componentWillReceiveProps', nextProps);
    }

    /*
    shouldComponentUpdate(nextProps, nextState){
        console.log('[UPDATE Persons.js] Inside souldComponentUpdate', nextProps, nextState);
        return nextProps.persons !== this.props.persons;
    }
    */

    componentWillUpdate(nextProps, nextState){
        console.log('[UPDATE Persons.js] Inside componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate(){
        console.log('[UPDATE Persons.js] Inside componentDidUpdate');
    }

    render() {
        console.log('[Persons.js] Inside render');

        return this.props.persons.map((person, index) => {
            return <Person
                forwardedRef={this.lastPersonRef}
                key={person.id}
                position={index}
                click={() => this.props.clicked(index)}
                name={person.name}
                age={person.age}
                changed={(event) => this.props.changed(event, person.id)}/>
        });
    }
}

export default Persons;