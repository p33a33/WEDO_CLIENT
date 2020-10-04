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
            id: props.todo.id,
            isclear: false,
            isShareOpen: false,
            friendToSearch: '',
            shareTo: []
        }
        this.handleInputValue = this.handleInputValue.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleModify = this.handleModify.bind(this)
        this.handleModifyOpen = this.handleModifyOpen.bind(this)
        this.handleClickTitle = this.handleClickTitle.bind(this)
        this.handleShareOpen = this.handleShareOpen.bind(this)
    }

    componentDidMount() {
        let sharingList = this.props.todo.users.map(users => [users.id, users.full_name])

        this.setState({ shareTo: sharingList })
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
        axios.post("http://localhost:5000/todoclear", data)
            .then((res) => { this.props.handleEditedData(res.data); console.log(res) })
            .catch((e) => console.log(e))
    }
    handleDelete = () => {
        const data = { id: this.props.todo.id }
        axios.post("http://localhost:5000/tododelete", data)
            .then((res) => { this.handleModifyOpen(); this.props.handleFetchTodo(res.data) })
    }
    handleClearforClient() {
        this.setState({ isclear: !this.state.isclear })
    }
    handleShareOpen() {
        this.setState({ isShareOpen: !this.state.isShareOpen })
    }
    handleModify = () => {
        let { title, body, id } = this.state
        let data = { title: title, body: body, id: id }
        console.log(this.props)
        if (title && body) {
            axios.post("http://localhost:5000/todoedit", data)
                .then((res) => { this.props.handleEditedData(res.data); console.log(res) })
                .catch((e) => console.log(e))
                .then(this.handleModifyOpen)

        }
        else {
            alert("내용을 입력해주세요.")
        }
    }
    render() {
        let { title, body, isclear, users } = this.props.todo;
        let { publicOnly } = this.props;
        let { isModifyOpened, isTitleClicked, isShareOpen, friendToSearch, shareTo } = this.state
        return (
            <div >
                <form className={isShareOpen ? "addForm toLeft" : "addForm"} onSubmit={(e) => { e.preventDefault(); this.handleModify(); }} style={{ display: isModifyOpened ? "block" : "none" }}>
                    <input style={{ marginTop: '20px' }} defaultValue={title} onChange={this.handleInputValue("title")} />
                    <textarea defaultValue={body} onChange={this.handleInputValue("body")} />
                    <span className="editFormButtons">
                        <button type="button" className="deleteButton" onClick={this.handleDelete}></button>
                        <button type="submit" className="editOkay"></button>
                        <button type="button" className="cancelButton" onClick={this.handleModifyOpen}></button>
                        <button type="button" className="shareButton" onClick={this.handleShareOpen}></button>
                    </span>
                </form>
                <div className="addForm" id="shareForm-main" style={{ display: isShareOpen ? "" : "none" }}>
                    <input placeholder="친구이름입력" onChange={this.handleInputValue("friendToSearch")}></input>  {/*친구 이름 검색창*/}
                    <button onClick={this.handleAddShareTo} />
                    <div id="shareTo">
                        {shareTo.map(friend =>
                            <div key={friend[0]}>
                                <div className="searchFriendEntry" >
                                    {friend[1]}
                                    <button userid={friend[0]} id="removeToShare" onClick={(e) => this.handleRemoveShareTo(e)} />
                                </div>
                            </div>)}
                    </div>
                </div>
                <ul className="todo-entry" style={{
                    display: isModifyOpened || publicOnly ?
                        publicOnly && !isModifyOpened ?
                            users.length > 0 ? "block" : "none" : "none" : "block"
                }}>
                    <div className="todo-title">
                        <span className="editFormButtons">
                            <button id={isclear ? "done" : "yet"} onClick={this.handleClear} />
                            <button className="itm-modify-btn" style={{ display: isTitleClicked ? 'block' : 'none' }} onClick={this.handleModifyOpen} />
                        </span>
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
                    </div>
                </ul>
            </div >
        )
    }
}
export default TodoEntry;