import React = require("react");

export class Lifecycle extends React.Component<
  {
    onDidMount?();
    onWillUnmount?();
    onDidUpdate?();
    getSnapshotBeforeUpdate?();
    children?: React.ReactNode;
  },
  {}
> {
  componentDidMount() {
    this.props.onDidMount && this.props.onDidMount();
  }

  componentDidUpdate() {
    this.props.onDidUpdate && this.props.onDidUpdate();
  }

  getSnapshotBeforeUpdate() {
    return this.props.getSnapshotBeforeUpdate
      ? this.props.getSnapshotBeforeUpdate()
      : null;
  }

  render() {
    return this.props.children || null;
  }

  componentWillUnmount() {
    this.props.onWillUnmount && this.props.onWillUnmount();
  }
}
