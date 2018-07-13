import React = require("react");
import { Renderable } from "@botique/react-behavior/lib/Renderable";

export class Lifecycle extends React.Component<
  {
    onWillMount?();
    onDidMount?();
    onWillUnmount?();
    onDidUpdate?();
    children?: Renderable<{}>;
  },
  {}
> {
  componentWillMount() {
    this.props.onWillMount && this.props.onWillMount();
  }
  
  componentDidMount() {
    this.props.onDidMount && this.props.onDidMount();
  }

  componentDidUpdate() {
    this.props.onDidUpdate && this.props.onDidUpdate();
  }

  render() {
    if (!this.props.children) {
      return null;
    }
    return this.props.children({});
  }

  componentWillUnmount() {
    this.props.onWillUnmount && this.props.onWillUnmount();
  }
}
