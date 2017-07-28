import {h, render} from 'preact';
import {Observable} from 'rxjs';
import {bindPort} from "./fields/port";
import {configureStore} from "./configureStore";
import {bindDirs} from "./fields/dirs";
import {bindGlobal} from "./global";
import {BrowsersyncInitOutput, BrowsersyncInitResponse} from "bs-lite/dist/Browsersync";
import {bindErrors} from "./errors";

const store = configureStore();
const {init, Methods} = require('bs-lite');
const {bs, system} = init();

// const electron = require('electron');
// const remote = electron.remote;
// const mainProcess = remote.require('./main');

// dirs.subscribe(dirs => {
//     // console.log('DIRS BRA');
// });
//
const ports = bindPort(store, bs, system);
const dirs = bindDirs(store, bs, system);
const glob = bindGlobal(store, bs, system);
bindErrors(store, bs);

const dirUpdates = store.changes(['formInputs', 'inputs', 'dirs'])
    .skip(1)
    .map(x => x.toJS());

const portUpdates = store.changes(['formInputs', 'inputs', 'port'])
    .skip(1);

dirs.subscribe();
ports.subscribe();

Observable.combineLatest(
    portUpdates.debounceTime(500),
    dirUpdates,
)
    .do(x => store.dispatch({type: 'loadingState'}))
    .delay(500)
    .switchMap(([port, dirs]) => {
        return bs.ask(Methods.Init, {server: {port}, serveStatic: dirs})
    })
    .do((resp: BrowsersyncInitResponse) => {
        if (resp.errors.length) {
            console.log('ERRORS', resp.errors);
            return store.dispatch({type: 'initErrors', payload: resp.errors});
        }
        store.dispatch({type: 'initErrors', payload: []});
        store.dispatch({type: 'readyState', payload: {url: `http://localhost:${resp.output.server.address().port}`}});
    })
    .subscribe((output) => {
        // console.log(output);
    });
