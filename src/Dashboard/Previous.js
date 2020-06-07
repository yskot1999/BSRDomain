import React from 'react';
import firebase from './firebase'
class Previous extends React.Component{
    constructor(props){
        super(props);
        this.state={
            notes:[]
        }
    }
    componentWillReceiveProps(){
      var state1=[]
        console.log(this.props.number)
        var db=firebase.database().ref('/users/'+this.props.number+'/notes');
        db.on('value',(snapshot)=>{
            const state=snapshot.val();
         console.log(state);
         for(let i in state){
             state1.push({
                 note:state[i].note,
                 timestamp:state[i].timestamp
             })
         }
         this.setState({
             notes:state1
         });
        })
      
    }
render(){
   
   
    return(
        this.state.notes.map((item)=>{
            return(
                <div>{item.timestamp}: {item.note}<br></br></div>
                
            );
        })
    );
    }

}

export default Previous;