import * as React from "react";
import { Renderable } from './Renderable';
import { State } from './State';
import { Lifecycle } from './Lifecycle';

export function Resource<T>(props: {
  createResource(): Promise<T>;
  releaseResource?(resource: T);
  onResourceCreated?(resource: T);
  children: Renderable<{ resource?: T }>;
}) {
  return (
    <State
      initialState={{
        resource: undefined
      }}
    >
      {({ state, setState }) => (
        <Lifecycle
          onDidMount={async () => {
            const resource = await props.createResource();
            setState({
              resource
            });
            props.onResourceCreated && props.onResourceCreated(resource);
          }}
          onWillUnmount={() =>
            props.releaseResource && props.releaseResource(state.resource)
          }
        >
          {props.children({resource: state.resource})}
        </Lifecycle>
      )}
    </State>
  );
}