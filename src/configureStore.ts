import {createStore, StaunchStore} from 'staunch-store';
import {fromJS, Set} from "immutable";

export function configureStore(): StaunchStore {

    const store = createStore();

    store.register({
        state: {
            global: {
                url: null,
                ready: false,
            },
            options: {
                loading: false
            },
            formInputs: {
                inputs: {
                    port: null,
                    dirs: Set([]),
                },
                values: {
                    port: null,
                    dirs: Set([]),
                }
            },
        },
        reducers: [
            {
                path: ['global'],
                reducers: {
                    ['readyState']: function(state, payload) {
                        return state
                            .set('url', payload.url)
                            .set('readyState', true);
                    }
                }
            },
            {
                path: ['formInputs', 'inputs'],
                reducers: {
                    'setPort': function (state, payload) {
                        return state.set('port', payload);
                    },
                    'setDirs': function (state, payload) {
                        return state.set('dirs', fromJS(payload).toSet());
                    },
                    'addDirs': function (state, payload) {
                        return state.update('dirs', dirs => dirs.concat(payload));
                    },
                    'removeDir': function (state, dir) {

                        return state.update('dirs', dirs => {
                            return dirs.delete(dir);
                        });
                    }
                }
            }
        ]
    });

    return store;
}