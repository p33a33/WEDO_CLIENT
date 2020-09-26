import React from 'react';
import axios from 'axios';
import { Route, Redirect } from "react-router-dom";

axios.defaults.withCredentials = true;

export default class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            hasAccount: true
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.hasAccountHandler = this.hasAccountHandler.bind(this)
        this.valueChange = this.valueChange.bind(this)
    }

    valueChange = (stateName) => (e) => { // emailChange와 passwordChange를 valueChange로 통합했습니다.
        this.setState({
            [stateName]: e.target.value
        })
    }

    hasAccountHandler = () => { // emailChange와 passwordChange를 valueChange로 통합했습니다.
        this.setState({
            hasAccount: false
        })
    }

    submitHandler = () => {
        let { email, password } = this.state
        if (email && password) {
            axios.post(`http://18.216.148.52:5000/signin`, { email, password })
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        this.props.handleisSigninChange();
                    } else {
                        return alert("이메일이나 비밀번호를 다시 확인해주세요") // 왜 작동 안하져?
                    }
                })
        } else {
            alert("이메일, 비밀번호를 반드시 입력해야합니다")
        }
    }

    render() {
        if (this.props.isSignin) {
            return <Redirect to="/" />
        } else if (!(this.state.hasAccount)) {
            return <Redirect to={`/signup`} />
        }
        else {
            return (
                <div className="signinpagebox">
                    <div className="textbox">
                        <div className="Text Sayhi">
                            안녕하세요? <br></br>
                        좋은 아침이에요</div>
                    </div>
                    <form className="Form Signin" onSubmit={(e) => { e.preventDefault(); this.submitHandler() }}> {/*HTML5 유효성검사를 사용하기 위해 form형식을 사용했으나, 실제로 데이터 전송은 axios를 사용했습니다.*/}
                        <div><label> Email address <input onChange={this.valueChange("email")} type="email" placeholder="이메일을 입력해주세요" /> </label></div> {/* HTML5 내장 이메일 유효성 검사를 진행하도록 수정했습니다 9/24 */}
                        <div><label> Password <input onChange={this.valueChange("password")} type="password" placeholder="비밀번호를 입력해주세요" /> </label></div>
                        <div><button id="Login" type="submit"> 로그인 </button></div>
                        <div id="GoToSignup" onClick={this.hasAccountHandler}>Create a new account</div> {/* /signup 으로 이동하는 Redirect를 구현했습니다*/}
                    </form>
                </div>
            )
        }
    }
}
