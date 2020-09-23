import React from 'react';

export default function Main(props) {
    return (
        <div> todo가 표시되는 공간입니다.
            {props.todos.map(todo => (
                <>
                    <div>제목 : {todo.title}</div>
                    <div>내용 : {todo.body}</div>
                </>
            )
            )}
        </div>
    )
}