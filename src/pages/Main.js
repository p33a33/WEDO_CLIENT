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
            isDeleted: false,
            title: "",
            body: "",
        }
        this.handleInputValue = this.handleInputValue.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleAddOpen = this.handleAddOpen.bind(this)
        this.renderEachTodo = this.renderEachTodo.bind(this)
    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    // render에 직접 적용된 함수를 메소드로 정리했습니다.
    handleAdd = () => {
        const { title, body } = this.state
        axios.post("http://18.216.148.52:5000/todowrite", { title, body })
            .then(res => this.props.todos.push(res.data))
            .then(() => this.handleAddOpen())
            .catch(err => { alert("에러가 발생했습니다. 다시 시도해주세요."); console.log(err) });
    }

    handleAddOpen = () => {
        this.setState({ isAddOpened: !this.state.isAddOpened })
    }

    renderEachTodo = (todos) => { // TodoEntry에 props가 많아서 가독성을 높이기 위해 map내용을 메소드로 따로 뺐습니다.
        todos.map(todo =>
            <TodoEntry
                key={todo.id}
                todo={todo}
                handleInputValue={this.handleInputValue}
                handleFetchTodo={this.props.handleFetchTodo}
                handleEditedData={this.props.handleEditedData} />)
    }

    render() {
        let { isAddOpened } = this.state
        let { todos } = this.props

        return (
            <div>
                <div className="layout">
                    <Link to="/mypage"><h3>Mypage</h3></Link>
                    <h2>Todo List</h2>
                    <button onClick={this.handleAddOpen} style={{ display: isAddOpened ? "none" : "block" }}>add</button> {/*  Add가 열리면 Add 버튼을 숨깁니다. */} {/* TodoEntry가 렌더되는 부분입니다*/}
                    <div className="add-todo" style={{ display: isAddOpened ? "block" : "none" }}> {/*  isAddOpened를 확인하여 렌더합니다. */}
                        <form className="addForm" onSubmit={(e) => { e.preventDefault(); this.handleAdd(); }} >
                            <div><input type="title" placeholder="제목" onChange={this.handleInputValue("title")} /></div>
                            <div><textarea type="body" placeholder="내용" onChange={this.handleInputValue("body")} /></div>
                            <button type="submit">done</button>
                        </form>
                    </div>
                    {todos.map(todo =>
                        <TodoEntry
                            key={todo.id}
                            todo={todo}
                            handleInputValue={this.handleInputValue}
                            handleFetchTodo={this.props.handleFetchTodo}
                            handleEditedData={this.props.handleEditedData} />)}
                </div>
            </div >
        )
    }
}

export default withRouter(Main)