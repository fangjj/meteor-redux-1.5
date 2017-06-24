/**
 * Created by jim on 2017/6/22.
 */
import injectTapEventPlugin from 'react-tap-event-plugin';
import moment from 'moment';
import moment_locale from 'moment/locale/de';
import Perf from 'react-addons-perf';

const config = () => {
    injectTapEventPlugin();
    moment.updateLocale('de', moment_locale);
    window.Perf = Perf;
};

export default config;