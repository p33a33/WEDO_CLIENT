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
    }
    //shouldComponentUpdate(nextState) {
    //    if (nextState.isClear !== this.state.isClear) {
    //        return false
    //    }
    //}
    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };


    render() {
        if (this.state.isModifyOpened) {
            return <div className="todo-entry">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const data = {
                        title: this.state.title,
                        body: this.state.body,
                        id: this.state.id
                    }
                    axios.
                        post("http://localhost:5000/todoedit", data)
                        .then((res) => { this.props.handleEditedData(res.data); console.log(res) })
                        .catch((e) => console.log(e))
                        .then(() => this.setState({ isModifyOpened: !this.state.isModifyOpened }))
                        .then(() => {
                            console.log(this.props);
                        })
                }}>
                    <div className="todo-title">
                        <input defaultValue={this.props.todo.title} onChange={this.handleInputValue("title")}></input >
                        <input defaultValue={this.props.todo.body} onChange={this.handleInputValue("body")}></input><span><button type="submit" >수정</button>
                            <button onClick={() => {
                                const data = {
                                    id: this.props.todo.id
                                }
                                axios.
                                    post("http://localhost:5000/tododelete", data)
                                    .then((res) => this.props.handleFetchTodo(res.data))
                                    .then(() => this.setState({ isModifyOpened: !this.state.isModifyOpened }))
                            }}>삭제</button></span></div>
                </form>
            </div>
        }
        return <div className="todo-entry">

            <div className="todo-title">
                <h3 style={{ textDecorationLine: this.props.todo.isclear ? 'line-through' : '' }}>{this.props.todo.title}<span><button onClick={() => {
                    this.setState({ isModifyOpened: !this.state.isModifyOpened })
                }}>수정</button><button onClick={() => {
                    const data = { id: this.props.todo.id, }
                    axios.
                        post("http://localhost:5000/clear", data)
                        .then((res) => { this.props.handleEditedData(res.data); console.log(res) })
                        .catch((e) => console.log(e))

                    //axios.
                    //    post("http://localhost:5000/clear", data)
                    //    .then((res) => this.props.handleFetchTodo(res.data))
                    //    
                }}>clear</button></span></h3></div>
            <div><h5 style={{ textDecorationLine: this.props.todo.isclear ? 'line-through' : '' }} > {this.props.todo.body}</h5></div>

        </div>

    }
}


export default TodoEntry;


