import React,{Component} from "react";
import Axios from "axios";
import PubSub from 'pubsub-js'
import qs from 'qs'

export default class Login extends Component {

   state={
     username:"",
     password:""
   }

   input1 = (event) => {
    this.setState({username:event.target.value})

   }
   input2 = (event) => {
     this.setState({password:event.target.value})
    }

   postinput = () => {

      const data = {
          username: this.state.username,
          password: this.state.password,
          //username: 'Product',
          //password: 'Esri1234ArcGIS',
          referer: "localhost",
          expiration: 60,
          f: "json"
      }
     const params = qs.stringify(data);//将对象序列化成URL的形式，以&进行拼接
     Axios.post('https://p15v.arcgisonline.cn/portal/sharing/rest/generateToken', params)
          .then((res) => {PubSub.publish('token',{token:res.data.token});}//将token发布
           )
       PubSub.publish('users',{users:this.state.username});
   }

   render(){
     return (
      <div>
         <input onChange={this.input1} name="username"/><br/>
         <input onChange={this.input2} password="password"/>
         <button onClick={this.postinput}>获取token</button>
      </div>
       )
   }

}