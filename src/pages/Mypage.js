import React from 'react';
import axios from 'axios';

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
        return <div className="layout">
            <div className="edit-user">
                <h1>프로필 수정</h1>
                <div className="edit-nickname">
                    <h2>닉네임 변경</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            return axios
                                .post("http://18.216.148.52:5000/signedit", {
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
                            //현재 비밀번호 검사는 아직 구현전입니다. 
                            e.preventDefault();
                            if (this.state.newPassword !== this.state.checkNewPassword) {
                                alert("비밀번호 입력을 다시 확인해주세요.")
                            }
                            else {
                                return axios
                                    .post("http://18.216.148.52:5000/signedit", {
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
                        <input type="cur-password" placeholder="현재 비밀번호" onChange={this.handleInputValue("curPassword")}></input>
                        <input type="new-password" placeholder="새 비밀번호" onChange={this.handleInputValue("newPassword")}></input>
                        <div>
                            <input type="new-password-check" placeholder="새 비밀번호 확인" onChange={this.handleInputValue("checkNewPassword")}></input>
                        </div>
                        <button>비밀번호 변경</button>
                    </form>
                </div>
            </div>
        </div>
    }
}

export default Mypage