import {StaunchStore} from "staunch-store";
import {$} from "./utils";

export function bindGlobal(store: StaunchStore, bs, system) {
    const $url = $('[data-bind="url"]');
    store.changes(['global', 'url'])
        .filter(x => x !== null)
        .subscribe(x => {
            $url.textContent = x;
            $url.href = x;
        })
}