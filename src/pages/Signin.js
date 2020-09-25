import React from 'react';
import axios from 'axios';
import { Route, Redirect } from "react-router-dom";

axios.defaults.withCredentials = true;

export default class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null
        }
        this.submitHandler = this.submitHandler.bind(this)
    }

    emailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    passwordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    submitHandler() {
        axios.post(`http://18.216.148.52:5000/signin`, this.state)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.props.handleisSigninChange();
                } else {
                    return alert("아이디나 비밀번호를 다시 확인해주세요") // 왜 작동 안하져?
                }
            })
    }

    render() {
        if (this.props.isSignin) {
            return <Redirect to="/" />
        } else {
            return (
                <div>
                    <div>로그인</div>
                    <div><label> 이메일 <input onChange={this.emailChange.bind(this)} type="text" placeholder="이메일을 입력해주세요" /> </label></div>
                    <div><label> 비밀번호 <input onChange={this.passwordChange.bind(this)} type="password" placeholder="비밀번호를 입력해주세요" /> </label></div>
                    <div><button onClick={this.submitHandler}> 로그인 </button></div>
                </div >
            )
        }
    }
}

