import React from 'react';

export function fetchUserInfo (accountsRoot, callback) {
  fetch(new URL('user/', accountsRoot), {
    credentials: "include",
    "headers": {
      "Accept": "application/json",
    },
    "method": "GET"
  }).then(response => response.json())
    .then(data => {
      if (data.username) {
        callback(data);
      } else {
        callback(null)
      }
    })
    .catch(e => console.log(e))
}

class LogInManager extends React.Component {
  // FIXME: make sure we don't update state when this component is unmounted

  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      loginSuccess: false,
      submittingLoginRequest: false,
    }
  }

  setUser = (data) => {
    data.logout = this.sendLogOutRequest;
    this.props.setUser(data);
  }

  componentDidMount() {
    if (this.props.fetchUser) {
      fetchUserInfo(this.props.accountsRoot, (userData) => {
        if (userData) {
          this.setState({loginSuccess: true})
          this.setUser(userData);
        }
      });
    }
  }

  sendLogInRequest = (credentials) => {
    this.setState({submittingLoginRequest: true});
    fetch(new URL('login/', this.props.accountsRoot), {
      credentials: "include",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      "body": JSON.stringify(credentials),
      "method": "POST"
    }).then(response => response.json())
      .then(data => {
        if (data.hasOwnProperty('non_field_errors')) {
          this.setState({submittingLoginRequest: false});
          this.setState(prevState => ({errors: prevState.errors.concat(data['non_field_errors'])}));
          return null;
        }
        return data;
      })
      .then(data => {
        if(data) {
          this.setState({loginSuccess: true});
          fetchUserInfo(this.props.accountsRoot, (userData) => {
            this.setUser(userData);
          });
        }
      })
      .catch(e => {
        console.log(e);
        this.setState({submittingLoginRequest: false});
      });
  };

  sendLogOutRequest = (callback) => {
    fetch(new URL('logout/', this.props.accountsRoot), {
      "credentials": "include",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      "method": "POST"
    }).then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({loginSuccess: false});
        if (callback) {
          callback(data);
        } else {
          this.props.setUser(null);
        }
      })
      .catch(e => console.log(e))
  };

  render() {
    if (this.props.component) {
      const LogInForm = this.props.component;
      return (
        <LogInForm
          {...this.props}
          onSubmit={this.sendLogInRequest}
          logoutUser={this.sendLogOutRequest}
          apiErrors={this.state.errors}
          loginSuccess={this.state.loginSuccess}
          submittingLoginRequest={this.state.submittingLoginRequest}
        />
      )
    } else {
      return this.props.children(this.sendLogInRequest, this.sendLogOutRequest, this.state.loginSuccess, this.state.errors)
    }
  }
}

export default LogInManager;