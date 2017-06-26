/**
 * Created by jim on 2017/6/23.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Item extends Component {
    constructor() {
        super(...arguments);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps._id !== this.props._id || nextProps.text !== this.props.text;
    }

    render() {
        const {_id, text} = this.props;
        return (
            <li>{`${_id} ${text}`}</li>
        );
    }
}

Item.PropTypes = {
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default Item;