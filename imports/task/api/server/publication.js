/**
 * Created by jim on 2017/6/22.
 */
import { Meteor } from 'meteor/meteor';
import { Task } from '../task.js';
import {TASK_LIST_SUBSCRIPTION} from '../../constant';

Meteor.publish(TASK_LIST_SUBSCRIPTION, () => {
    return Task.find({});
});