// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {Observable} = require('rxjs');
const {init} = require('bs-lite');
const electron = require('electron');
const remote = electron.remote;
const mainProcess = remote.require('./main');
const {SelectDirectory} = require('./src/selectDirectory');
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const {bs, system} = init();
const d = (incoming) => document.querySelector('#debug').innerHTML = JSON.stringify(incoming, null, 2);
const d2 = (incoming) => document.querySelector('#debug2').innerHTML = JSON.stringify(incoming, null, 2);
const dir = system.actorOf(SelectDirectory);

const dirs = Observable.fromEvent($('#directories'), 'click')
    .switchMap(() => {
        return dir.ask('selectMany')
    })
    .share();

dirs.subscribe(dirs => {
    // console.log('DIRS BRA');
});

const ports = Observable.fromEvent($('#port'), 'input', e => e.target.value)
    .distinctUntilChanged()
    .map(Number)
    .map(value => {
        if (value > 1024 && value < 9999) {
            return {
                valid: true,
                value
            }
        }
        return {
            valid: false,
            value
        }
    })
    .share();

ports.subscribe((x) => {
    $('#port-valid').textContent = x.valid ? 'VALID' : 'INVALID - enter a number between 1024 & 9999';
});

Observable.combineLatest(
    ports.filter(x => x.valid).pluck('value'),
    dirs
).switchMap(([port, dirs]) => {
    return bs.ask('init', {port, serveStatic: dirs})
})
    .subscribe(([server, options]) => {
        d(options);
        d2(server.address());
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
