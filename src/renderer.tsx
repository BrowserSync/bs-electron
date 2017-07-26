import {h, render} from 'preact';
import {Observable} from 'rxjs';
import {bindPort} from "./fields/port";
import {configureStore} from "./configureStore";

const store = configureStore();

// const {init} = require('bs-lite');
// const electron = require('electron');
// const remote = electron.remote;
// const mainProcess = remote.require('./main');
// const {SelectDirectory} = require('./selectDirectory');
// const $$ = (selector) => document.querySelectorAll(selector);
//
// const {bs, system} = init();
// const d = (incoming) => document.querySelector('#debug').innerHTML = JSON.stringify(incoming, null, 2);
// const d2 = (incoming) => document.querySelector('#debug-2').innerHTML = JSON.stringify(incoming, null, 2);
// const dir = system.actorOf(SelectDirectory);
//
// const dirs = Observable.fromEvent($('#directories'), 'click')
//     .switchMap(() => {
//         return dir.ask('selectMany')
//     })
//     .filter(x => typeof x !== 'undefined')
//     .catch(e => {
//         console.log(e);
//         return Observable.empty();
//     })
//     .share();

// dirs.subscribe(dirs => {
//     // console.log('DIRS BRA');
// });
//
const ports = bindPort(store);


Observable.combineLatest(
    ports.filter(x => x.valid).pluck('value'),
    // dirs
)
    // .switchMap(([port, dirs]) => {
    // return bs.ask('init', {server: {port}, serveStatic: dirs})
// })
    .subscribe((output) => {
        console.log(output);
    });

// dir.ask('selectMany')
//     .subscribe(value => {
//         console.log(value);
//     })
// bs.ask('init')
//     .subscribe(([server, options]) => {
        // d(server.address());
        // mainProcess.selectDirectory((output) => {
        //     d2(output);
        // });
    // })
