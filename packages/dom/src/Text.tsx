import * as React from "react";
import { Lifecycle, Variable } from "@react-atoms/core";
import { DOMNodeContext } from "./DOMNodeContext";

export function Text(props: { text: string | number }) {
  return (
    <Variable
      initialValue={{
        domNode: document.createTextNode(String(props.text))
      }}
    >
      {({ value }) => (
        <DOMNodeContext.Consumer>
          {({ appendChild }) => (
            <Lifecycle
              onDidMount={() => {
                console.log("mount text", props.text);

                appendChild(value.domNode);
              }}
              onWillUnmount={() => {
                value.domNode.remove();
              }}
              onDidUpdate={() => {
                console.log("did update", props.text);
                value.domNode.nodeValue = "" + props.text;
                appendChild(value.domNode);
              }}
            />
          )}
        </DOMNodeContext.Consumer>
      )}
    </Variable>
  );
}
