import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { Motion, spring } from "react-motion"
class TodoEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: {},
            isTitleClicked: false,
            isModifyOpened: false,
            title: props.todo.title,
            body: props.todo.body,
            id: props.todo.id
        }
        this.handleInputValue = this.handleInputValue.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleModify = this.handleModify.bind(this)
        this.handleModifyOpen = this.handleModifyOpen.bind(this)
        this.handleClickTitle = this.handleClickTitle.bind(this)
    }
    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    }
    handleClickTitle = () => {
        this.setState({ isTitleClicked: !this.state.isTitleClicked })
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
            .then((res) => { this.handleModifyOpen(); this.props.handleFetchTodo(res.data) })
    }
    handleModify = () => {
        let { title, body, id } = this.state
        let data = { title: title, body: body, id: id }
        console.log(this.props)
        axios.post("http://localhost:5000/todoedit", data)
            .then((res) => { this.props.handleEditedData(res.data); console.log(res) })
            .catch((e) => console.log(e))
            .then(this.handleModifyOpen)
    }
    render() {
        let { title, body, isclear, id } = this.props.todo;
        let { isModifyOpened, isTitleClicked } = this.state
        return (
            <div>
                <form className="addForm" onSubmit={(e) => { e.preventDefault(); this.handleModify(); }} style={{ display: isModifyOpened ? "block" : "none" }}>
                    <input defaultValue={title} onChange={this.handleInputValue("title")} />
                    <textarea defaultValue={body} onChange={this.handleInputValue("body")} />
                    <span>
                        <button type="button" id="deleteButton" onClick={this.handleDelete}></button>
                        <button type="submit" id="editOkay"></button>
                        <button type="button" id="cancelButton" onClick={this.handleModifyOpen}></button>
                    </span>
                </form>
                <ul className="todo-entry" style={{ display: isModifyOpened ? "none" : "block" }}>
                    <li className="todo-title">
                        <button className="itm-modify-btn" style={{ display: isTitleClicked ? 'block' : 'none' }} onClick={this.handleModifyOpen}></button>
                        <button id={isclear === 1 ? "clear" : "yet"} onClick={this.handleClear}></button>
                        <h2 style={{ textDecorationLine: isclear ? 'line-through' : '' }} onClick={this.handleClickTitle}>{title}</h2>
                        {isTitleClicked ?
                            <Motion defaultStyle={{ y: -100, opacity: 0 }} style={{ y: spring(0), opacity: spring(1) }}>
                                {(style) => (<li className="todo-body" style={{ transform: `translateY(${style.y}px)`, opacity: style.opacity }}>
                                    <h5 style={{ textDecorationLine: isclear ? 'line-through' : '' }}>{body}</h5>
                                </li>)}
                            </Motion>
                            : ''
                        }

                        {/* <h5 style={{ textDecorationLine: isclear ? 'line-through' : '', display: isTitleClicked ? 'block' : 'none'}} > {body}</h5> */}
                    </li>
                </ul>
            </div >
        )
    }
}
export default TodoEntry;