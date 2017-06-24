/**
 * Created by jim on 2017/6/23.
 */

import React from 'react';
import List from './List';

import MyLoadable from '/imports/loadable';
import loading from './AddLoading';

const LoadableComponent = MyLoadable({
    loader: () => import('/imports/task/view/Add'),
    delay: 10000,
    loading
});

export default () => {
    return (
        <div>
            <LoadableComponent></LoadableComponent>
            <List></List>
        </div>
    );
};