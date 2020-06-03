//import React from "react";
//import ReactDOM from "react-dom";
//import { Container, Row, Col, Jumbotron, Card, CardBody } from "reactstrap";
import {Link,Route, Redirect} from 'react-router-dom';
//import LoginForm from "./Dashboard/LoginForm";
import React from 'react';
import firebase from './firebase.js';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
//import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
//import { makeStyles } from '@material-ui/core/styles';
//import Container from '@material-ui/core/Container';
import { Card, ThemeProvider } from "@material-ui/core";
import logo from "./bsr_app_icon.jpg"
import Dashboardlayout from './Dashboardlayout.js';
export default class App extends React.Component {
    constructor(){
        super();
        this.state={
            name:"",
            mobo:"",
            pass:"",
            data:[],
            val:false
        }
    }
    makeStyles= (theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          marginLeft:"25%",
          backgroundColor: "blue",
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      });
      componentDidMount(){
        
        const db=firebase.database().ref('/domainexpert');
        db.on('value',(snapshot)=>{
            const state=snapshot.val();
            console.log(state)
           var newstate=[];
            for(let i in state){
newstate.push({
    id:i,
                    name:state[i].name,
                    mobno:state[i].mobilenumber,
                    passw:state[i].password,
                });
               // console.log(state[i]);
            }
            this.setState({
                data:newstate
            })
            console.log(this.state.data);
        });  
    }
    validate(){
        console.log(this.state.data.length);
    }
    render(){
        var db=firebase.database().ref('/users/9561275394');
        db.on('value',(snapshot)=>{
            console.log(snapshot.val())
        })
        const classes = this.makeStyles;
        if(this.state.val)
        {
            return(
                <Redirect to={{pathname: "/Dashboardlayout", state: {name:this.state.name,mobo:this.state.mobo}}}/>
        )
        }
        return (
            <div style={{height:"100vh",width:"100%",display:"flex",flexDirection:"row"}} >
            <div style={{height:"100vh",width:"50%"}} >
                <img src={logo} style={{height:"60vh",width:"50%",marginTop:"18vh",marginLeft:"25%"}} ></img>
            </div>
            <div style={{height:"100%",width:"50%"}} >
             <CssBaseline />
            
            <Card style={{width:"60%",height:"75%",marginTop:"12.5%",marginLeft:"0%",display:"flex",flexDirection:"column"}} >
                <div style={{width:"100%",marginTop:"10%",display:"flex",flexDirection:"column"}}>
                <Avatar style={{marginLeft:"45%",
          backgroundColor: "#D0DB4E",}} className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography style={{marginLeft:"42%",marginTop:"2vh"}} component="h1" variant="h5">
                Sign in
                </Typography>
                </div>
                <form className={classes.form} noValidate>
                    <div style={{width:"100%",marginTop:"5%",display:"flex",flexDirection:"column"}}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        //fullWidth
                        id="name"
                        label="Name"
                        name="email"
                        autoComplete="name"
                        autoFocus
                        type="text"
                        style={{width:"20vw",marginLeft:"5vw"}}
                        value={this.state.name}
                        onChange={(event)=>{this.setState({name:event.target.value})}}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"         
                        required
                        name="number"
                        type="text"
                        label="Mobile Number"
                        id="number"
                        autoComplete="number"
                        style={{width:"20vw",marginLeft:"5vw"}}
                        value={this.state.mobo}
                        onChange={(event)=>{this.setState({mobo:event.target.value})}}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"         
                        required
                        name="password"
                        type="password"
                        label="Enter the password"
                        id="password"
                        autoComplete="password"
                        style={{width:"20vw",marginLeft:"5vw"}}
                        value={this.state.pass}
                        onChange={(event)=>{this.setState({pass:event.target.value})}}
                    />
                                                                                   
                        <Button
                            id="submit"
                            variant="contained"
                         
                            className={classes.submit}
                            style={{marginTop:"2vh",width:"40%",marginLeft:"30%",backgroundColor:"#D0DB4E"}}
                            onClick={() => {
                                console.log(this.state.data);
                                var flag=0;
                                this.state.data.map(item => {
                                    console.log(typeof(item.name));
                                    console.log(typeof(item.id));
                                    console.log(typeof(item.passw));
                                  if(item.name===this.state.name && item.id===this.state.mobo && item.passw===this.state.pass )
                                  {
                                    console.log(item.name);
                                    flag=1;
                                    
                                  }  
                                })
                                console.log(flag);
                                if(flag===0)
                                {
                                    document.getElementById("err").style.visibility="visible";
                                }
                                else{
                                    this.setState({
                                        val:true
                                    })
                                }                             
                                }}
                        >
                        <span>Login</span>
                        </Button>
                        <span id="err" style={{visibility:"hidden",textAlign:"center",marginLeft:"25%",width:"50%",color:"red",marginTop:"2vh"}} >Invalid credentials</span>
                   </div>
                     </form>   
                    
                    </Card>
                    
                
         
            </div>
            </div>
        );
    }
  }