// import { Link,Route } from "react-router-dom"
// import { logout_request } from "./action/action"
// import { useDispatch } from "react-redux"
// import Coustomers from "./Coustomers"
// import User from "./User"
// import Product from "./Product"
// import Bill from "./Bill"
// import {AppBar,Toolbar,Typography,Button} from "@material-ui/core"
// import { makeStyles } from '@material-ui/core/styles'
// import SvgIcon from '@material-ui/core/SvgIcon';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import { useEffect,useState } from "react"
// import {coustomer_api,Product_List,Bill_list } from "./action/action"
// import { useSelector } from "react-redux"
// import Dashboard from "./Dashboard"

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//     },
//   }))

//   function HomeIcon(props) {
//     return (
//       <SvgIcon {...props}>
//         <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//       </SvgIcon>
//     );
//   }

// const Router=(props)=>{

//   const [toogle,settoogle]=useState(true)

//     const classess = useStyles();

//     const classes = useStyles()

//     const dispatch=useDispatch()

//     const handel_logout=()=>{
//         localStorage.removeItem("token")
//         dispatch(logout_request())
//     }

//     const billlist=useSelector((state)=>{
//       return state.Bill_List
//   })

//   const coustomer=useSelector((state)=>{
//     return state.CoustomerList
//   })

//   const products=useSelector((state)=>{
//     return state.productList
//   })

//   useEffect(()=>{
//     dispatch(Bill_list())
//   },[])

//   useEffect(()=>{
//     dispatch(coustomer_api())
//   },[])

//   useEffect(()=>{
//     dispatch(Product_List())
//   },[])

//   const handeltoogle=()=>{
//     settoogle(true)
//   }

//   const handelfalse=()=>{
//     settoogle(false)
//   }

//     return (
//         <div >
//              <AppBar position="static" >
//                 <Toolbar>
//                         <Typography variant="h6" className={classes.title}>
//                                 <Link to="/User"><div className={classes.root}><HomeIcon color="action" fontSize="large" /></div></Link>
//                         </Typography>
//                         <Typography variant="h6" className={classes.title} >
//                                 <Button color="inherit" onClick={handelfalse}><Link to="/bill">Dashboard</Link></Button>
//                                 <Button color="inherit" onClick={handelfalse} ><Link to="/coustomers">Customers</Link></Button>
//                                 <Button color="inherit" onClick={handelfalse}><Link to="/product">Products</Link></Button>
//                                 <Button color="inherit" onClick={handelfalse}><Link to="/bill">Bill</Link></Button>
//                         </Typography>
//                         <Button color="inherit"><Link to="/logout" onClick={handel_logout}>Logout</Link></Button>
//                 </Toolbar>
//             </AppBar>
//                 <Route path="/User" exact={true} component={User} />
//                 <Route path="/product" exact={true}  component={Product} />
//                 <Route path="/bill" exact={true}  component={Bill} />
//                 <Route path="/coustomers"exact={true}  component={Coustomers} />
//         </div>
//     )
// }

// export default Router

import { Link, Route ,withRouter} from "react-router-dom";
import { logout_request } from "../action/action";
import { useDispatch } from "react-redux";
import Coustomers from "../Components/Customers";
import Product from "../Components/Product";
import Bill from "../Components/Bill";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import Login from "../Components/Login";

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

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Router = (props) => {

  // function Redirect(){
  //   props.history.push("/dashboard")
  // }
  // Redirect()


  const classes = useStyles();

  const dispatch = useDispatch();

  const handel_logout = () => {
    localStorage.removeItem("token");
    dispatch(logout_request());
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/dashboard">
              <div className={classes.root}>
                <HomeIcon color="action" fontSize="large" />
              </div>
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit">
              <Link to="/coustomers" style={{ color: "black" }}>
                Customers
              </Link>
            </Button>
            <Button color="inherit" >
              <Link to="/product" style={{ color: "black" }}>
                Products
              </Link>
            </Button>
            <Button color="inherit" >
              <Link to="/bill" style={{ color: "black" }}>
                Bill
              </Link>
            </Button>
          </Typography>
          <Button color="inherit">
            <Link
              to="/logout"
              onClick={handel_logout}
              style={{ color: "black" }}
            >
              Logout
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Route path="/log" exact={true} component={Login} />
      <Route path="/dashboard" exact={true} component={Dashboard} />
      <Route path="/product" exact={true} component={Product} />
      <Route path="/bill" exact={true} component={Bill} />
      <Route path="/coustomers" exact={true} component={Coustomers} />
    </div>
  );
  
};

export default withRouter(Router);
