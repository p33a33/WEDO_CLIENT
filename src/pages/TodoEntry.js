import React from 'react';

const TodoEntry = (props) => {

    if (props.isModifyOpened) {
        let newTitle = props.title;
        let newBody = props.body;
        return <div className="todo-entry">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    let data = { title: newTitle, body: newBody }
                    props.handleModify()
                    props.title = newTitle
                    props.body = newBody
                    console.log(data, props.todoKey)
                }}
            >
                <div className="todo-title">
                    <input defaultValue={props.title} onChange={(e) => { newTitle = e.target.value }}></input ><span><button type="submit" >수정</button><button>삭제</button></span></div>
                <input defaultValue={props.body} onChange={(e) => { newBody = e.target.value }}></input>
            </form>
        </div>
    }
    return <div className="todo-entry">
        <form>
            <div className="todo-title">
                <h3>{props.title}<span><button onClick={() => {
                    props.handleModify()

                }}>수정</button><button>삭제</button></span></h3></div>
            <div>{props.body}</div>
        </form>
    </div>
}


export default TodoEntry;
