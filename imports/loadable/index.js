/**
 * Created by jim on 2017/6/24.
 */

import Loadable from 'react-loadable';
import Loading from './view/Loading';
import fakeDelay from './fakeDelay';

export default ({loader, loading = Loading, delay = 0}) => {
    return  Loadable({
        //delay,
        loader: () => fakeDelay(delay).then(() => {
            return loader();
        }),
        loading
    });
};
