import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Task } from './task.js';
import {
    TASK_INSERT_METHOD,
    TASK_LIST_METHOD
} from '../constant';

export const insert = new ValidatedMethod({
  name: TASK_INSERT_METHOD,
  validate: new SimpleSchema({
    _id: { type: String },
    text: { type: String },
  }).validator(),
  run(task) {
    return Task.insert(task);
  },
});

export const list = new ValidatedMethod({
  name: TASK_LIST_METHOD,
  validate: null,
  run() {
    return Task.find({}).fetch();
  },
});



// Get list of all method names on Lists
const LISTS_METHODS = _.pluck([
  insert,
  list,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 list operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(LISTS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
