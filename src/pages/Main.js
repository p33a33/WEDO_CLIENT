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
            isAddOpened: false,
            isDeleted: false,
            title: "",
            body: "",
            currentTime: null,
        }
        this.handleInputValue = this.handleInputValue.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleAddOpen = this.handleAddOpen.bind(this)
        this.resetForm = this.resetForm.bind(this)
        this.getTime = this.getTime.bind(this)
    }

    componentDidMount() {
        this.getTime();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.todos.length !== this.props.todos.length) {
            this.setState({ todos: this.props.todos })
        }
    }

    getTime() {
        let today = new Date();
        let time = today.getHours()

        if (time <= 11) {
            this.setState({ currentTime: "morning" })
        } else if (time <= 18) {
            this.setState({ currentTime: "afternoon" })
        } else {
            this.setState({ currentTemp: "evening" })
        }
    }


    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    // render에 직접 적용된 함수를 메소드로 정리했습니다.
    handleAdd = () => {
        const { title, body } = this.state
        axios.post("http://localhost:5000/todowrite", { title, body })
            .then(res => this.props.handleAddTodo(res.data))
            .then(() => this.handleAddOpen())
            .catch(err => { alert("에러가 발생했습니다. 다시 시도해주세요."); console.log(err) });
    }

    handleAddOpen = () => {
        this.setState({ isAddOpened: !this.state.isAddOpened })
    }
    resetForm() {
        document.querySelector("#titleInput").value = null
        document.querySelector("#bodyInput").value = null
    }
    render() {
        let { isAddOpened } = this.state
        let { todos, handleEditedData, handleFetchTodo } = this.props

        return (
            <div>
                <div className="pagebox">
                    <div className="nav">
                        <button id='edit-logout' onClick={() => { this.props.handleSignout(); this.props.history.push('/') }}>로그아웃</button>
                        <button id='gotomypage' onClick={() => { this.props.history.push('/mypage') }}>Mypage</button>
                        <button id='followlist'>친구목록</button>
                    </div>
                    <div className="textbox">
                        <div className="Text Sayhi">
                            {this.state.currentTime === "morning" ? <div> 안녕하세요! <br></br> 좋은 아침이에요</div>
                                : this.state.currentTime === "afternoon" ? <div> 피곤하시죠? <br></br> 커피 한 잔 어때요? </div>
                                    : <div>오늘도 고생하셨어요<br></br> 좋은 밤 되세요 </div>}
                        </div>
                    </div>
                    <h2>TODO LIST</h2>
                    <button id="addButton" onClick={this.handleAddOpen} style={{ display: isAddOpened ? "none" : "block" }}>추가하기</button> {/*  Add가 열리면 Add 버튼을 숨깁니다. */} {/* TodoEntry가 렌더되는 부분입니다*/}
                    <div className="add-todo" style={{ display: isAddOpened ? "block" : "none" }}> {/*  isAddOpened를 확인하여 렌더합니다. */}
                        <form className="addForm" onSubmit={(e) => { e.preventDefault(); this.handleAdd(); }} >
                            <div><input type="title" id="titleInput" placeholder="제목" onChange={this.handleInputValue("title")} /></div>
                            <div><textarea type="body" id="bodyInput" placeholder="내용" onChange={this.handleInputValue("body")} /></div>
                            <button type="submit" onClick={this.resetForm}>done</button>
                        </form>
                    </div>
                    <Motion
                        defaultStyle={{ x: -200, opacity: 0 }}
                        style={{ x: spring(0), opacity: spring(1) }} >
                        {(style) => (<div style={{ transform: `translateX(${style.x}px)`, opacity: style.opacity }}>
                            {style.opacity}
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
        )
    }
}

export default withRouter(Main)