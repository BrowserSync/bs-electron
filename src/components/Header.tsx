import {h} from 'preact';
import {IMessage, IMessageTypes, Messages} from "./Messages";
import {GlobalState} from "../configureStore";

export function Header(props: GlobalState) {
    const errorMessages: IMessage[] = props.errors.map(error => ({type: IMessageTypes.Error, text: error}))
    const url = (() => {
        if (props.ready) {
            return <label for="url" class="field__label">URL:{` `}
                <a href={props.url}
                   id="url"
                   title="Open in a new Window"
                   target="_blank">{props.url}</a>
            </label>
        }
        if (props.loading) {
            return <label for="port" class="field__label">Loading, please wait</label>
        }
        return null;
    })();

    return (
        <div>
            <Messages messages={errorMessages} />
            {(props.ready || props.loading)?
            <div class="field field--aligned">
                {url}
            </div>:null
            }
        </div>
    )
}