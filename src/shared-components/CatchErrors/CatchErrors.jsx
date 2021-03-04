import React from "react";

export const t = () => {
  document.getElementById("root").innerHTML = "";
};
class CatchError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }
  componentDidMount() {
    //this.t()
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>{"Oh-no! Something went wrong"}</h2>
          <p className="red">
            {this.state.error && this.state.error.toString()}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default CatchError;
