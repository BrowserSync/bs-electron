import {StaunchStore} from "staunch-store";
import {$} from "./utils";

export function bindGlobal(store: StaunchStore, bs, system) {
    const header = $('[data-rx="header"]');
    const link = $('#url');

    store.changes(['global', 'url'])
        .filter(x => x !== null)
        .subscribe(x => {
            link.textContent = x;
            link.href = x;
        })
}