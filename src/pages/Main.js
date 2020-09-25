import React from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import { render } from 'react-dom';
import TodoEntry from "./TodoEntry"

class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            isAddOpened: false,
            isModifyOpened: false,
            isDeleted: false,
            title: "",
            body: "",
        }
        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleModify = this.handleModify.bind(this);
    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    handleModify() {
        this.setState({ isModifyOpened: !this.state.isModifyOpened })
    };

    render() {
        if (this.state.isAddOpened) {
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
                            this.setState({ isAddOpened: !this.state.isAddOpened })
                            //return axios
                            //    .post("http://18.216.148.52:5000/todowrite", { title, body })
                            //    .then(() => this.setState({ isAddOpened: !this.state.isAddOpened }))
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

                {this.props.todos.map((todo, index) => {
                    return <TodoEntry /*key={todo.id}*/ todoKey={index} isModifyOpened={this.state.isModifyOpened}
                        title={todo.title} body={todo.body} handleModify={this.handleModify} handleNewData={this.props.handleNewData} />
                }
                )}
            </div>
            <button onClick={() => { this.setState({ isAddOpened: !this.state.isAddOpened }) }}>add</button>
        </div>
    }
}

export default withRouter(Main)