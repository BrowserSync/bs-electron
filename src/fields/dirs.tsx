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
                <ul class="demo-list-control mdl-list">
                    {dirs.length === 0 && <p>Select a directory, or enter one manually</p>}
                    {dirs.length > 0 && dirs.map(dir => {
                        return (
                            <li class="mdl-list__item">
                                <button class="mdl-button mdl-js-button mdl-button--icon" type="button"
                                        onClick={() => store.dispatch({type: 'removeDir', payload: dir})}>
                                    <i class="material-icons">delete</i>
                                </button>
                                <span class="mdl-list__item-primary-content">
                                  {dir}
                                </span>
                            </li>
                        )
                    })}
                </ul>

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
            return store.dispatch({type: 'setDirs', payload: []})
        })
        .share();
}