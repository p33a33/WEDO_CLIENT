import React from 'react';
import axios from 'axios';
import { Route, Redirect } from "react-router-dom";


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

