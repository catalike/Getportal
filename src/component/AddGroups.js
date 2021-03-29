import React,{Component}from'react'
import Axios from "axios";
import qs from 'qs'
import PubSub from "pubsub-js";

export default class AddGroups extends Component{

componentDidMount() {
        PubSub.subscribe('token',(msg,tokenmanager)=> this.setState(tokenmanager))//订阅Getmanager发布的token
    PubSub.subscribe('users',(msg,users)=> this.setState(users))//订阅Getinfo发布的users
    }

postusers =()=> {

    const data={
        f:"json",
        users:this.state.users,
        token:this.state.tokenmanager
    }
    const params=qs.stringify(data)
    Axios.post('https://p15v.arcgisonline.cn/portal/sharing/rest/community/groups/e8ed38cefb434e72ad587057ead2d231/addUsers',params)

}
render() {
    return(
        <button onClick={this.postusers}>添加至群组</button>
    )
}
}