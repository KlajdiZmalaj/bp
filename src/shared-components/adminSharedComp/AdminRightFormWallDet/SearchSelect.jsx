import React from "react";
import "./SearchSelect.css";
import ClickOut from "react-onclickout";

class SearchSelect extends React.Component {
  state = {
    SearchOptions: false,
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.closeSelect !== prevProps.closeSelect &&
      this.props.closeSelect === true
    ) {
      this.setState({ SearchOptions: false });
    }
  }
  render() {
    const { SearchOptions } = this.state;
    const { UsersToSearch, handleChange, userKey } = this.props;
    return (
      <ClickOut
        onClickOut={() => {
          this.setState({ SearchOptions: false });
        }}
      >
        <div className="Select">
          <div
            className="Select--Header"
            onClick={() => {
              this.setState((state) => ({
                SearchOptions: !state.SearchOptions,
              }));
            }}
          >
            <input
              placeholder="SEARCH USERNAME"
              value={userKey}
              onChange={async (e) => {
                handleChange(e);

                if (SearchOptions === false) {
                  this.setState({
                    SearchOptions: true,
                  });
                }
              }}
            />
            <i className="fal fa-search"></i>
          </div>
          {SearchOptions && (
            <div className="Select--Body">
              {UsersToSearch.filter(
                (user) => user.username.includes(userKey) || userKey === ""
              ).map((user) => {
                return (
                  <div
                    onClick={() => {
                      handleChange({ target: { value: user.username } });
                      this.setState((state) => ({
                        SearchOptions: !state.SearchOptions,
                      }));
                    }}
                    key={user.id}
                    className={`${userKey === user.username ? "active" : ""}`}
                  >
                    {user.username}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </ClickOut>
    );
  }
}
export default SearchSelect;
