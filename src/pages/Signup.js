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

    valueChange = (key) => (e) => {
        this.setState({
            [key]: e.target.value
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