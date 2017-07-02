import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { List } from './list.js';
import {
    LIST_PUBLIC_METHOD,
    LIST_PRIVATE_METHOD,
    LIST_INSERT_METHOD,
} from '/imports/actions/list/constant';

export const insert = new ValidatedMethod({
  name: LIST_INSERT_METHOD,
  validate: new SimpleSchema({
    locale: { type: String },
  }).validator(),
  run({locale}) {
    return List.insert({}, null, locale);
  },
});

export const list = new ValidatedMethod({
  name: LIST_PUBLIC_METHOD,
  validate: null,
  run() {
    return List.find({}).fetch();
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
