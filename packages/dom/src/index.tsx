import * as React from "react";
import { Lifecycle, State } from "@react-atoms/core";

const ElementContext = React.createContext(undefined);

let currentDomNode = undefined;

export function DOM(props: { domNode: HTMLElement; children: any }) {
  currentDomNode = props.domNode;
  return (
    <ElementContext.Provider
      value={{
        getDomNode: () => currentDomNode,
        setDomNode: domNode => (currentDomNode = domNode)
      }}
    >
      {props.children}
    </ElementContext.Provider>
  );
}

export function Div(props: { children: any }) {
  console.log("render Div");
  const result = (
    <State
      initialState={{
        previousDomNode: undefined,
        domNode: undefined
      }}
    >
      {({ state, setState }) => (
        <ElementContext.Consumer>
          {({ getDomNode, setDomNode }) => (
            <Lifecycle
              onWillMount={() => {
                console.log("will mount div");
                const div = document.createElement("div");
                setState(() => ({
                  previousDomNode: getDomNode(),
                  domNode: div
                }));
                getDomNode().appendChild(div);
                setDomNode(div);
              }}
              onDidMount={() => {
                setDomNode(state.previousDomNode);
              }}
              onWillUnmount={() => {
                console.log("unmount div");
                state.domNode.remove();
              }}
              onDidUpdate={() => {
                console.log("div did update");
              }}
            >
              {() => props.children}
            </Lifecycle>
          )}
        </ElementContext.Consumer>
      )}
    </State>
  );
  console.log("render End Div");
  return result;
}

export function Text(props: { text: string }) {
  console.log("render Text");
  const result = (
    <State
      initialState={{
        domNode: undefined
      }}
    >
      {({ state, setState }) => (
        <ElementContext.Consumer>
          {({ getDomNode, setDomNode }) => (
            <Lifecycle
              onWillMount={() => {
                console.log("will mount text");
                const textNode = document.createTextNode(props.text);
                setState(() => ({
                  domNode: textNode
                }));
                getDomNode().appendChild(textNode);
              }}
              onWillUnmount={() => {
                console.log("unmount text");
                state.domNode.remove();
              }}
              onDidUpdate={() => {
                console.log("text did update");
              }}
            />
          )}
        </ElementContext.Consumer>
      )}
    </State>
  );
  console.log("render End Text");
  return result;
}
