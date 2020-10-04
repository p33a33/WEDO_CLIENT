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
            newShareTo: [],
            shareTo: [],
            friendToSearch: '',
        }
        this.handleInputValue = this.handleInputValue.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleModify = this.handleModify.bind(this)
        this.handleModifyOpen = this.handleModifyOpen.bind(this)
        this.handleClickTitle = this.handleClickTitle.bind(this)
        this.handleIsShareOpen = this.handleIsShareOpen.bind(this)
        this.handleAddShareTo = this.handleAddShareTo.bind(this)
        this.handleRemoveShareTo = this.handleRemoveShareTo.bind(this)
    }

    componentDidMount() {
        console.log(this.props.todo.users)
        let sharingList = this.props.todo.users.map(users => [users.id, users.full_name])

        this.setState({ shareTo: sharingList })
    }
    handleIsShareOpen = () => {
        this.setState({ isShareOpen: !this.state.isShareOpen, friendToSearch: '', })
    }
    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    }
    handleRemoveShareTo = (e) => { // 공유할 친구 리스트에서 친구를 제거합니다.
        let userid = e.target.getAttribute('userid')
        let temp = this.state.shareTo

        for (let i = 0; i < temp.length; i++) {
            if (temp[i][0] === userid) {
                let front = temp.slice(0, i)
                console.log('this is front', front)
                let tail = temp.slice(i + 1, temp.length)
                console.log('this is tail', tail)
                temp = front.concat(tail)
                console.log('this is after temp', temp)
            }
        }
        this.setState({ shareTo: temp })
    }
    handleClickTitle = () => {
        this.setState({ isTitleClicked: !this.state.isTitleClicked })
    }
    handleAddShareTo = (e) => {
        let { friendToSearch, newShareTo, shareTo } = this.state
        let { followinfo } = this.props;
        let temp = newShareTo
        let isFound = false;
        let allFriendsToShare = shareTo.concat(newShareTo)

        console.log('공유할 모든 친구', allFriendsToShare)
        for (let follower of allFriendsToShare) {
            if (follower[1] === friendToSearch) {
                return alert("이미 목록에 있는 친구입니다.")
            }
        }

        for (let friend of followinfo) {
            if (friend.full_name === friendToSearch) {
                temp.push([friend.id, friend.full_name])
                this.setState({ newShareTo: temp })
                isFound = true
            }
        }

        if (isFound) {
            return;
        } else {
            return alert("친구 이름을 다시 확인해주세요.")
        }
    }
    // render에 직접 적용된 함수를 메소드로 정리했습니다.
    handleModifyOpen = () => {
        let { isModifyOpened } = this.state
        this.setState({ isModifyOpened: !isModifyOpened })
        this.setState({ isShareOpen: false })
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
    handleModify = () => {
        let { title, body, id } = this.state
        let data = { title: title, body: body, id: id }

        if (title && body) {
            axios.post("http://localhost:5000/todoedit", data)
                .then(res => console.log(res))
                .catch((e) => console.log(e))
                .then(this.handleModifyOpen)
        }
        else {
            alert("내용을 입력해주세요.")
        }

        if (this.state.newShareTo.length > 0) {
            for (let follower of this.state.newShareTo) {
                axios.post(`http://localhost:5000/shareTodo`, { todoid: this.props.todo.id, friendid: follower[0] })
                    .then(() => axios.get(`http://localhost:5000/main`)
                        .then(res2 => this.props.handleFetchTodo(res2.data)))

            }
        }
    }

    render() {
        let { title, body, isclear, users } = this.props.todo;
        let { publicOnly } = this.props
        let { isModifyOpened, isTitleClicked, isShareOpen, shareTo, newShareTo } = this.state
        return (
            <div>
                <div style={{ overflow: "hidden" }}>
                    <form className={isShareOpen ? "addForm toLeft" : "addForm"} onSubmit={(e) => { e.preventDefault(); this.handleModify(); }} style={{ display: isModifyOpened ? "block" : "none" }}>
                        <input style={{ marginTop: '20px' }} defaultValue={title} onChange={this.handleInputValue("title")} />
                        <textarea defaultValue={body} onChange={this.handleInputValue("body")} />
                        <span className="editFormButtons">
                            <button type="button" className="deleteButton" onClick={this.handleDelete}></button>
                            <button type="submit" className="editOkay"></button>
                            <button type="button" className="cancelButton" onClick={this.handleModifyOpen}></button>
                            <button type="button" className="shareButton" onClick={this.handleIsShareOpen}></button>
                        </span>
                    </form>
                    <div className="addForm editEntry" id="shareForm-main" style={{ display: isShareOpen ? "" : "none" }}>
                        <input className="searchInput" placeholder="친구이름입력" onChange={this.handleInputValue("friendToSearch")}></input>  {/*친구 이름 검색창*/}
                        <button onClick={this.handleAddShareTo} />
                        <div id="shareTo">
                            {shareTo.concat(newShareTo).map(friend =>
                                <div key={friend[0]}>
                                    <div className="searchFriendEntry" >
                                        {friend[1]}
                                        <button userid={friend[0]} id="removeToShare" onClick={(e) => this.handleRemoveShareTo(e)} />
                                    </div>
                                </div>)}
                        </div>
                    </div>
                </div>
                <ul className="todo-entry" style={{
                    display: isModifyOpened || publicOnly ?
                        publicOnly && !isModifyOpened ?
                            users.length > 0 ? "block" : "none" : "none" : "block"
                }}>
                    <div className="todo-title">
                        <span className="editFormButtons">
                            <button id={isclear ? "done" : "yet"} onClick={() => { this.handleClear() }}></button>
                            <button className="itm-modify-btn" style={{ display: isTitleClicked ? 'block' : 'none' }} onClick={this.handleModifyOpen}></button>
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