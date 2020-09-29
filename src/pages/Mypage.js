import React from 'react';
import axios from 'axios';
import { withRouter, Link, useHistory } from 'react-router-dom';


class Mypage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            nickname: "",
            newPassword: "",
            checkNewPassword: "",
        }
        this.handleInputValue = this.handleInputValue.bind(this);
    }
    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };
    render() {
        return <div className="pagebox">
            <div className="nav">
                <button id='edit-logout' onClick={() => { this.props.handleSignout(); this.props.history.push('/') }}>로그아웃</button>
                <button id='gotomypage' onClick={() => { this.props.history.push('/main') }}>돌아가기</button>
                <button id='followlist'>친구목록</button>
            </div>
            <div className="edit-user">
                <h1>개인정보변경</h1>
                <div className="edit-nickname">
                    <form className="Form ChangeNickname"
                        onSubmit={(e) => {
                            e.preventDefault();
                            return axios
                                .post("http://localhost:5000/signedit", {
                                    nickname: this.state.nickname
                                })
                                .then(() => {
                                    alert("닉네임이 성공적으로 변경되었습니다.");
                                })
                                .catch((err) => {
                                    alert("에러가 발생했습니다. 다시 시도해주세요.");
                                    console.log(err);
                                });
                        }}>
                        <h2>닉네임 변경</h2>
                        <input type="nickname" placeholder="변경할 닉네임" onChange={this.handleInputValue("nickname")}></input>
                        <button type="submit">변경</button>
                    </form>
                </div>
                <div className="edit-password">
                    <form className="Form ChangePassword"
                        onSubmit={(e) => {
                            //현재 비밀번호 검사는 아직 구현전입니다. 
                            e.preventDefault();
                            if (this.state.newPassword !== this.state.checkNewPassword) {
                                alert("비밀번호 입력을 다시 확인해주세요.")
                            }
                            else {
                                return axios
                                    .post("http://localhost:5000/signedit", {
                                        password: this.state.newPassword
                                    })
                                    .then(() => {
                                        alert("비밀번호가 성공적으로 변경되었습니다.");
                                    })
                                    .catch((err) => {
                                        alert("에러가 발생했습니다. 다시 시도해주세요.");
                                        console.log(err);
                                    });
                            }
                        }}>

                        <h2>비밀번호 변경</h2>
                        <input type="password" placeholder="현재 비밀번호" onChange={this.handleInputValue("curPassword")}></input>
                        <div><input type="password" placeholder="새 비밀번호" onChange={this.handleInputValue("newPassword")}></input></div>
                        <div><input type="password" placeholder="새 비밀번호 확인" onChange={this.handleInputValue("checkNewPassword")}></input></div>{/* 현재 비밀번호 ~ 새 비밀번호 확인의 type을 password로 수정했습니다. */}


                        <button type="submit">비밀번호 변경</button>
                    </form>

                </div>
                <button id="xkfxhl"> 회원 탈퇴 </button>

            </div>
        </div>
    }
}

export default withRouter(Mypage)