import React, { Component } from 'react';
import { Random } from 'meteor/random'
import TaskComponent from './Task.jsx';
import { Task } from '/imports/api/task/index';
import { connect } from 'react-redux';
import { getTrackerLoader, myCompose } from '/imports/startup/client/store/komposer';

const App = ({tasks}) => {
    return (
        <div className="container">
            <header>
                <h1>Todo List</h1>
            </header>

            <ul>
                {
                    tasks.map(task => {
                        const {_id, text} = task;
                        return (
                            <TaskComponent key={_id} _id={_id} text={text} />
                        );
                    })
                }
            </ul>
        </div>
    );
};


// meteor usage
//const reactiveMapper = (props, onData) => {
//    if (Meteor.subscribe('task.list').ready()) {
//        const tasks = Task.find({ id: props.id }).fetch();
//        onData(null, { tasks });
//    }
//};
//
//const Container = compose(getTrackerLoader(reactiveMapper))(App);

const postDataLoader = (props, onData) => {
    //console.log(props);
    // load data from the server. (using props.id to identify the post)
    // (Here'll we'll use setTimeout for demonstration purpose)
    const timer = setInterval(function() {
        const tasks = [
            {
                _id: 1,
                text: `Hello React Komposer ${Date.now()}`
            }
        ];
        const data = { tasks };
        let error = new Error('Oops. Something is not right.');
        error = null;
        // pass the error
        onData(error, data);
        // send the data as props to the BlogPost component.
        // So, BlogPost will see the post object as a prop.
        //onData(null, data)
    }, 1000);
    // return a function which cleanup the handler
    return () => { clearInterval(timer) }
};


const postDataLoader2 = (props, onData, env) =>{
    // access the redux container and subscribe to that
    return env.store.subscribe((state) => {
        console.log(state);
        onData(null, state);
    });
};



const Container = myCompose(postDataLoader2)(App);
export default Container;

//const mapStateToProps = (state, ownProps) => {
//    console.log(state);
//    return {
//        tasks: state.tasks
//    };
//
//};
//
//const mapDispatchToProps = (dispatch, ownProps) => {
//    return {};
//};
//
//export default connect(mapStateToProps, mapDispatchToProps)(Container);
