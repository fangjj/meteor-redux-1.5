import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Task extends Component {
    render() {
        return (
            <li>{this.props._id + ' '+this.props.text}</li>
        );
    }
}

Task.PropTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: PropTypes.object.isRequired,
};