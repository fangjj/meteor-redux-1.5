/**
 * Created by jim on 2017/6/21.
 */

const fakeDelay = (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

export default fakeDelay;