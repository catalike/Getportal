import React,{Component}from "react"
import PubSub from "pubsub-js";
import Axios from "axios";
import qs from 'qs'

export default class GetItem extends Component {
    state = {
        results: [],
    }

    componentDidMount() {
        PubSub.subscribe('token', (msg, tokenmanager) => this.setState(tokenmanager))//订阅Getmanager发布的token
    }

    postitem = () => {
        const data={
            q:'owner:"admin" orgid:0123456789ABCDEF  ownerfolder:root -type:("Code Attachment" OR "Featured Items") -typekeywords:("MapAreaPackage") -type:("Map Area")',
            num:20,
            start:1,
            sortField:"modified",
            sortOrder:"desc",
            f:"json",
            token:this.state.tokenmanager
        }
        const params = qs.stringify(data);
        Axios.post('https://p15v.arcgisonline.cn/portal/sharing/rest/search',params)
        /*将获取到的数据提出，存储到state里*/
        .then(
                (res) => {
                    const {results} = res.data
                    this.setState({results})
                }
        )
    }

    /*     以下方法放弃
     const arr = []
                    this.state.results.map(obj => {
                    1.创建一个数组arr，将id push进arr，然后在遍历的外侧写setsteate，就可以将对象id以数组的形式存入state
                      const {id} = obj
                        return (arr.push({id}))
                     2.用get的请求获取图片，并存入arr中
                        Axios.get('https://p15v.arcgisonline.cn/portal/sharing/rest/content/items/' + obj.id + '/info/thumbnail/Thumbnail.png', {params: {token: this.state.tokenmanager}})
                            .then((res) => {
                                const {data}=res
                                arr.push({data})
                            })
                    })this.setState({arr})*/
    render() {
        return (
            <div>
                <button onClick={this.postitem}>获取项目</button>
                <div>
                    {
                      /*利用.map遍历数组内的值*/
                    this.state.results.map((resultsobj) => {
                     /*用获取到的id和token拼接一个url赋值给img标签*/
                        const imageurl='https://p15v.arcgisonline.cn/portal/sharing/rest/content/items/'+ resultsobj.id + '/info/thumbnail/Thumbnail.png?token='+this.state.tokenmanager
                        return (
                          <div key={resultsobj.id}>
                          <a href="https://p15v.arcgisonline.cn/portal/home"><img alt=""
                          src={imageurl}/></a>
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