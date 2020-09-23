import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory, Redirect } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import axios from "axios"

class App extends React.Component {
  state = {
    isSignin: false,
    userinfo: {},
    todo: {}
  };

  handleisSigninChange() {
    this.setState({ isSignin: true });
    axios.all([axios.get("http://18.216.148.52:5000/signin"), axios.get("http://18.216.148.52:5000/main")])
      .then(axios.spread((userData, todoData) => {
        this.setState({ userinfo: userData.data });
        this.setState({ todo: todoData.data })
      }))
  }

  render() {
    const { isSignin, userinfo } = this.state;
    console.log(isSignin, userinfo);
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              path="/signin"
              render={() => (
                <Signin
                  isSignin={isSignin}
                  handleisSigninChange={this.handleisSigninChange.bind(this)}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => <Signup isSignin={isSignin} />}
            />
            <Route
              exact
              path="/main"
              render={() => <Main isSignin={isSignin} userinfo={userinfo} />}
            />
            <Route
              path="/"
              render={() => {
                if (isSignin) {
                  return <Redirect to="/main" />;
                }
                return <Redirect to="/signin" />;
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
