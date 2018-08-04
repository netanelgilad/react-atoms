import * as React from "react";
import { Renderable } from "./Renderable";

export type VariableProps<T extends object> = {
  initialValue: T;
  children: Renderable<{
    getValue: () => T;
    setValue(partial: Partial<T>);
  }>;
};

export class Variable<T extends object> extends React.Component<VariableProps<T>, {}> {
  value: T;

  constructor(props: VariableProps<T>) {
    super(props);

    this.value = props.initialValue;
  }

  render() {
    return this.props.children({
      getValue: () => this.value,
      setValue: partial => {
        this.value = { ...(this.value as any), ...(partial as any) };
      }
    });
  }
}
