import {createStore, StaunchStore} from 'staunch-store';
import {fromJS, Set} from "immutable";

export interface GlobalState {
    url: string|null
    ready: boolean
    loading: boolean
    errors: string[]
}

export function configureStore(): StaunchStore {

    const store = createStore();
    const initialGlobal: GlobalState = {
        url: null,
        ready: false,
        loading: false,
        errors: []
    }

    store.register({
        state: {
            global: initialGlobal,
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
                            .set('loading', false)
                            .set('ready', true);
                    },
                    ['loadingState']: function(state, payload) {
                        return state
                            .set('url', null)
                            .set('ready', false)
                            .set('errors', fromJS([]))
                            .set('loading', true);
                    },
                    ['initErrors']: function(state, payload) {
                        return state.set('errors', fromJS(payload));
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