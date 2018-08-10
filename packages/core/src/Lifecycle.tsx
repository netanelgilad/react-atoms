import React = require("react");

export class Lifecycle<TProps = {}, SS = null> extends React.Component<
  TProps & {
    onDidCreate?();
    onDidMount?();
    onWillUnmount?();
    onDidUpdate?(prevProps: Readonly<TProps>, prevState: Readonly<{}>, snapshot?: SS);
    getSnapshotBeforeUpdate?(): SS;
    children?: React.ReactNode;
  },
  {}
> {

  constructor(props) {
    super(props);

    props.onDidCreate && props.onDidCreate();
  }

  componentDidMount() {
    this.props.onDidMount && this.props.onDidMount();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.onDidUpdate && this.props.onDidUpdate(prevProps, prevState, snapshot);
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
