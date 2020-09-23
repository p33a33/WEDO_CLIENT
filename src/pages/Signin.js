import React from 'react';

export default function Signin(props) {
    return (
        <div>
            로그인
            <form action="http://localhost:5000/signin" method="POST">
                <label> 이메일 <input type="text" placeholder="이메일을 입력해주세요" /> </label>
                <label> 비밀번호 <input type="password" placeholder="비밀번호를 입력해주세요" /> </label>
                <input type="submit" value="로그인" />
            </form>
        </div>
    )
}

