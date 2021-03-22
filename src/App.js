import Getinfo from "./component/GetInfo"
import React,{Component} from "react"
import GetportalInfo from "./component/GetportalInfo"
import AddGroups from "./component/AddGroups";
import Getmanager from "./component/Getmanager"
import GetItem from "./component/GetItem";

export default class App extends Component{

render(){
  return(
    <div>
     <Getinfo/>
     <GetportalInfo/>
     <AddGroups/>
     <Getmanager/>
     <GetItem/>
    </div>
        )
   }
}
