import React from "react";
import Button from '@material-ui/core/Button';
import UserDetails from './UserDetails.js'
import MaterialIcon, {colorPalette} from 'material-icons-react';
import SaveIcon from '@material-ui/icons/Save';
import Avatar from '@material-ui/core/Avatar';
class Button1 extends React.Component
{
    constructor(){
        super();
        
    }

 render(){   
return(
    <Button  onClick={()=>{this.props.onadded(this.props.phone)}} variant="contained"
    style={{height:"10vh",width:"100%",backgroundColor:"white",textAlign:"left",border:"0vh",marginTop:"1%"}}>
   <div style={{height:"10vh",width:"20vw",display:"flex",flexDirection:"row"}}>
    <div style={{height:"5vh",width:"3vw",marginTop:"5%"}}>
        <Avatar style={{backgroundColor:"#d0db4e"}}>{this.props.name[0]}</Avatar>
    </div>
    <div style={{height:"10vh",width:"5vw",display:"flex",flexDirection:"column"}}>
   <div  style={{marginTop:"2vh",height:"3vh",width:"13vw",marginLeft:"1vw"}}>{this.props.name}</div>
   <div  style={{height:"5vh",width:"13vw",marginLeft:"1vw",color:"grey"}}>{this.props.phone}</div>
    </div>
    </div>
</Button>
);
 }

}
export default Button1;