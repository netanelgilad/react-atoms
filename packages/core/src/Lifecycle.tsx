import React = require("react");

export class Lifecycle extends React.Component<
  {
    onWillMount?();
    onDidMount?();
    onWillUnmount?();
    onDidUpdate?();
    children?: React.ReactNode;
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
    return this.props.children;
  }

  componentWillUnmount() {
    this.props.onWillUnmount && this.props.onWillUnmount();
  }
}
