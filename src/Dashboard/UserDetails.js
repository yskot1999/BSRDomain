
import React from 'react'
import firebase from './firebase.js'
import DoneIcon from '@material-ui/icons/Done';
import NotesIcon from '@material-ui/icons/Notes';
import ClearIcon from '@material-ui/icons/Clear';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
//import Paper from '@material-ui/core/Paper';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
//import Grid from '@material-ui/core/Grid';
//import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DatePic from './DatePic'


class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgdetails: [],
            audiodetails:[],
            name1: this.props.userdetails['name'],
            mobilenum: this.props.userdetails['mobilenumber'],
            appt: [],
            height:"0vh",
            visibile:"hidden",
            changed:false,
            alertdisable:"visible",
            alertdisable2:"hidden",
            selectother:"hidden",
            dateheight:"0vh",
            butheight:"0vh",
            butvis:"hidden"
        }
        this.addcalls=this.addcalls.bind(this);
        this.noclicked=this.noclicked.bind(this);
        //this.change=this.change.bind(this);
        this.handleDateChange=this.handleDateChange.bind(this);
    }
   
    
    makeStyles = (theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
          },
          gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
          },
          title: {
            color: theme.palette.primary.light,
          },
          titleBar: {
            background:
              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
          },
    });
 handleDateChange = (date) => {
        console.log(date);
      };
    /*makeStyles=(theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
        },
        gridList: {
          width: 500,
          height: 450,
        },
      })*/
    
    componentWillReceiveProps(nextProps) {
        //this.store(this.props.userdetails['name'],this.props.userdetails['mobilenumber']);
        var nam = nextProps.userdetails['name'];
        var num = nextProps.userdetails['mobilenumber']
        let arr = [];
        let trr=[];
        var t = 0;
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var imagesRef = storageRef.child('images/' + nam + ':' + num);
        imagesRef.listAll().then(function (res) {
            res.items.forEach(async function (itemref) {
                console.log(itemref);
                /*itemref.getDownloadURL().then((url) => {
                    arr.push(url);
                })*/
                //this.display(itemref);
                itemref.getDownloadURL().then(function (url) {
                    console.log(url);
                    console.log(typeof (url));
                    arr.push(url);
                    console.log(arr.length);
                    t++;
                })
            });
            console.log(arr.length);
            console.log(t);
            //change(arr);


        }).catch(function (error) {
            console.log(error);
        }
        );
        var audioRef = storageRef.child('AudioRecordings/' + nam + ':' + num);
        audioRef.listAll().then(function (res) {
            res.items.forEach(async function (itemref) {
                console.log(itemref);
                /*itemref.getDownloadURL().then((url) => {
                    arr.push(url);
                })*/
                //this.display(itemref);
                itemref.getDownloadURL().then(function (url) {
                    console.log(url);
                    console.log(typeof (url));
                    trr.push(url);
                    console.log(arr.length);
                    t++;
                })
            });
            console.log(trr.length);
            console.log(t);
            //change(arr);


        }).catch(function (error) {
            console.log(error);
        }
        );
        
        console.log("hello");
        setTimeout(() => {
            this.setState({
                imgdetails: arr,
                audiodetails:trr,
                name1: nam,
                mobilenum: num,
                alertdisable:"visible",
                alertdisable2:"hidden",
               
            })
        }, 3500)

    }
    openNotesTab()
    {
    let ret=this.state.height.toString();
        console.log(ret);
        
    }
    addcalls=(num)=>{
       var key;
        var newState=[];
        var appt = [];
        var i=0,m=0;
        console.log(num)
        var n=num.split("/").join("-");
       var db1=firebase.database().ref('/domainexpert/9867095775/calls');
       db1.on('value',(snapshot)=>{
           const state=snapshot.val();
           for(let i in state){
              if(i===n){
              
                m=1;
                console.log(m)
              }
           }
       })
       setTimeout(()=>{
       console.log(m);
       if(m===1){
        alert("appointment already exists.Select another time slot");
       }
       if(m===0){

        newState.push({
                 name:this.props.userdetails['name'],
                 mobilenumber:this.props.userdetails['mobilenumber'],
                 appt:num
             });
            console.log(newState)
             this.props.calls(newState);
             var db=firebase.database().ref('/users/'+this.props.userdetails['mobilenumber']+'/appointment');
             db.on('value',(snapshot)=>{
                 const state=snapshot.val();
                 for( let i in state){
                     if(state[i]===num){
                         key=i;
                     }
                 }
             });
            console.log(key);
            var keyvalue=[];
            keyvalue.push({
              confirmation:"confirmed"  
            })
            console.log('/users/'+this.props.userdetails['mobilenumber']+'/'+key);
            firebase.database().ref('/users/'+this.props.userdetails['mobilenumber']+'/'+key).update(keyvalue[0]);
            alert("appointment booked");
            this.setState({
                 alertdisable:"hidden",
                 alertdisable2:"visible"
     
             });
         }},3500)
       
    }
    noclicked(){
        this.setState({
            selectother:"visible",
            dateheight:"20%",
            butheight:"6vh",
            butvis:"visible"
        })
    }
    setNew=(n)=>{
        var x=document.cookie;
        console.log(x);
        var t=[];
        t=x.split(";");
        console.log(t);
        console.log(t[4]);
        t[4]=t[4].substring(4,t[4].length)
        console.log(t[4]);
        var key=""
var db=firebase.database().ref('/users/'+this.props.userdetails['mobilenumber']+'/appointment');
db.on('value',(snapshot)=>{
const state=snapshot.val();
for(let i in state){
    if(state[i]===n){
key=i;
    }
}

})
var keyvalue=[];
keyvalue.push({
  confirmation:"confirmed"  ,
  timing:t[4]
})
var timin=[];
timin.push({
    key:t[4]
})
firebase.database().ref('/users/'+this.props.userdetails['mobilenumber']+'/appointment').update(keyvalue[1]);
firebase.database().ref('/users/'+this.props.userdetails['mobilenumber']+'/'+key).update(keyvalue[1]);
firebase.database().ref('/users/'+this.props.userdetails['mobilenumber']+'/'+key).update(keyvalue[0]);
var newState1=[]
newState1.push({
    name:this.props.userdetails['name'],
    mobilenumber:this.props.userdetails['mobilenumber'],
    appt:t[4]
});
console.log(newState1)
this.props.calls(newState1);

    }
    render() {
        //const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
        const classes = this.makeStyles;
        console.log(this.state.imgdetails);
        console.log(this.state.audiodetails);
        console.log(this.state.name1);
        console.log(this.state.mobilenum);
        /*this.state.imgdetails.map((tile)=>{
            console.log(tile)
        })*/
        //var arr=this.state.imgdetails;
        setTimeout(() => {
            console.log(this.state.imgdetails);

        }, 1000);
        console.log(this.state.imgdetails.length);
        let url = this.state.imgdetails;
        console.log(typeof (url));
        console.log(url);
        url.map(test => {
            console.log(test);
        }
        )
        const value = Object.values(url);
        console.log(value);
        let fe = "";
        /*fe=url[url.length -1]
        console.log(fe.toString());
        /*for(let i=0;i<this.state.imgdetails.length;i++)
        {
            console.log(this.state.imgdetails[i]);
        }*/
        //if user has non confirmed appointments
        var keys1=[];
        var db=firebase.database().ref('/users/'+this.props.userdetails['mobilenumber']+'/appointment');
        db.on('value',(snapshot)=>{
            const state1=snapshot.val();
           
            for(let i in state1){
                keys1.push(i);
            }
        });
        var f = 0;
        var appt = [];
        console.log(keys1);
        for(let i in keys1){
        db=firebase.database().ref('/users/'+this.props.userdetails['mobilenumber']+'/'+keys1[i]);
        db.on('value',(snapshot)=>{
            const state=snapshot.val();
            if(state.confirmation==="nc"){
                appt.push(state.timing);
                f=1;
            }
        });
    }
        console.log(appt);
       console.log(f); 
        
       var i=0;
      /*  for (let i in this.props.userdetails['appointment']) {
            appt.push(this.props.userdetails['appointment'][i])
           
            f = 1;

        }*/
        
        if (f === 1) {
            return (
                <div style={{display:"flex",flexDirection:"column"}} >
                    <div style={{textAlign: "left", marginLeft: "5%", marginTop: "5%" }}>    <h1>{this.props.userdetails['name']}</h1>
                    </div>
                    <div style={{ marginLeft: "5%", marginTop: "-3%",display:"flex",flexDirection:"row",height:"6vh" }} >
                        <div style={{textAlign: "left",width:"30%"}} ><h2>{this.props.userdetails['mobilenumber']}</h2></div>
                     
                        <Button style={{marginLeft:"40%",width:"18%",height:"100%",backgroundColor:"#d0db4e",marginTop:"0%"}} onClick={() => {
                            if(this.state.height==="0vh"){
                                this.setState({
                                    height:"30vh",
                                    visibile:"visible"
                                })
                            }
                            else{
                                this.setState({
                                    height:"0vh",
                                    visibile:"hidden"
                                })
                            }      
                        }} >
                        <div style={{display:"flex",flexDirection:"row",width:"100%"}} >
                        <NotesIcon style={{height:"100%",marginTop:"12%",color:"white"}} />
                        <p style={{marginLeft:"7%",height:"100%",fontSize:"17px",color:"white"}}><b>Make Notes</b></p>
                        </div>
                        </Button>
                    </div>
                    <div style={{width:"90%",marginLeft:"5%",marginTop:"2%",backgroundColor:"grey",height:".2vh"}} ></div>
                   
                       
                    <div  style={{ height: "7vh", width: "70%", marginLeft: "15%", backgroundColor: "#3c403d", marginTop: "2%", display: "flex", flexDirection: "row", borderRadius: "20px",visibility:this.state.alertdisable }}>
                    <InfoOutlinedIcon style={{color:"white",marginLeft:"3%",marginTop:"1.5%"}}/> 
                    
                        <div style={{ width: "60%", textAlign: "left", marginLeft: "2%", marginTop: "2%", color: "white" }}>
                         {appt[0]} ही वेळ तुमच्यासाठी योग्य आहे का?</div>
                        <Button onClick={this.addcalls.bind(this,appt[0])} style={{ marginLeft: "10%", width: "7%", height: "100%", backgroundColor: "inherit", border: "0px" }}>
                            <DoneIcon  style={{ color: "white" }} />
                        </Button>
                       
                        <Button onClick={this.noclicked} style={{ marginLeft: "0%", width: "7%", height: "100%", backgroundColor: "inherit", border: "0px" }}>
                            <ClearIcon style={{ color: "white" }} />
                        </Button>
                    </div>
                    <div  style={{ height: "7vh", width: "70%", marginLeft: "15%", backgroundColor: "#3c403d", marginTop: "-7vh", display: "flex", flexDirection: "row", borderRadius: "20px",visibility:this.state.alertdisable2 }}>
                    <InfoOutlinedIcon style={{color:"white",marginLeft:"3%",marginTop:"1.5%"}}/> 
                    
                        <div style={{ width: "60%", textAlign: "left", marginLeft: "2%", marginTop: "2%", color: "white" }}>
                         {appt[0]}ला अपॉईंटमेंट् निश्चित केली आहे</div>
                        
                    </div>
                    <div id="tex" style={{width:"70%",marginLeft:"15%",marginTop:"5%",display:"flex",flexDirection:"column",height:this.state.height,visibility:this.state.visibile}} >
                        <textarea color="white" style={{width:"99%",height:"20vh",marginLeft:"0"}} ></textarea>    
                        <Button style={{marginTop:"3.5vh",backgroundColor:"#D0DB4E",marginLeft:"37.5%",fontSize:"20px",width:"20%",height:"6vh",color:"white"}}>सेव करा</Button>
                    </div>
                    <div  style={{height:this.state.dateheight,width:"90%",visibility:this.state.selectother}}>
                                <DatePic/>
                    </div>
                    <div style={{height:this.state.butheight,width:"100%",marginTop:"2vh",visibility:this.state.butvis}} >
                        <Button onClick={this.setNew.bind(this,appt[0])} style={{width:"30%",marginLeft:"35%",backgroundColor:"#D0DB4E"}} >CONFIRM</Button>
                    </div>
                    <div style={{ height: "7vh",textAlign:"left" }}><h2 style={{marginLeft:"5%",marginTop:"1vh"}} >फोटो</h2></div>
                    <div style={{width:"90%",marginLeft:"5%",backgroundColor:"grey",height:".2vh"}} ></div>
                    <div style={{marginLeft:"9vw",marginTop:"10vh",width:"55vw" }} className={classes.root} >
                        <GridList   className={classes.gridList} cols={5}>  
                            {this.state.imgdetails.map(tile => (
                                console.log(tile),
                                i=i+1,
                                <GridListTile style={{marginLeft:"2vw",marginTop:"2.5vh",borderTopLeftRadius:"0vh",borderTopRightRadius:"0vh",borderBottomRightRadius:"2vh",borderBottomLeftRadius:"2vh"}} key={tile} >
                                    <img src={tile} alt={tile}/>
                                    <GridListTileBar
                                    title={i}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                    />
                                </GridListTile>

                            ))}
                        </GridList>
                    </div>
                    <div style={{ height: "10vh" }}></div>
                    <div style={{ height: "7vh",textAlign:"left" }}><h2 style={{marginLeft:"5%",marginTop:"1vh"}} >ऑडिओ रेकॉर्डिंग</h2></div>
                    <div style={{width:"90%",marginLeft:"5%",backgroundColor:"grey",height:".2vh"}} ></div>
                    <div style={{width:"40vw",marginLeft:"20vw",marginTop:"5vh"}} >
                        {this.state.audiodetails.map(tile => (
                            <div style={{width:"20vw"}} >
                                <audio style={{width:"20vw"}} src={tile} controls />
                            </div>
                        ))}
                    </div>

                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }

}

export default UserDetails;