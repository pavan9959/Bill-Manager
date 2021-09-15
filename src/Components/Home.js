import { Link, Route, withRouter } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { Handel_home } from "../action/action";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import { useState } from "react";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

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

const Home = (props) => {
  const [toogle, settoogle] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  const flag = useSelector((state) => {
    return state.flag;
  });

  const handel_home = () => {
    dispatch(Handel_home());
  };

  return (
    <div
      className={classes.root}
      style={{
        backgroundColor: "lightsteelblue",
        height: "100vh",
        position: "relative",
        top: "-4px",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/"
              onClick={handel_home}
              onClick={() => {
                settoogle(false);
              }}
            >
              <div className={classes.root}>
                <HomeIcon color="action" fontSize="large" />
              </div>
            </Link>
          </Typography>
          <Button>
            <Link
              to="/reg"
              onClick={handel_home}
              style={{ color: "black" }}
              onClick={() => {
                settoogle(true);
              }}
            >
              Register
            </Link>
          </Button>
          <Button>
            <Link
              to="/log"
              onClick={handel_home}
              style={{ color: "black" }}
              onClick={() => {
                settoogle(true);
              }}
            >
              Login
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      {!toogle && (
        <div style={{ textAlign: "center", position: "relative", top: "66px" }}>
          <h1>Bill Manager</h1>
          <h3>Get your data at one place</h3>
          <p>
            Simple and User friendly app to keep track of your customers and
            Products
          </p>
          <p>Update a new customer or Product at any given time</p>
          <div>
            <h1>Usage</h1>
            <p>Kindly login with ur registered email</p>
            <p>
              If you are not having an account then Kindly Register to us by
              clicking on REGISTER
            </p>
            <p>You can view all of your data at Dashboard </p>
            <p>
              In customer page you can add,edit or can delete a specific
              customer{" "}
            </p>
            <p>You can Generate bill and can download Invoice</p>
          </div>
        </div>
      )}

      <Route path="/reg" component={Register} exact={true} />
      <Route path={"/log"} component={Login} exact={true} />
    </div>
  );
};
export default withRouter(Home);
