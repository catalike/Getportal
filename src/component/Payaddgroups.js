import React,{Component}from'react'
import Axios from "axios";
import qs from 'qs'
import PubSub from "pubsub-js";

export default class AddGroups extends Component{

    componentDidMount() {
        PubSub.subscribe('users',(msg,users)=> this.setState(users))//订阅Getinfo发布的users
    }

    paytoadd =()=> {
        const data={
            usrename:this.state.users,
            judge:'是'
        }
        const params=qs.stringify(data)
        Axios.post('http://localhost:3001/addgroups',params)
            .then(res=>alert(res.data))
    }
    nopay=()=>{
        const data={
            usrename:this.state.users,
            judge:'否'
        }
        const params=qs.stringify(data)
        Axios.post('http://localhost:3001/addgroups',params)
            .then(res=>alert(res.data))
    }
    render() {
        return(
            <div>
          <button onClick={this.paytoadd}>付款加入群组</button>
          <button onClick={this.nopay}>不付款加入群组</button>
            </div>
        )
    }
}