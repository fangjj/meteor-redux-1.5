/**
 * Created by jim on 2017/6/24.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Toggle.less';

import { connect } from 'react-redux';
import {languageAll, languageSet} from '../action';

class Toggle extends Component {

    constructor() {
        super(...arguments);

    }

    componentDidMount() {
        this.props.languageSet('en');
        this.props.languageAll();
    }

    languageSet = (event, local) => {
        event.preventDefault();
        this.props.languageSet(local);
    }

    renderLanguages() {
        const {all, locale} = this.props;
        return all.map((language) => {
            let content;
            if (language === locale) {
                content = (
                    <span key={language} className="language active">{language}</span>
                );
            } else {
                content = (
                    <a
                        key={language}
                        href="#toggle-language"
                        className="language"
                        onClick={event => this.languageSet(event, language)}
                    >
                        {language}
                    </a>
                );
            }
            return content;
        });
    }

    render() {
        return (
            <div className="language-toggle">
                {this.renderLanguages()}
            </div>
        );
    }
}

Toggle.PropTypes ={
    all: PropTypes.array.isRequired,
    local: PropTypes.string.isRequired,
    languageAll: PropTypes.func.isRequired,
    languageSet: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        all: state.language.all,
        locale: state.language.locale
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        languageAll: () => dispatch(languageAll()),
        languageSet: (local) => dispatch(languageSet(local)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
