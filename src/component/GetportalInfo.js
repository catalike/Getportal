import React,{Component}from 'react'
import PubSub from 'pubsub-js'
import Axios from "axios";
import qs from 'qs'

export default class PortalInfo extends Component{
    state={
        groups:[]
        }

    componentDidMount() {
        PubSub.subscribe('token',(msg,token)=> this.setState(token))//订阅Getinfo发布的token
    }

    posttoken =()=>{
        const data={
         f:"json",
         token:this.state.token
        }

        const params=qs.stringify(data);
        Axios.post('https://p15v.arcgisonline.cn/portal/sharing/community/self', params)
            .then((res)=> {
                 const {groups}=res.data
                 this.setState({groups})//将groups数组传入state
                PubSub.publish('groups',{groups:this.state.groups});
                })
    }

    render(){
        return(
            <div>
                <h2>{this.state.token}</h2>
                <button onClick={this.posttoken}>获取用户</button>
                <div>
                    {
                        /*利用.map遍历数组内的值*/
                        this.state.groups.map((groupsobj)=>{
                            return(
                                <div key={groupsobj.id}>
                                   <p>{groupsobj.title}</p>{/*展示title*/}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

