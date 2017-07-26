const {Observable} = require('rxjs');
const electron = require('electron');
const remote = electron.remote;
const {selectDirectory} = remote.require('./main');

export function SelectDirectory() {
    return {
        methods: {
            'selectMany': function(stream) {
                return stream.flatMap(({respond}) => {
                    return Observable.create(obs => {
                        selectDirectory((res) => {
                            obs.next(respond(res || []));
                            obs.complete();
                        })
                    })
                })
            }
        }
    }
}
