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
        this.valueChange = this.valueChange.bind(this)
    }

    passwordValidationCheck = (pw) => {
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

    valueChange = (key) => (e) => {
        this.setState({
            [key]: e.target.value
        })
    }

    submitHandler() {
        let { email, password, fullname, nickname } = this.state;

        if (this.passwordValidationCheck(password)) {
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
    }

    render() {
        if (this.state.hasSignedup) {
            return <Redirect to="/signin" />
        } else {
            return (
                <div>
                    <form onSubmit={(e) => { e.preventDefault(); this.submitHandler(); }}> {/*HTML5 유효성검사를 사용하기 위해 form형식을 사용했으나, 실제로 데이터 전송은 axios를 사용했습니다.*/}
                        <div>로그인</div>
                        <div><label> 이메일 <input onChange={this.valueChange("email")} type="email" placeholder="이메일을 입력해주세요" /> </label></div> {/* HTML5 내장 이메일 유효성 검사를 진행하도록 수정했습니다 9/24 */}
                        <div><label> 비밀번호 <input onChange={this.valueChange("password")} type="password" placeholder="비밀번호를 입력해주세요" /> </label></div>
                        <div><label> 비밀번호 확인 <input onChange={this.valueChange("passwordCheck")} type="password" placeholder="비밀번호를 한 번 더 입력해주세요" /> </label></div>
                        <div><label> 이름 <input onChange={this.valueChange("fullname")} type="text" placeholder="이름을 입력해주세요" /> </label></div>
                        <div><label> 닉네임 <input onChange={this.valueChange("nickname")} type="text" placeholder="별명을 입력해주세요" /> </label></div>
                        <div><button type="submit"> 회원가입 </button></div>
                    </form>
                </div >
            )
        }
    }
}