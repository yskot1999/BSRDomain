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
   var keys1=[]
    return(
    this.props.userdata.map((item)=> {
        f=0;
        var db=firebase.database().ref('/users/'+item.mobno+'/appointment');
        db.on('value',(snapshot)=>{
            const state=snapshot.val();
            for(let i in state){
                keys1.push(i);
            }
        })
        for(let i1 in keys1){
            db=firebase.database().ref('/users/'+item.mobno+'/'+keys1[i1]);
            db.on('value',(snapshot)=>{
                const state=snapshot.val();
                if(state!==null){
                if(state.confirmation==="nc"){
                    f=1;
                   
                }
            }
            });
        }
        if(f===1){
            return(
                <Button1 name={item.name} phone={item.mobno} onadded={this.props.onadded}/>
            )
        }
        else{
            return null
        }
      
    })
    )
}
}
export default User;