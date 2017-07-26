// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import {h, render} from 'preact';
import {createStore} from 'staunch-store';
import {Provider} from "./Provider";
import {App} from "./App/components/App.component";
const $ = (selector) => document.querySelector(selector);

const store = createStore();

store.register({
    state: {
        options: {
            loading: false
        }
    }
});

render(<div>
    <Provider store={store}>
        <App />
    </Provider>
</div>, $('body'));

// const {Observable} = require('rxjs');
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
//
// dirs.subscribe(dirs => {
//     // console.log('DIRS BRA');
// });
//
// const ports = Observable.fromEvent($('#port'), 'input', e => e.target.value)
//     .distinctUntilChanged()
//     .debounceTime(500)
//     .map(Number)
//     .map(value => {
//         if (value > 1024 && value < 9999) {
//             return {
//                 valid: true,
//                 value
//             }
//         }
//         return {
//             valid: false,
//             value
//         }
//     })
//     .share();
//
// ports.subscribe((x) => {
//     $('#port-valid').textContent = x.valid ? 'VALID' : 'INVALID - enter a number between 1024 & 9999';
// });
//
// Observable.combineLatest(
//     ports.filter(x => x.valid).pluck('value'),
//     dirs
// ).switchMap(([port, dirs]) => {
//     return bs.ask('init', {server: {port}, serveStatic: dirs})
// })
//     .subscribe(([server, options]) => {
//         d(options);
//         $('#link').href = `http://localhost:${server.address().port}`;
//         $('#link').textContent = `http://localhost:${server.address().port}`;
//     });

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
