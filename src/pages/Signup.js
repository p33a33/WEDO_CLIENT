import React from 'react';
import axios from 'axios';
import { Route, Redirect } from "react-router-dom";

axios.defaults.withCredentials = true;

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

    redirectHandler = () => {
        this.setState({
            hasSignedup: !this.state.hasSignedup
        })
    }

    submitHandler() {
        let { email, password, fullname, nickname } = this.state;
        let { pwCheck } = this.props
        if (email && password && fullname && nickname) { // 빈 칸이 없어야 다음 단계로 넘어갑니다.
            if (pwCheck(password)) { // 데이터 전송 전 비밀번호의 유효성을 검사합니다.
                if (this.state.password === this.state.passwordCheck) {
                    axios.post(`http://localhost:5000/signup`, { email, password, fullname, nickname })
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
        } else {
            alert("빈 칸을 채워주세요")
        }
    }

    render() {
        if (this.state.hasSignedup) {
            return <Redirect to="/signin" />
        } else
            return (
                <div id="SignupPage">
                    <form className="Form Signup" onSubmit={(e) => { e.preventDefault(); this.submitHandler(); }}> {/*HTML5 유효성검사를 사용하기 위해 form형식을 사용했으나, 실제로 데이터 전송은 axios를 사용했습니다.*/}
                        <label>이메일
                                <div className="signInput">
                                <input onChange={this.valueChange("email")} type="email" placeholder="이메일을 입력해주세요" />
                            </div>
                        </label> {/* HTML5 내장 이메일 유효성 검사를 진행하도록 수정했습니다 9/24 */}
                        <label>비밀번호
                            <div className="signInput">
                                <input onChange={this.valueChange("password")} type="password" placeholder="비밀번호를 입력해주세요" />
                            </div>
                        </label>
                        <label>비밀번호 확인
                            <div className="signInput">
                                <input onChange={this.valueChange("passwordCheck")} type="password" placeholder="비밀번호를 한 번 더 입력해주세요" />
                            </div>
                        </label>
                        <label>이름
                            <div className="signInput">
                                <input onChange={this.valueChange("fullname")} type="text" placeholder="이름을 입력해주세요" />
                            </div>
                        </label>
                        <label> 닉네임
                            <div className="signInput">
                                <input onChange={this.valueChange("nickname")} type="text" placeholder="별명을 입력해주세요" />
                            </div>
                        </label>
                        <div><button type="submit"> 회원가입 </button></div>
                        <div><button onClick={this.redirectHandler}> 돌아가기 </button></div>  {/* 회원가입 페이지에서 Signin 페이지로의 Redirect를 구현했습니다.*/}
                    </form>
                </div >
            )
    }
}