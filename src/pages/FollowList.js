import React from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import { render } from 'react-dom';
import FollowEntry from './FollowEntry'
import { Motion, spring } from "react-motion"

class FollowList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            followinfo: [
                // { id: 1, user_id: 2, follow_id: 3, created_at: 2020 - 9 - 29 },
                // { id: 4, user_id: 5, follow_id: 3, created_at: 2020 - 9 - 29 }
            ], // user_fullname, user_nickname이 필요할 것 같아요! 상태메시지도 추가한다면 상태메시지도 같이! 만약 프로필사진도 추가한다면 같이!
            emailToAdd: null,
            isAddOpen: false
        }
        this.handleNewFollowList = this.handleNewFollowList.bind(this)
        this.handleInputValue = this.handleInputValue.bind(this)
        this.handleAddFriend = this.handleAddFriend.bind(this)
        this.handleAddFriendOpen = this.handleAddFriendOpen.bind(this)
    }

    componentDidMount = () => {
        axios.get("http://localhost:5000/followlist")
            .then(res => {
                let followlist = res.data
                this.setState({ followinfo: followlist })
            })
            .catch(e => console.log(e))
    }

    handleNewFollowList = (list) => {
        this.setState({ followinfo: list })
    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    handleAddFriend = () => {
        return axios.post(`http://localhost:5000/followAdd`, { friendemail: this.state.emailToAdd })
            .then(res => {
                let temp = this.state.followinfo;
                let newFriend = res.data;
                temp.push(newFriend)
                this.setState({ followinfo: temp })
            })
    }

    handleAddFriendOpen = () => {
        this.setState({ isAddOpen: !this.state.isAddOpen })
    }

    render() {
        let { followinfo, isAddOpen } = this.state
        return (
            <>
                <div className="modal-mask" style={{ display: isAddOpen ? 'block' : 'none' }}>
                    <div className="modal-window">
                        <form className="Form addFriend" onSubmit={(e) => e.defaultPrevented()}>
                            <div className="Text">친구추가</div>
                            <input placeholder="친구 이메일 입력" onChange={this.handleInputValue("emailToAdd")}></input>
                            <button type="submit" onClick={this.handleAddFriend}>추가하기</button>
                            <button onClick={this.handleAddFriendOpen}>취소</button>
                        </form>
                    </div>
                </div>
                <div className="pagebox">
                    <div className="nav">
                        <button id='edit-logout' onClick={() => { this.props.handleSignout(); this.props.history.push('/') }}>로그아웃</button>
                        <button id='gotomypage' onClick={() => { this.props.history.push('/mypage') }}>Mypage</button>
                        <button id='gotomain' onClick={() => { this.props.history.push('/main') }}>Todo List</button>
                        <button id='addfollow' onClick={this.handleAddFriendOpen} >친구추가</button>
                    </div>
                    <div className="Text followlistbox"> 친구목록
                <ul>
                            {followinfo.length ?
                                followinfo.map(follower => <FollowEntry follower={follower} handleNewFollowList={this.handleNewFollowList} />)
                                : <div id="noFriends">음..... 친구가 없을수도 있다고 생각해요. <br></br>괜찮아요, 저도 많이 없거든요</div>}
                        </ul>
                    </div>

                </div>
            </>
        )
    }
}

export default withRouter(FollowList)