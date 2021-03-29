import Getinfo from "./component/GetInfo"
import React,{Component} from "react"
import GetportalInfo from "./component/GetportalInfo"
import AddGroups from "./component/AddGroups";
import Getmanager from "./component/Getmanager"
import GetItem from "./component/GetItem";
import GetGroupsItem from "./component/GetGroupsItem";
import Payaddgroups from "./component/Payaddgroups"

export default class App extends Component{

render(){
  return(
    <div>
     <Getinfo/>
     <GetportalInfo/>
     <AddGroups/>
     <Getmanager/>
     <GetItem/>
     <GetGroupsItem/>
     <Payaddgroups/>
    </div>
        )
   }
}
