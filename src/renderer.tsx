import {h, render} from 'preact';
import {Observable} from 'rxjs';
import {bindPort} from "./fields/port";
import {configureStore} from "./configureStore";
import {bindDirs} from "./fields/dirs";
import {bindGlobal} from "./global";

const store = configureStore();
const {init} = require('bs-lite');
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

Observable.combineLatest(
    ports.filter(x => x.valid)
        .pluck('value')
        .startWith(store.getState(['formInputs', 'inputs', 'port'])),
    Observable.merge(dirs, store.changes(['formInputs', 'inputs', 'dirs']).map(x => x.toJS()).skip(1))
)
    .switchMap(([port, dirs]) => {
        return bs.ask('init', {server: {port}, serveStatic: dirs})
    })
    .do(([server, options]) => {
        store.dispatch({type: 'readyState', payload: {url: `http://localhost:${server.address().port}`}});
    })
    .subscribe((output) => {
        console.log('both', output);
    });
