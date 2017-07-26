import {createStore, StaunchStore} from 'staunch-store';
import {fromJS} from "immutable";

export function configureStore(): StaunchStore {

    const store = createStore();

    store.register({
        state: {
            options: {
                loading: false
            },
            formInputs: {
                inputs: {
                    port: 3000,
                    dirs: [],
                },
                values: {
                    port: null,
                    dirs: []
                }
            },
        },
        reducers: [
            {
                path: ['formInputs', 'inputs'],
                reducers: {
                    'setPort': function (state, payload) {
                        return state.set('port', payload);
                    },
                    'setDirs': function (state, payload) {
                        return state.set('dirs', fromJS(payload));
                    }
                }
            }
        ]
    });

    return store;
}