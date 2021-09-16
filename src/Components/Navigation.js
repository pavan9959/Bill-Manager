import { Link, Route, withRouter } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import { useState } from "react";
import Home from "./Home";

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

const Navigation = (props) => {
  const [toogle, settoogle] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  const flag = useSelector((state) => {
    return state.flag;
  });

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
            <Link to="/">
              <div className={classes.root}>
                <HomeIcon color="action" fontSize="large" />
              </div>
            </Link>
          </Typography>
          <Button>
            <Link to="/reg" style={{ color: "black" }}>Register</Link>
          </Button>
          <Button>
            <Link to="/log" style={{ color: "black" }}>Login</Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Route path="/" component={Home} exact={true} />
      <Route path="/reg" component={Register} exact={true} />
      <Route path={"/log"} component={Login} exact={true} />
    </div>
  );
};
export default withRouter(Navigation);
