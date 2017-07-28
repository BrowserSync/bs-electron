import {h} from 'preact';

export enum IMessageTypes {
    Error = 'Error'
}

export interface IMessage {
    type: IMessageTypes
    text: string
}

export interface MessagesProps {
    messages: IMessage[]
}

export function Messages(props: MessagesProps) {
    if (!props.messages.length) {
        return null;
    }
    return (
        <ul class="messages">
            {props.messages.map(e => {
                return (
                    <li class={`message message--error`} key={e.text}>{e.text}</li>
                )
            })}
        </ul>
    )
}