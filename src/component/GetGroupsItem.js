import React,{Component}from "react"
import PubSub from "pubsub-js";
import Axios from "axios";
import qs from 'qs'

export default class GetGroupsItem extends Component{
    state={
        groups:[],
        results:[]
    }
    componentDidMount() {
        PubSub.subscribe('token',(msg,token)=> this.setState(token))//订阅Getinfo发布的token
        PubSub.subscribe('groups',(msg,groups)=> this.setState(groups))//订阅GetportalInfo发布的groups

    }
    postitem=()=>
    {
        var str=""
        str=this.state.groups.map((obj)=>{
            return obj.id}).join(" OR ")
        console.log(str)
        const data={
            q: "group:"+(str),
            num: 20,
            start: 1,
            sortField: "modified",
            sortOrder: "desc",
            f: "json",
            token:this.state.token
        }

        const params=qs.stringify(data)
        Axios.post('https://p15v.arcgisonline.cn/portal/sharing/rest/search',params)
         .then(
        (res) => {
            const {results} = res.data
            this.setState({results})
        }
    )
    }
    render() {
        return(
            <div>
                <button onClick={this.postitem}>获取群组项目</button>
                <div>
                    {
                        /*利用.map遍历数组内的值*/
                        this.state.results.map((resultsobj) => {
                            /*用获取到的id和token拼接一个url赋值给img标签*/
                            const imageurl='https://p15v.arcgisonline.cn/portal/sharing/rest/content/items/'+ resultsobj.id + '/info/thumbnail/Thumbnail.png?token='+this.state.token
                            return (
                                <div key={resultsobj.id}>
                                    <a href="https://p15v.arcgisonline.cn/portal/home"><img alt="" src={imageurl}/></a>
                                    <p>{resultsobj.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}