import {Map} from 'immutable';
import {Component, h} from 'preact';

export default function connect(mapStateToProps?, mapDispatchToProps?, path?: string[], name = '') {
    let sub;
    return function(WrappedComponent) {

        return class extends Component<any, any> {

            public sub: any;
            public fns: {[index: string]: () => any};
            public path: string[];

            constructor(props, context) {
                super(props);

                // if (sub) return;

                if (mapDispatchToProps) {
                    this.fns = mapDispatchToProps(context.store.dispatch.bind(context.store), context.store);
                }

                const store = context.store;
                this.path = [].concat(context.path || path).filter(Boolean);

                this.sub = sub = context.store
                    .state$
                    .map((x) => x.getIn(this.path, Map({})))
                    .distinctUntilChanged()
                    .startWith(store.getState().getIn(this.path, Map({})))
                    .withLatestFrom(store.state$.startWith(store.getState()))
                    .subscribe(([subState, state]) => {
                        this.updateState(state, getSubState(this.path, subState));
                    });
            }

            public updateState(state, subState) {
                /**
                 * If the user provided a 'mapStateToProps' function
                 * call it now with the full state object + the sub-state
                 * if they provided it
                 */
                if (mapStateToProps) {
                    return this.setState(mapStateToProps(state, subState, this.props));
                }

                if (this.path.length) {
                    return this.setState(subState);
                }

                this.setState(state);
            }

            public componentWillUnmount() {
                this.sub.unsubscribe();
                sub = null;
            }

            public render() {
                return h(WrappedComponent,  {...this.state, ...this.fns});
            }
        };
    };
}

const getSubState = (path, subState) => {
    return path.length
        ? subState.toJS()
        : subState;
};
