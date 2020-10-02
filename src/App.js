import React from 'react';
import './App-1.css';
import { BrowserRouter, Route, Switch, useHistory, Redirect } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Mypage from "./pages/Mypage"
import FollowList from "./pages/FollowList"
import axios from "axios"
import { render } from 'react-dom';

axios.defaults.withCredentials = true;

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isSignin: false,
      userinfo: {},
      todos: [{ title: 123, body: 1234, isClear: false }, { title: 234, body: 2345, isClear: true }, { title: 234, body: 2345, isClear: true }, { title: 234, body: 2345, isClear: true }, { title: 234, body: 2345, isClear: true }, { title: 234, body: 2345, isClear: true }],
      followinfo: [
        { id: 1, user_id: 2, follow_id: 3, fullname: '친구', created_at: 2020 - 9 - 29 },
        { id: 2, user_id: 3, follow_id: 3, fullname: '친구2', created_at: 2020 - 9 - 29 },
        { id: 3, user_id: 4, follow_id: 3, fullname: '친구3', created_at: 2020 - 9 - 29 },
        { id: 4, user_id: 5, follow_id: 3, fullname: '친구4', created_at: 2020 - 9 - 29 },
        { id: 5, user_id: 6, follow_id: 3, fullname: '심규공', created_at: 2020 - 9 - 29 },
        { id: 6, user_id: 7, follow_id: 3, fullname: '김광혁', created_at: 2020 - 9 - 29 },
        { id: 7, user_id: 8, follow_id: 3, fullname: '김은혜', created_at: 2020 - 9 - 29 },
      ], // user_fullname, user_nickname이 필요할 것 같아요! 상태메시지도 추가한다면 상태메시지도 같이! 만약 프로필사진도 추가한다면 같이!
    };
    this.handleisSigninChange = this.handleisSigninChange.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.passwordValidationCheck = this.passwordValidationCheck.bind(this)
    this.handleEditedData = this.handleEditedData.bind(this)
    this.handleFetchTodo = this.handleFetchTodo.bind(this)
    this.handleAddTodo = this.handleAddTodo.bind(this)
    this.getFriendsList = this.getFriendsList.bind(this)
    this.addNewFriend = this.addNewFriend.bind(this)
  }

  handleisSigninChange() {
    this.setState({ isSignin: true });
    axios.all([axios.get("http://localhost:5000/mypage"), axios.get("http://localhost:5000/main")]) // userinfo를 가져오는 url주소를 API문서와 일치시켰습니다 (signin => mypage)
      .then(axios.spread((userData, todoData) => {
        this.setState({ userinfo: userData.data, todos: todoData.data });
      }))
  }
  handleEditedData(record) {
    let temp = this.state.todos
    console.log(record)
    for (let i = 0; i < temp.length; i++) {
      if (record.id === temp[i].id) {
        temp[i] = record
      }
    }
    console.log(temp)
    this.setState({ todos: temp })
  }
  handleFetchTodo(data) {
    this.setState({ todos: data })
  }
  handleAddTodo(data) {
    let temp = this.state.todos
    temp.push(data)
    this.setState({
      todos: temp
    })
  }
  getFriendsList() {
    axios.get("http://localhost:5000/followlist")
      .then(res => {
        let followlist = res.data
        this.setState({ followinfo: followlist })
      })
      .catch(e => console.log(e))
  }

  handleSignout() {
    this.setState({ isSignin: false, userinfo: {}, todos: [] });
    axios
      .post("http://localhost:5000/signout")
      .catch(e => console.log(e))
  }

  addNewFriend = (user) => {
    let temp = this.state.followinfo
    temp.push(user)
    this.setState({
      followinfo: temp
    })
  }

  passwordValidationCheck = (pw) => { // signup과 mypage에서 공통적으로 사용되는 method이기 때문에, app에서 props로 내려주도록 했습니다.
    let num = pw.search(/[0-9]/g);  // 주어진 pw에 0~9사이에 숫자가 있으면 0, 없으면 -1
    let eng = pw.search(/[a-z]/ig); // 주어진 pw에 a~z사이에 문자가 있으면 0, 없으면 -1
    let spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi); // 주어진 pw에 대괄호 안의 특수문자가 있으면 0, 없으면 -1

    if (pw.length < 8 || pw.length > 20) {
      alert("비밀번호는 8~20자 이내입니다.")
      return false;
    } else if (pw.search(/\s/) !== -1) {
      alert("비밀번호에는 공백을 포함할 수 없습니다.")
      return false;
    } else if (num < 0 || eng < 0 || spe < 0) {
      alert("비밀번호에는 숫자, 영문, 특수문자가 포함되어야 합니다")
      return false;
    } else {
      return true
    }
  }

  render() {
    const { isSignin, userinfo, todos, followinfo } = this.state;
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
                  handleisSigninChange={this.handleisSigninChange}
                  history={useHistory}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => <Signup isSignin={isSignin} pwCheck={this.passwordValidationCheck} />}
            />
            <Route
              exact
              path="/mypage"
              render={() => <Mypage isSignin={isSignin} handleSignout={this.handleSignout} userinfo={userinfo} history={useHistory} pwCheck={this.passwordValidationCheck} />}
            />
            <Route
              exact
              path="/main"
              render={() => <Main isSignin={isSignin} userinfo={userinfo} handleSignout={this.handleSignout} todos={todos} handleEditedData={this.handleEditedData} handleFetchTodo={this.handleFetchTodo} handleAddTodo={this.handleAddTodo} followinfo={followinfo} />}
            />
            <Route
              exact
              path="/followlist"
              render={() => <FollowList userinfo={userinfo} isSignin={isSignin} addNewFriend={this.addNewFriend} handleSignout={this.handleSignout} history={useHistory} followinfo={followinfo} />}
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
