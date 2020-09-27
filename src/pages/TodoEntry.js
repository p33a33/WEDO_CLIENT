import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';

class TodoEntry extends React.Component {
    constructor(props) {
        super()
        this.state = {
            isModifyOpened: false,
            title: "",
            body: "",
            id: props.todo.id
        }
        this.handleInputValue = this.handleInputValue.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleModify = this.handleModify.bind(this)
        this.handleModifyOpen = this.handleModifyOpen.bind(this)
    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    }

    // render에 직접 적용된 함수를 메소드로 정리했습니다.
    handleModifyOpen = () => {
        let { isModifyOpened } = this.state
        this.setState({ isModifyOpened: !isModifyOpened })
    }

    handleClear = () => {
        const data = { id: this.props.todo.id }
        axios.post("http://localhost:5000/clear", data)
            .then((res) => { this.props.handleEditedData(res.data); console.log(res) })
            .catch((e) => console.log(e))
    }

    handleDelete = () => {
        const data = { id: this.props.todo.id }
        axios.post("http://localhost:5000/tododelete", data)
            .then((res) => this.props.handleFetchTodo(res.data))
            .then(this.handleModifyOpen)
    }

    handleModify = () => {
        let { title, body, id } = this.state
        let data = { title: title, body: body, id: id }
        axios.post("http://localhost:5000/todoedit", data)
            .then((res) => { this.props.handleEditedData(res.data); console.log(res) })
            .catch((e) => console.log(e))
            .then(this.handleModifyOpen)
    }

    render() {
        let { title, body, isclear } = this.props.todo;
        let { isModifyOpened } = this.state

        return (
            <div>
                <form className="addForm" onSubmit={(e) => { e.preventDefault(); this.handleModify(); }} style={{ display: isModifyOpened ? "block" : "none" }}>
                    <input defaultValue={title} onChange={this.handleInputValue("title")} />
                    <textarea defaultValue={body} onChange={this.handleInputValue("body")} />
                    <span>
                        <button id="deleteButton" onClick={this.handleDelete}>삭제</button>
                        <button type="submit" >수정</button>
                    </span>
                </form>
                <div className="todo-entry" style={{ display: isModifyOpened ? "none" : "block" }}>
                    <div className="todo-title">
                        <h2 style={{ textDecorationLine: isclear ? 'line-through' : '' }}>{title}
                            <span>
                                <button onClick={this.handleModifyOpen}>수정</button>
                                <button onClick={this.handleClear}>clear</button>
                            </span>
                        </h2>
                    </div>
                    <div className="todo-body">
                        <h5 style={{ textDecorationLine: isclear ? 'line-through' : '' }} > {body}</h5>
                    </div>
                </div>
            </div>
        )
    }
}


export default TodoEntry;


