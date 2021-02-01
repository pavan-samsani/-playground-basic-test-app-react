import React from "react";

class ErrorBoundary extends React.Component {
  state = { errorInfo: null };
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      errorInfo: errorInfo
    })
  }
  
  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
        </div>
      );
    }
    return this.props.children;
  }  
}

export default ErrorBoundary;