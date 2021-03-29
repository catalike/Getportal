import React,{Component} from "react";
import Axios from "axios";
import PubSub from 'pubsub-js'
import qs from 'qs'

export default class Loginmanager extends Component {

    postusers =()=>{
        const data = {
            username: 'admin',
            password: 'qy627398',
            referer: "localhost",
            expiration: 60,
            f: "json"
        }
        const params = qs.stringify(data);//将对象序列化成URL的形式，以&进行拼接
        Axios.post('https://p15v.arcgisonline.cn/portal/sharing/rest/generateToken', params)
            .then(
                (res) => {PubSub.publish('token',{tokenmanager:res.data.token});}//将token发布
            )
    }

    render() {
        return(
            <div onClick={this.postusers()} ></div>
        )
    }

}