import React from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import { render } from 'react-dom';
import { Motion, spring } from "react-motion"

export default function FollowEntry(props) {

    let handleUnfollow = () => {
        axios.post(`http://localhost:5000/followdelete`, { followid: props.follower.user_id })
            .then(res => {
                let newList = res.data
                props.handleNewFollowList(newList)
            })
    }
    { console.log(props) }
    return (
        <li className="follower">
            <div className="followerbox">
                <div className="entry name">{props.follower.user_id}</div>
                <div className="entry email">p33a33@naver.com</div>
                <button className="entry button" onClick={handleUnfollow}></button>
            </div>
        </li>)
}