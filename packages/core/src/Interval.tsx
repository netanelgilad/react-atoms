import * as React from "react";
import { Lifecycle } from "./Lifecycle";
import { State } from "./State";
import { Renderable } from "./Renderable";

const a: Renderable<{}> = () => <div>asdasd</div>;

export function Interval(props: {
  interval: number;
  run();
  children?: React.ReactNode;
}) {
  return (
    <State
      initialState={{
        timer: undefined
      }}
    >
      {({ state, setState }) => (
        <Lifecycle
          onDidMount={() => {
            const timer = setInterval(props.run, props.interval);
            setState({ timer });
          }}
          onWillUnmount={() => {
            clearInterval(state.timer);
          }}
        >
          {() => <>{props.children}</>}
        </Lifecycle>
      )}
    </State>
  );
}
