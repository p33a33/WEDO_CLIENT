import React from 'react';

export default function Signup(props) {
    return (
        <div>
            회원가입
            <form action="http://localhost:5000/signup" method="POST">
                <label> 이메일 <input type="text" placeholder="이메일을 입력해주세요" /> </label>
                <label> 비밀번호 <input type="password" placeholder="비밀번호를 입력해주세요" /> </label>
                <label> 비밀번호확인 <input type="password" placeholder="비밀번호를 한 번 더 입력해주세요" /> </label>
                <label> 이름 <input type="text" /> </label>
                <label> 별명 <input type="text" /> </label>
                <input type="submit" value="회원가입" />
            </form>
        </div>
    )
}