import React from 'react';
import axios from 'axios';
import { Route, Redirect } from "react-router-dom";

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            passwordCheck: null,
            fullname: null,
            nickname: null,
            hasSignedup: false
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

    passwordCheckChange(e) {
        this.setState({
            passwordCheck: e.target.value
        })
    }

    fullnameChange(e) {
        this.setState({
            fullname: e.target.value
        })
    }

    nicknameChange(e) {
        this.setState({
            nickname: e.target.value
        })
    }

    submitHandler() {
        let { email, password, fullname, nickname } = this.state;
        if (this.state.password === this.state.passwordCheck) {
            axios.post(`http://18.216.148.52:5000/signup`, { email, password, fullname, nickname })
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        this.setState({
                            hasSignedup: true
                        })
                    }
                })
        } else {
            return alert("비밀번호가 일치하지 않습니다")
        }
    }

    render() {
        if (this.state.hasSignedup) {
            return <Redirect to="/signin" />
        } else {
            return (
                <div>
                    <div>로그인</div>
                    <div><label> 이메일 <input onChange={this.emailChange.bind(this)} type="text" placeholder="이메일을 입력해주세요" /> </label></div>
                    <div><label> 비밀번호 <input onChange={this.passwordChange.bind(this)} type="password" placeholder="비밀번호를 입력해주세요" /> </label></div>
                    <div><label> 비밀번호 확인 <input onChange={this.passwordCheckChange.bind(this)} type="password" placeholder="비밀번호를 한 번 더 입력해주세요" /> </label></div>
                    <div><label> 이름 <input onChange={this.fullnameChange.bind(this)} type="text" placeholder="이름을 입력해주세요" /> </label></div>
                    <div><label> 닉네임 <input onChange={this.nicknameChange.bind(this)} type="text" placeholder="별명을 입력해주세요" /> </label></div>
                    <div><button onClick={this.submitHandler}> 회원가입 </button></div>
                </div >
            )
        }
    }
}