import React from 'react';
import axios from 'axios';
import { withRouter, Link, useHistory } from 'react-router-dom';


class Mypage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            nickname: "",
            curPassword: "",
            newPassword: "",
            checkNewPassword: "",
        }
        this.handleInputValue = this.handleInputValue.bind(this);
    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    render() {
        return <div className="layout">
            <div className="edit-user">
                <h1>프로필 수정</h1>
                <div className="edit-nickname">
                    <h2>닉네임 변경</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            return axios
                                .post("http://18.216.148.52:5000/signeditnickname", { // url을 API문서와 일치시켰습니다. (signedit => signeditnickname)
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
                        <input type="nickname" placeholder="변경할 닉네임" onChange={this.handleInputValue("nickname")}></input>
                        <button type="submit">변경</button>
                    </form>
                </div>
                <div className="edit-password">
                    <h2>비밀번호 변경</h2>
                    <form
                        onSubmit={(e) => {
                            let { pwCheck } = this.props
                            e.preventDefault();
                            if (pwCheck(this.state.newPassword)) { // 새 비밀번호 유효성 검사를 추가하였습니다.
                                if (this.state.newPassword !== this.state.checkNewPassword) {
                                    alert("비밀번호 입력을 다시 확인해주세요.")
                                }
                                else {
                                    return axios
                                        .post("http://18.216.148.52:5000/signeditpassword", { // url을 API문서와 일치시켰습니다. (signedit => signeditpassword)
                                            password: this.state.curPassword,   // this.state의 curPassword를 같이 보내주도록 수정했습니다.
                                            newpassword: this.state.newPassword
                                        })
                                        .then(() => {
                                            alert("비밀번호가 성공적으로 변경되었습니다.");
                                        })
                                        .catch((err) => {
                                            alert("에러가 발생했습니다. 다시 시도해주세요.");
                                            console.log(err);
                                        });
                                }
                            }
                        }}>
                        <input type="password" placeholder="현재 비밀번호" onChange={this.handleInputValue("curPassword")}></input>
                        <input type="password" placeholder="새 비밀번호" onChange={this.handleInputValue("newPassword")}></input>
                        <div>
                            <input type="password" placeholder="새 비밀번호 확인" onChange={this.handleInputValue("checkNewPassword")}></input> {/* 현재 비밀번호 ~ 새 비밀번호 확인의 type을 password로 수정했습니다. */}
                        </div>
                        <button type="submit">비밀번호 변경</button>
                    </form>
                </div>
                <div className='edit-logout'>
                    <button onClick={() => { this.props.handleSignout(); this.props.history.push('/') }}>로그아웃</button>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Mypage)