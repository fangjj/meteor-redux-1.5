/**
 * Created by jim on 2017/6/23.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addData} from '../action';
import { Random } from 'meteor/random';

class Add extends Component {

    constructor() {
        super(...arguments);
    }

    refInput = (node) => {
        this.input = node;
    }

    onSubmit = (event) => {
        event.preventDefault();
        const input = this.input;
        if(!input.value.trim()){
            return;
        }
        const _id = Random.id();
        this.props.onAdd(_id, input.value.trim());
        input.value ='';
    }

    render() {
        return (
            <div className="task-add">
                <form onSubmit={this.onSubmit}>
                    <input type="text" className="add-input" ref={this.refInput} />
                    <button type="submit" className="add-btn">添加</button>
                </form>
            </div>
        );
    }
}

Add.PropTypes = {
    onAdd: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {};
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAdd: (_id, text) => {
            dispatch(addData(_id, text));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Add);
