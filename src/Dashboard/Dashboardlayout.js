import React from 'react'
import MenuAppBar from './MenuAppBar';
import User from './User.js'
import firebase from './firebase.js';
import UserDetails from './UserDetails'
import OverflowScrolling from 'react-overflow-scrolling';
import Paper from '@material-ui/core/Paper';
class Dashboardlayout extends React.Component{
    constructor(props){
        super(props);
        this.state={
          
          data:[],
          userdetails:[],
          callslist:[],
          date:new Date().toLocaleDateString(),
          domainnumber:""
        };
    };
    componentDidMount(){
    firebase.messaging().requestPermission().then(function(){
        console.log("have permision");
        return firebase.database().ref('/users/9527386206/fcmtoken');
    })
    .catch(function(err){
        console.log(err)
    })
    firebase.messaging().onMessage(function(payload){
        console.log(payload)
    })
    /*    var db1=firebase.database().ref('/domainexpert/9867095775/calls');
        db1.on('value',(snapshot)=>{
            const s=snapshot.val();
            for(let i in s){
                
                var d=s[i]['appt'].substring(0,10);
                if(d.charAt(0)==='0'){
                    d=d.substring(1,10)
                }
               
            var d1=d.split("/");
            var ddefault=this.state.date.split("/");
            console.log(i);
            
            if(d1[2]===ddefault[2] &&  d1[0]===ddefault[0] && d1[1]<ddefault[1]){
                db1.child(i).remove();
            }
            else if(d1[2]===ddefault[2] && d1[0]<(ddefault[0])){
                db1.child(i).remove();
            }
            else if(d1[2]<(ddefault[2])){
                db1.child(i).remove();
            }
        }
        })*/
        /*var x=document.cookie;
        console.log(x);
        var t=[];
        t=x.split(";");
        console.log(t);
        var tr=[];
        tr=t[3].split(" ");
        console.log(tr);
        var user=[];
        user=tr[1].split("=");
        var mob=[];
        mob=tr[2].split("=");*/
        //var x=document.cookie;
this.setState({
domainnumber:localStorage.getItem("mob")
})
        const db=firebase.database().ref('/users');
        db.on('value',(snapshot)=>{
            const state=snapshot.val();
           var newstate=[];
            for(let i in state){
newstate.push({
    id:i,
                    name:state[i].name,
                    mobno:state[i].mobilenumber
                });
               // console.log(state[i]);
            }
            this.setState({
                data:newstate
            })
          
        });
       
       
    }
    onadded=(num)=>{
        const db=firebase.database().ref('/users/'+num);
        db.on('value',(snapshot)=>{
            const state=snapshot.val();
           this.setState({
               userdetails:state
           })
         console.log(state);
        });
    }
    calls=(obj)=>{
        console.log(obj[0]);
        
            //id= parseInt(id)
        //const item4= this.state.arr[id-1]
     //  console.log(item)
      //  const narr = [...this.state.callslist]
       // this.state.added.push(item)
      // narr.push(obj)
     /* var x=document.cookie;
      console.log(x);
      var t=[];
      t=x.split(";");
      console.log(t);
      var tr=[];
      tr=t[3].split(" ");
      console.log(tr);
      var user=[];
      user=tr[1].split("=");
      var mob=[];
      mob=tr[2].split("=");*/
      var d=obj[0].appt.split("/").join("-");
      firebase.database().ref('/domainexpert/'+this.state.domainnumber+'/calls/'+d).set(obj[0]);
      
       //console.log(this.state.added)
      

    }
    render(){
        
        /*console.log(tr[1]);
        console.log(tr[2]);*/
        return(
            <div style={{height:"100vh",width:"100vw"}}>
                <div style={{height:"10vh",width:"100vw"}}>
                    <MenuAppBar />
                </div>
                <div style={{height:"90vh",width:"100vw",display:"flex",flexDirection:"row"}}>
                    <div style={{height:"100%",width:"20vw",overflowY:"auto"}}>
                        <User userdata={this.state.data} onadded={this.onadded}/>
                    </div>
                    <div style={{height:"100%",width:"80vw"}}>
                        <Paper elevation={3} style={{height:"98%",width:"99%",backgroundColor:"white",marginTop:"0.5%",marginLeft:"0.5%",overflowY:"scroll"}}>
                            <UserDetails userdetails={this.state.userdetails} calls={this.calls} domainnumber={this.state.domainnumber} />
                        </Paper>
                    </div>
                </div>
            </div>
    );
    }
}

export default Dashboardlayout;
/**/