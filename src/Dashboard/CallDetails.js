import React from 'react'
import Paper from '@material-ui/core/Paper';
import MenuAppBar from './MenuAppBar'
import firebase from './firebase.js';
class CallDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            approvedcases:"",
            totalappointments:"",
            pendingcases:""
        }
    }
    componentDidMount(){
        var approved="";
        var db=firebase.database().ref('/domainexpert/'+this.props.location.state.mobilenumber+'/calls');
        db.on('value',(snapshot)=>{
            approved=snapshot.numChildren()
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
                pendingcases:pending
            })
        },3500)
    }
    render(){
        console.log(this.props.location.state.name)
        return(
            <div style={{height:"100vh",width:"100vw"}}>
                <div style={{height:"10vh",width:"100vw"}}>
                    <MenuAppBar/>
                </div>
                <div style={{height:"90vh",width:"100vw",display:"flex",flexDirection:"row"}}>
                    <Paper elevation={3} style={{height:"98%",width:"98%",marginTop:"1vh",marginLeft:"1vw"}}>
                        <div style={{marginTop:"7%",marginLeft:"5%"}}><h1>{this.props.location.state.name}</h1></div>
                        <div style={{marginTop:"-1%",marginLeft:"5%"}}><h3>{this.props.location.state.mobilenumber}</h3></div>
                        <div style={{marginTop:"0%",marginLeft:"5%",height:".2%",width:"90%",backgroundColor:"grey"}}></div>
                        <div style={{height:"10%",width:"90%",marginLeft:"5%",marginTop:"2%",display:"flex",flexDirection:"row"}}>
                            <div style={{height:"80%",width:"30%",backgroundColor:"#d0db4e",marginTop:"",marginLeft:"15%"}}><div style={{marginTop:"2vh",textAlign:"center"}}>Pending Cases:{this.state.pendingcases}</div></div>
                            <div style={{height:"80%",width:"30%",backgroundColor:"#d0db4e",marginTop:"",marginLeft:"10%"}}><div style={{marginTop:"2vh",textAlign:"center"}}>Approved Cases:{this.state.approvedcases}</div></div>
                        </div>
                        </Paper>
                </div>
            </div>
        )
    }
}
export default CallDetails;