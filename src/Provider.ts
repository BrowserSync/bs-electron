import { Component, h, options, render } from 'preact';
import {StaunchStore} from 'staunch-store';

export const Children = {
    only(children) {
        return children && children[0] || null;
    },
};

export class Provider extends Component<any, any> {
    public store: StaunchStore;
    public path: string[];

    public constructor(props) {
        super(props);
        this.store = props.store;
        this.path = props.path;
    }

    public getChildContext() {
        return { store: this.store, path: this.path, storeSubscription: null };
    }

    public render() {
        return Children.only(this.props.children);
    }
}
