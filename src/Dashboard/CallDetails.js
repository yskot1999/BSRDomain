import React from 'react'
import Paper from '@material-ui/core/Paper';
import MenuAppBar from './MenuAppBar'
import Data from './Data'
import firebase from './firebase.js';
class CallDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            approvedcases:"",
            totalappointments:"",
            pendingcases:"",
            data:[],
            date:new Date().toLocaleDateString()
        }
    }
    componentDidMount(){
  //      const {Storage} = require('@google-cloud/storage');

// Creates a client
//const storage = new Storage();
// Creates a client from a Google service account key.
// const storage = new Storage({keyFilename: "key.json"});

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const bucketName = 'bucket-name';

/*async function createBucket() {
  // Creates the new bucket
  await storage.createBucket("kothu");
  console.log(`Bucket kothu created.`);
}

createBucket().catch(console.error);*/
console.log(this.state.date);
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
        mob=tr[2].split("=");
        
        var actdate=[];
        var t=new Date().toLocaleDateString();
        actdate=t.split("/");*/
        var approved="";
        var newstate=[];
        var db=firebase.database().ref('/domainexpert/'+localStorage.getItem("mob")+'/calls');
        db.on('value',(snapshot)=>{
            approved=snapshot.numChildren();
            const state=snapshot.val();
            
            for(let i in state)
            {
               /* var date=[];
                date=state[i].appt.split(" ");
                var day=[];
                day=date[0].split("/");
                console.log(day);
               if(parseInt(day[2])>=parseInt(actdate[2]))
                {
                    if(parseInt(day[0])>=parseInt(actdate[1]))
                    {
                        if(parseInt(day[1])>=parseInt(actdate[0]))
                        {
                           
                        }
                    }
                }*/
                newstate.push(
                    {
                        id:i,
                        name:state[i].name,
                        mobo:state[i].mobilenumber,
                        appt:state[i].appt
                    }
                )
                
            }
            
        })
        var sum=0,pending=0;
        db=firebase.database().ref('/users');
        db.on('value',(snapshot)=>{
           for(let i in snapshot.val()){
               var db1=firebase.database().ref('/users/'+i+'/appointment');
               db1.on('value',(snap)=>{
                    sum+=snap.numChildren();
               })
           }
           console.log(sum);
        })
        setTimeout(()=>{
            pending=sum-approved;
            this.setState({
                approvedcases:approved,
                totalappointments:sum,
                pendingcases:pending,
                data:newstate
            })
        },3500)
    }
    render(){
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
        mob=tr[2].split("=");
        console.log(this.props.location.state.name)*/
        return(
            <div style={{height:"100vh",width:"100vw"}}>
                <div style={{height:"10vh",width:"100vw"}}>
                    <MenuAppBar/>
                </div>
                <div style={{height:"90vh",width:"100vw",display:"flex",flexDirection:"row"}}>
                    <Paper elevation={3} style={{height:"98%",width:"98%",marginTop:"1vh",marginLeft:"1vw",overflowY:"scroll"}}>
                        <div style={{marginTop:"7%",marginLeft:"5%"}}><h1>{localStorage.getItem("username")}</h1></div>
                        <div style={{marginTop:"-1%",marginLeft:"5%"}}><h3>{localStorage.getItem("mob")}</h3></div>
                        <div style={{marginTop:"0%",marginLeft:"5%",height:".2%",width:"90%",backgroundColor:"grey"}}></div>
                        <div style={{height:"10%",width:"90%",marginLeft:"5%",marginTop:"2%",display:"flex",flexDirection:"row"}}>
                            <div style={{height:"80%",width:"25%",borderWidth:"2px",borderStyle:"solid",borderColor:"#d0db4e",marginTop:"",marginLeft:"20%",borderRadius:"10px"}}><div style={{marginTop:"2vh",textAlign:"center"}}>प्रलंबित कॉल:{this.state.pendingcases}</div></div>
                            <div style={{height:"80%",width:"25%",borderWidth:"2px",borderStyle:"solid",borderColor:"#d0db4e",marginTop:"",marginLeft:"10%",borderRadius:"10px"}}><div style={{marginTop:"2vh",textAlign:"center"}}>स्वीकारलेले कॉल:{this.state.approvedcases}</div></div>
                        </div>
                        <div style={{width:"60%",marginLeft:"20%",height:"40%"}} >
                        <Data result={this.state.data} />
                        </div>
                        </Paper>
                </div>
            </div>
        )
    }
}
export default CallDetails;