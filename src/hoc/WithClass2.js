import React, { Component } from 'react';

/*
//Higher Order Components with function operator
const withClass2 = (WrappedComponent, className) => {
    return (props) => (
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    );
}
*/

//Higher Order Components with class
const withClass2 = (WrappedComponent, className) => {
    return class extends Component{
        render(){
            return <div className={className}>
                <WrappedComponent ref={this.props.forwardedRef} {...this.props}/>
            </div>
        }
    }
}

export default withClass2;