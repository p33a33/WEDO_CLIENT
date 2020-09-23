import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory, Redirect } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Mypage from "./pages/Mypage"
import axios from "axios"

class App extends React.Component {
  state = {
    isSignin: false,
    userinfo: {},
    todos: [{ title: "운동", body: "요가 30분, 강아지랑 산책 1시간하기" }, { title: "블로깅", body: "리액트 개념정리, 회고록 작성" }, { title: "영양제 챙겨먹기", body: "비타민제 2알, 유산균 아침에 한알씩" }]
  };

  handleisSigninChange() {
    this.setState({ isSignin: true });
    axios.all([axios.get("http://18.216.148.52:5000/signin"), axios.get("http://18.216.148.52:5000/main")])
      .then(axios.spread((userData, todoData) => {
        this.setState({ userinfo: userData.data });
        this.setState({ todos: todoData.data })
      }))
  }

  render() {
    const { isSignin, userinfo, todos } = this.state;
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
              path="/mypage"
              render={() => <Mypage isSignin={isSignin} userinfo={userinfo} />}
            />
            <Route
              exact
              path="/main"
              render={() => <Main isSignin={isSignin} userinfo={userinfo} todos={todos} />}
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
