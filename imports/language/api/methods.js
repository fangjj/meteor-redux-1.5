import { ValidatedMethod } from 'meteor/mdg:validated-method';
import i18n from 'meteor/universe:i18n';

import {LANGUAGE_ALL_METHOD} from '../constant';

const getAllLanguages = new ValidatedMethod({
  name: LANGUAGE_ALL_METHOD,
  validate: null,
  run() {
    return i18n.getLanguages();
  }
});

