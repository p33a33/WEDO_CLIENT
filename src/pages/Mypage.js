import React from 'react';
import axios from 'axios';
import { withRouter, Link, useHistory } from 'react-router-dom';


class Mypage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            nickname: "",
            oldPassword: "",
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
                <button id='followlist' onClick={() => { this.props.history.push('/followlist') }}> 친구목록</button>
                <button id='gotomypage' onClick={() => { this.props.history.push('/main') }}>Todo List</button>
            </div>
            <div className="edit-user">
                <div className="headerText">개인정보변경</div>
                <div className="edit-nickname">
                    <form className="Form ChangeNickname"
                        onSubmit={(e) => {
                            e.preventDefault();
                            return axios
                                .post("http://ec2-52-79-239-95.ap-northeast-2.compute.amazonaws.com:5000/signeditnickname", {
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
                        <div className="headerText">닉네임 변경</div>
                        <input type="nickname" placeholder="변경할 닉네임" onChange={this.handleInputValue("nickname")}></input>
                        <button className="addButton" type="submit">변경</button>
                    </form>
                </div>
                <div className="edit-password">
                    <form className="Form ChangePassword"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (this.props.userinfo.email === "guest@guest.com") {
                                return alert("게스트는 비밀번호를 변경할 수 없습니다.")
                            }

                            if (this.state.newPassword !== this.state.checkNewPassword) {
                                alert("비밀번호 입력을 다시 확인해주세요.")
                            }
                            else {
                                return axios
                                    .post("http://ec2-52-79-239-95.ap-northeast-2.compute.amazonaws.com:5000/signeditpassword", {
                                        newpassword: this.state.newPassword,
                                        oldpassword: this.state.oldPassword
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

                        <div className="headerText">비밀번호 변경</div>
                        <input type="password" placeholder="현재 비밀번호" onChange={this.handleInputValue("oldPassword")}></input>
                        <div><input type="password" placeholder="새 비밀번호" onChange={this.handleInputValue("newPassword")}></input></div>
                        <div><input type="password" placeholder="새 비밀번호 확인" onChange={this.handleInputValue("checkNewPassword")}></input></div>{/* 현재 비밀번호 ~ 새 비밀번호 확인의 type을 password로 수정했습니다. */}


                        <button className="addButton" type="submit">비밀번호 변경</button>
                    </form>

                </div>
                <button className="addButton"> 회원 탈퇴 </button>

            </div>
        </div>
    }
}

export default withRouter(Mypage)