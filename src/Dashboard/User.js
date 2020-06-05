import React from 'react'
import { directive } from '@babel/types';
import Button1 from './Button1.js';
import firebase from './firebase'
class User extends React.Component{
constructor(props){
    super(props);
    this.state={
        userdata:[]
    }

}

render(){
    console.log(this.props.userdata);
 var f=0;
    return(
    this.props.userdata.map((item)=> {
        f=0;
        var db=firebase.database().ref('/users/'+item.mobno+'/appointment');
        db.on('value',(snapshot)=>{
        f=snapshot.numChildren();
         })
         if(f!==0){
            return(
                <Button1 name={item.name} phone={item.mobno} onadded={this.props.onadded}/>
            );
         }
    })
    )
}
}
export default User;