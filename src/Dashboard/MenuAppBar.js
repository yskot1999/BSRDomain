import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Call from '@material-ui/icons/Call'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  
}));

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  
  return (
    <div className={classes.root}>
      
      <AppBar position="static" style={{backgroundColor:"#D0DB4E"}}>
        <Toolbar>
        <Link to={{pathname:'/Dashboardlayout',state:{name:props.name,mobilenumber:props.mobilenumber}}} style={{color:"white"}}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <DashboardIcon />
          </IconButton>
         </Link>
          <Typography variant="h6" className={classes.title}>
          शेती विषयक तज्ञ सल्ला
          </Typography>
          {auth && (
            <div>
              <Link to={{pathname:'/Dashboardlayout/CallDetails',state:{name:props.name,mobilenumber:props.mobilenumber}}} style={{color:"white"}}>
              <IconButton color="inherit" >
                <Call/>
              </IconButton>
              </Link>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <ExitToAppIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                
              >
             <Link to={{pathname:"/"}} style={{color:"black"}}>   <MenuItem>लॉग आउट</MenuItem></Link>
                
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
