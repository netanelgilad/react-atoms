import * as React from "react";
import { DOMNodeContext } from "./DOMNodeContext";
import { Variable, Lifecycle } from "@react-atoms/core";

export function DOM(props: {
  domNode: HTMLElement;
  children: React.ReactNode;
}) {
  return (
    <Variable
      initialValue={{
        domChildren: [],
        domNode: props.domNode
      }}
    >
      {({ value }) => (
        <Lifecycle
          onDidMount={() => {
            console.log("mount dom");
            for (const child of value.domChildren) {
              value.domNode.appendChild(child);
            }
            value.domChildren = [];
          }}
          onWillUnmount={() => {
            value.domNode.innerHTML = "";
          }}
          getSnapshotBeforeUpdate={() => {
            console.log("getSnapshotBeforeUpdate dom");
            return value.domChildren;
          }}
          onDidUpdate={() => {
            value.domNode.innerHTML = '';

            for (const child of value.domChildren) {
              value.domNode.appendChild(child);
            }

            value.domChildren = [];

            console.log("did update dom");
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
    </Variable>
  );
}
