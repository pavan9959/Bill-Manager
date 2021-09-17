import { Link, Route, withRouter } from "react-router-dom";
import { logout_request } from "../action/Logout/Logout-action";
import { useDispatch } from "react-redux";
import Customers from "../Components/Customers";
import Product from "../Components/Product";
import Bill from "../Components/Bill";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import Dashboard from "../Components/Dashboard";

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
            <Link to="/">
              <div className={classes.root}>
                <HomeIcon color="action" fontSize="large" />
              </div>
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit">
              <Link to="/customers" style={{ color: "black" }}>
                Customers
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/product" style={{ color: "black" }}>
                Products
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/bill" style={{ color: "black" }}>
                Bill
              </Link>
            </Button>
          </Typography>
          <Button color="inherit">
            <Link to="" onClick={handel_logout} style={{ color: "black" }}>
              Logout
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Route path="/" exact={true} component={Dashboard} />
      <Route path="/product" exact={true} component={Product} />
      <Route path="/bill" exact={true} component={Bill} />
      <Route path="/customers" exact={true} component={Customers} />
    </div>
  );
};

export default withRouter(Router);
