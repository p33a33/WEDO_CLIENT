import React from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
function Main(props) {
    return (
        <div>
            <Link to="/mypage"><h3>Mypage</h3></Link>
            <div className="layout">
                <h2>Todo List</h2>
                {props.todos.map((todo, index) => {
                    return <div className="todo-entry">
                        <div><h3>{index + 1}. {todo.title}</h3></div>
                        <div><b1>{todo.body}</b1></div>
                    </div>
                }
                )}
            </div>

        </div>
    )
}

export default withRouter(Main)