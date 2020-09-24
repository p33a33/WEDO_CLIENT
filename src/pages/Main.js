import React from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import axios from 'axios'

class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            opened: false,
            title: "",
            body: "",
        }
    }
    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };
    render() {
        if (this.state.opened) {
            return <div>
                <Link to="/mypage"><h3>Mypage</h3></Link>
                <div className="layout">
                    <h2>Todo List</h2>
                    {this.props.todos.map((todo) => {
                        return <div className="todo-entry">
                            <div><h3>{todo.title}</h3></div>
                            <div>{todo.body}</div>
                        </div>
                    }
                    )}
                </div>
                <div className="add-todo">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const { title, body } = this.state
                            this.props.todos.push({ title, body })
                            this.setState({ opened: !this.state.opened })
                            //return axios
                            //    .post("http://18.216.148.52:5000/todowrite", { title, body })
                            //    .then(() => this.setState({ opened: !this.state.opened }))
                            //    .catch((err) => {
                            //        alert("에러가 발생했습니다. 다시 시도해주세요.");
                            //        console.log(err);
                            //    });
                        }}
                    >
                        <div>
                            <input type="title" placeholder="제목" onChange={this.handleInputValue("title")}></input>
                        </div>
                        <div>
                            <textarea type="body" placeholder="내용" onChange={this.handleInputValue("body")}></textarea>
                        </div>
                        <button type="submit">done</button>
                    </form>
                </div>
            </div >
        }
        return <div>
            <Link to="/mypage"><h3>Mypage</h3></Link>
            <div className="layout">
                <h2>Todo List</h2>
                {this.props.todos.map((todo) => {
                    return <div className="todo-entry">
                        <div><h3>{todo.title}</h3></div>
                        <div>{todo.body}</div>
                    </div>
                }
                )}
            </div>
            <button onClick={() => { this.setState({ opened: !this.state.opened }) }}>add</button>
        </div>
    }
}

export default withRouter(Main)