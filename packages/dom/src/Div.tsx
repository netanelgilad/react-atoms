import * as React from "react";
import { Lifecycle, Variable } from "@react-atoms/core";
import { DOMNodeContext } from "./DOMNodeContext";

export function Div(props: { children: React.ReactNode }) {
  return (
    <Variable
      initialValue={{
        domChildren: [],
        domNode: document.createElement("div")
      }}
    >
      {({ value }) => (
        <DOMNodeContext.Consumer>
          {({ appendChild }) => (
            <Lifecycle
              onDidMount={() => {
                console.log("mount div");
                for (const child of value.domChildren) {
                  value.domNode.appendChild(child);
                }
                appendChild(value.domNode);
              }}
              onWillUnmount={() => {
                value.domNode.remove();
              }}
              getSnapshotBeforeUpdate={() => {
                console.log("getSnapshotBeforeUpdate div");
                const oldChildren = value.domChildren;
                value.domChildren = [];
                return oldChildren;
              }}
              onDidUpdate={() => {
                value.domNode.innerHTML = "";

                for (const child of value.domChildren) {
                  value.domNode.appendChild(child);
                }
                appendChild(value.domNode);
                value.domChildren = [];
                console.log("did update div");
              }}
            >
              <DOMNodeContext.Provider
                value={{
                  appendChild(child) {
                    value.domChildren.push(child);
                  }
                }}
              >
                {props.children}
              </DOMNodeContext.Provider>
            </Lifecycle>
          )}
        </DOMNodeContext.Consumer>
      )}
    </Variable>
  );
}
