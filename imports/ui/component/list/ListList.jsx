/* global alert */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ListList.less';

import { Link } from 'react-router';
import i18n from 'meteor/universe:i18n';
const Text = (text) => i18n.__(text);
import { insert } from '/imports/api/list/methods.js';

class ListList extends Component {
    constructor() {
        super(...arguments);
        //this.createNewList = this.createNewList.bind(this);
    }

    createNewList = () => {
        const { router, locale } = this.props;
        const listId = insert.call({locale}, (err) => {
            console.log(err);
            if (err) {
                router.push('/');
                alert(Text('components.listList.newListError'));
            }
        });
        router.push(`/lists/${listId}`);
    }

    render() {
        const { lists } = this.props;
        return (
            <div className="list-todos">
                <a className="link-list-new" onClick={this.createNewList}>
                    <span className="icon-plus"/>
                    {Text('components.listList.newList')}
                </a>
                {lists.map(list => (
                    <Link to={`/lists/${list._id}`} key={list._id} title={list.name} className="list-todo"
                          activeClassName="active">
                        {list.userId ? <span className="icon-lock"/> : null}
                        {list.incompleteCount ? <span className="count-list">{list.incompleteCount}</span> : null}
                        {list.name}
                    </Link>
                ))}
            </div>
        );
    }
}

ListList.PropTypes = {
    lists: PropTypes.array.isRequired,
    locale: PropTypes.string.isRequired,
};


export default ListList;