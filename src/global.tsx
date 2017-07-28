import {h, render} from 'preact';
import {StaunchStore} from "staunch-store";
import {$} from "./utils";
import {Header} from "./components/Header";

export function bindGlobal(store: StaunchStore, bs, system) {
    const header = $('#rx-header');
    let prev;

    store.changes(['global'])
        .map(x => x.toJS())
        .subscribe(x => {
            prev = render(<Header {...x} />, header, prev);
        })
}