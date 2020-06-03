import React from 'react'
import { directive } from '@babel/types';
import Button1 from './Button1.js';
class User extends React.Component{
constructor(props){
    super(props);
    this.state={
        userdata:[]
    }

}

render(){
    return(
    this.props.userdata.map((item)=> {
        
            return(
                <Button1 name={item.name} phone={item.mobno} onadded={this.props.onadded}/>
            )
      
    })
    )
}
}
export default User;