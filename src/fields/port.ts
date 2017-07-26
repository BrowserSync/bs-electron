import {$} from "../utils";
import {Observable} from 'rxjs';
import {colors} from "../config";
import {StaunchStore} from "staunch-store";

export interface PortInputResult {
    valid: boolean
    value: number
}

export function bindPort(store: StaunchStore): Observable<PortInputResult> {

    const elem       = $('[data-rx="port"]');
    const input      = $('#port-input', elem);
    const validation = $('#port-validation', elem);
    const icon       = $('#input-icon', elem);

    return Observable.fromEvent(input, 'input', e => e.target.value)
        .distinctUntilChanged()
        .map(Number)
        .map((value): PortInputResult => {
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
        .do(x => {
            validation.textContent = x.valid ? 'VALID' : 'INVALID - enter a number between 1024 & 9999'
        })
        .do(x => {
            elem.classList[x.valid ? 'remove' : 'add']('rx-is-invalid');
        })
        .do(x => {
            icon.textContent = x.valid ? 'done' : 'error_outline';
            icon.style.color = x.valid ? colors.green : colors.red;
        })
        .debounceTime(500)
        .share();
}