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
        {({ state, setState }) => (
          <>
            {state.value < 3 && (
              <Interval
                interval={1000}
                run={() => setState(state => ({ value: state.value + 1 }))}
              />
            )}
            {/* <Div>
              <Text text={state.value} />
            </Div> */}
            <Div>
              <>
                {state.value % 2 === 0 && <Text text="Hello World" />}
                <Text text="Even Better" />
              </>
            </Div>
            {/* {state.value % 2 === 0 && (
              <Div>
                <Text text="Hello World" />
                <Text text="Even Better" />
              </Div>
            )} */}
          </>
        )}
      </State>
    </DOM>
  );
}

render(<App />);
