import * as React from "react";
import { Renderable } from "./Renderable";

export type StateSpec<S> = {
  state: S;
  setState<K extends keyof S>(
    state:
      | ((prevState: Readonly<S>) => Pick<S, K> | S | null)
      | (Pick<S, K> | S | null),
    callback?: () => void
  ): void;
};

export type StateProps<TState> = {
  initialState?: TState;
  children: Renderable<StateSpec<TState>>;
  deriveFromProps?: any;
};

export class State<TState> extends React.PureComponent<
  StateProps<TState>,
  TState
> {
  constructor(props: StateProps<TState>) {
    super(props);
    this.state = props.initialState;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deriveFromProps) {
      this.setState(nextProps.deriveFromProps);
    }
  }

  render() {
    return this.props.children({
      state: this.state,
      setState: this.setState.bind(this)
    });
  }
}
