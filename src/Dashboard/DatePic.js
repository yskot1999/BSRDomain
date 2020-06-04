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
      time=event.target.value;
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
    <div style={{height:"6vh",width:"10vw",marginLeft:"10%"}}>
        <button onClick={datetime} style={{height:"100%",width:"100%",backgroundColor:"#d0db4e",color:"white",border:"0px",marginTop:"1vh"}}>CONFIRM</button>
          </div>
    </div>
  );
}
