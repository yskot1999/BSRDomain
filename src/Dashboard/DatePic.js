import React from 'react'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
export default function DatePic(props) {
  
  const [selectedDate, setSelectedDate] = React.useState(new Date().toLocaleDateString());

  const handleDateChange = (date) => {
      console.log(selectedDate)
    setSelectedDate(date);
  };
 // const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
      console.log(event.target.value)
      var time=event.target.value;
      var sel=[];
      document.cookie="date=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie="time=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      //console.log(typeof(selectedDate));
      //sel=selectedDate.split(" ");
      var day="",month="",year="";
      var dat=JSON.stringify(selectedDate);
      console.log(typeof(dat));
      console.log(dat);
      sel=dat.split("-");     //for day and year
      var y=[];
      y=sel[0].split('"');
      year=y[1];
      month=sel[1];
      var datf=[];
      datf=sel[2].split("T");
      day=datf[0];
      console.log(datf[0]);
      console.log(sel[1]);
      /*var mo=parseInt(sel[1]);
      mo+=1;
      console.log(mo.toString());*/
      if(day==="31")
      {
          day="1";
          if(month==="12")
          {
             month="01";
             year=(parseInt(year) + 1).toString();
          }
          else
          {
            month=(parseInt(month)+1).toString();
            if(month.length===1)
            {
              month="0"+month;
            }
          }
      }
      else
      {
        day=(parseInt(day) + 1).toString();
      }
      var findat=month + "/" + day + "/" + year + " " + time;
      console.log(findat);
      
      //findat=findat+sel[2] + "/" + sel[3] + " " + time;
    //  document.cookie="ap=" + findat;
      //console.log(document.cookie);
      localStorage.setItem("changedappt",findat);
    setAge(event.target.value);
    
  };

  return (
      <div style={{display:"flex",flexDirection:"row"}}>
<div style={{marginLeft:"20%",marginTop:"-1vh"}}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid >
      <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="तारीख निवडा"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
    </div>
    <div style={{marginLeft:"10%"}}>
      <FormControl variant="outlined" style={{width:"170%"}} >
      <InputLabel id="demo-simple-select-filled-label">वेळ निवडा</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={age}
        onChange={handleChange}
      >
       
        <MenuItem value={"११ - ११:३0"}>११ - ११:३0</MenuItem>
        <MenuItem value={"११:३0 - १२"}>११:३0 - १२</MenuItem>
        <MenuItem value={"१२ - १२:३0"}>१२ - १२:३0</MenuItem>
        <MenuItem value={"१२:३0 - १"}>१२:३0 - १</MenuItem>
        <MenuItem value={"५ - ५:३0"}>५ - ५:३0</MenuItem>
        <MenuItem value={"५:३0 - ६"}>५:३0 - ६</MenuItem>
        <MenuItem value={"६ - ६:३0"}>६ - ६:३0</MenuItem>
        <MenuItem value={"६:३0 - ७"}>६:३0 - ७</MenuItem>
      </Select>
    </FormControl>
    </div>
    </div>
  );
}