import React from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import { render } from 'react-dom';
import TodoEntry from "./TodoEntry"
import { Motion, spring } from "react-motion"
class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: [],
            isAddOpen: false,
            isDeleted: false,
            title: "",
            body: "",
            currentTime: { hour: null, minutes: null },
            current: null,
        }
        this.handleInputValue = this.handleInputValue.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleAddOpen = this.handleAddOpen.bind(this)
        this.resetForm = this.resetForm.bind(this)
        this.getTime = this.getTime.bind(this)
    }
    componentDidMount() {
        setInterval(this.getTime, 1000)
    }
    componentDidUpdate(prevProps) {
        if (prevProps.todos.length !== this.props.todos.length) {
            this.setState({ todos: this.props.todos })
        }
    }
    getTime() {
        let day = new Date()
        let time = {}
        let hours = day.getHours()
        let str = day.toLocaleTimeString().split(':')
        if (hours <= 11) {
            this.setState({ current: "morning" })
        } else if (hours <= 17) {
            this.setState({ current: "afternoon" })
        } else {
            this.setState({ current: "evening" })
        }
        time.hour = str[0]
        time.minutes = str[1]
        this.setState({ currentTime: time })
    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    // render에 직접 적용된 함수를 메소드로 정리했습니다.
    handleAdd = () => {
        const { title, body } = this.state
        if (title && body) {
            axios.post("http://localhost:5000/todowrite", { title, body })
                .then(res => this.props.handleAddTodo(res.data))
                .then(() => this.handleAddOpen())
                .catch(err => { alert("에러가 발생했습니다. 다시 시도해주세요."); console.log(err) });
        }
        else {
            alert("내용을 입력해주세요.")
        }
    }
    handleAddOpen = () => {
        this.setState({ isAddOpen: !this.state.isAddOpen })
        console.log(this)
    }
    resetForm() {
        document.querySelector("#titleInput").value = null
        document.querySelector("#bodyInput").value = null
        this.setState({ title: null, body: null }) // Form reset시 state도 비워주는 구문을 추가했습니다.
    }
    render() {
        let { isAddOpen } = this.state
        let { todos, handleEditedData, handleFetchTodo } = this.props
        return (
            <div>
                <div className="pagebox">
                    <div className="nav">
                        <button id='edit-logout' onClick={() => { this.props.handleSignout(); this.props.history.push('/') }}>로그아웃</button>
                        <button id='gotomypage' onClick={() => { this.props.history.push('/mypage') }}>Mypage</button>
                        <button id='followlist' onClick={() => { this.props.history.push('/followlist') }}>친구목록</button>
                        <div className="currentTime-main" >
                            현재 시각은
                        <p>
                                <b>{this.state.currentTime.hour}시 {this.state.currentTime.minutes}분</b> 입니다.
                            </p>
                        </div>
                    </div>
                    <div className="textbox">
                        <div className="Text Sayhi">
                            {this.state.current === "morning" ? <div> 안녕하세요! <br></br> 좋은 아침이에요</div>
                                : this.state.current === "afternoon" ? <div> 피곤하시죠? <br></br>
                                    <a href="https://www.google.com/search?source=hp&ei=AL5yX4fHF4i2mAWf75vACA&q=%EC%8A%A4%ED%83%80%EB%B2%85%EC%8A%A4&oq=%EC%8A%A4%ED%83%80%EB%B2%85%EC%8A%A4&gs_lcp=CgZwc3ktYWIQAzIFCAAQsQMyBQgAELEDMgUIABCxAzICCAAyBQgAELEDMgIIADICCAAyAggAMgIIADICCAA6CAgAELEDEIMBOgQIABAKUPACWO8VYJ8XaAhwAHgDgAFviAHoCZIBBDAuMTKYAQCgAQGqAQdnd3Mtd2l6sAEA&sclient=psy-ab&ved=0ahUKEwiHx8WdyY3sAhUIG6YKHZ_3BogQ4dUDCAc&uact=5">
                                        커피 한 잔 어때요?</a></div>
                                    : <div>오늘도 고생하셨어요<br></br> 좋은 밤 되세요 </div>}

                        </div>
                        <div className="todoListTitle">
                            TODO LIST
                        </div>
                        <button id="addButton" onClick={this.handleAddOpen} style={{ display: isAddOpen ? "none" : "block" }}>추가하기</button> {/*  Add가 열리면 Add 버튼을 숨깁니다. */} {/* TodoEntry가 렌더되는 부분입니다*/}
                        <div className="add-todo" style={{ display: isAddOpen ? "block" : "none" }}> {/*  isAddOpened를 확인하여 렌더합니다. */}
                            <form className="addForm" onSubmit={(e) => { e.preventDefault(); this.handleAdd(); this.resetForm(); }} >
                                <div><input type="title" id="titleInput" placeholder="제목" onChange={this.handleInputValue("title")} /></div>
                                <div><textarea type="body" id="bodyInput" placeholder="내용" onChange={this.handleInputValue("body")} /></div>
                                <span className="editFormButtons">
                                    <button id="cancelButton-main" type="reset" onClick={this.handleAddOpen}></button>
                                    <button id="editOkay-main" type="submit"></button>
                                </span>
                            </form>
                        </div>
                        <Motion
                            defaultStyle={{ x: -200, opacity: 0 }}
                            style={{ x: spring(0), opacity: spring(1) }} >
                            {(style) => (<div style={{ transform: `translateX(${style.x}px)`, opacity: style.opacity }}>
                                {todos.map(todo =>
                                    <TodoEntry
                                        key={todo.id}
                                        todo={todo}
                                        handleInputValue={this.handleInputValue}
                                        handleFetchTodo={handleFetchTodo}
                                        handleEditedData={handleEditedData} />)}</div>)}
                        </Motion>
                    </div>
                </div >
            </div >
        )
    }
}
export default withRouter(Main)