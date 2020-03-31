import React from "react";

export default class CommonErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, myError: "" };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    console.log("error", error);
    console.log("info", info);
    this.setState({ hasError: true, myError: error });
    // You can also log the error to an error reporting service
    //  logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <div>{this.state.myError}</div>
        </div>
      );
    }
    return this.props.children;
  }
}
