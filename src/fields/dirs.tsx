import {h, render} from 'preact';
import {Observable} from 'rxjs';
import {StaunchStore} from "staunch-store";
import {$} from "../utils";

export function bindDirs(store: StaunchStore, bs, system) {
    const {SelectDirectory} = require('../selectDirectory');
    const dir = system.actorOf(SelectDirectory);
    const $dirList = $('#dir-list');
    const $dirSelect = $('#dir-select');
    let prev;

    store.changes(['formInputs', 'inputs', 'dirs'])
        .map(x => x.toJS())
        .subscribe(dirs => {
            prev = render((
                <div>
                    {dirs.length > 0 && dirs.map(dir => {
                        return (
                            <div class="field__item">
                                <input class="field__text-input field__text-input--dir"
                                       type="text"
                                       name="port"
                                       id="directory-01"
                                       value={dir}
                                       disabled />
                                    <div class="field__controls">
                                        <button type="button"
                                                class="button button--icon button--icon-delete"
                                                onClick={() => store.dispatch({type: 'removeDir', payload: dir})}>
                                            <i class="material-icons">delete_forever</i>
                                        </button>
                                    </div>
                            </div>
                        )
                    })}
                </div>

            ), $dirList, prev)
        })

    return Observable.fromEvent($dirSelect, 'click')
        .switchMap((): Observable<string[]> => {
            return dir.ask('selectMany')
        })
        .do(x => {
            if (x.length > 0) {
                return store.dispatch({type: 'addDirs', payload: x})
            }
            // return store.dispatch({type: 'setDirs', payload: []})
        })
        .share();
}