import { render, State, Interval } from "@react-atoms/core";
import { DOM, Text, Div } from "@react-atoms/dom";
import * as React from "react";

export function App() {
  return (
    <DOM domNode={document.getElementById("root")!}>
      <State
        initialState={{
          value: 0
        }}
      >
        {({ state, setState }) => { console.log({state}); return (
          <Interval
            interval={1000}
            run={() => {
              console.log(state.value);
              setState((state: any) => ({ value: state.value + 1 }));
            }}
          >
            <Div>
              <Text text={state.value} />
            </Div>
            <Div>
              {state.value % 2 === 0 && <Text text="Hello World" />}
              <Text text="Even Better" />
            </Div>
            {state.value % 2 === 0 && (
              <Div>
                <Text text="Hello World" />
                <Text text="Even Better" />
              </Div>
            )}
          </Interval>
        )}}
      </State>
    </DOM>
  );
}

render(<App />);
