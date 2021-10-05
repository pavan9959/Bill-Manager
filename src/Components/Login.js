import { useState } from "react";
import { loginrequest } from "../action/Login/Login-action";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../image/logo.svg"

const Login = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [toogle, settoogle] = useState(false);
  const dispatch = useDispatch();

  const handelmail = (e) => {
    setemail(e.target.value);
  };

  const handelpassword = (e) => {
    setpassword(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    const validator = require("email-validator");
    const email_check = validator.validate(data.email);
    if (email_check && data.password.length > 8) {
      settoogle(false);
      const redirect = () => {
        props.history.push("/");
      };
      dispatch(loginrequest(data, redirect));
    } else {
      settoogle(true);
    }
  };


  return (
    <div
      style={{
        backgroundImage:"lightsteelblue",
        height: "100vh",
        position:"relative"
        ,top:"-20px"
      }}
    >
      <img src={logo} style={{position:"relative",top:"40px"}}/>
      <div style={{ textAlign: "center",position:"relative",top:"-380px",left: "200px",display:"inline" }}>
        <h1 >Login</h1>
        <div>
          <form onSubmit={handelSubmit}>
            <input
              style={{ marginBottom: "5px" ,width:"300px",height:"30px",borderRadius:"4px"}}
              type="text"
              value={email}
              placeholder="Email"
              onChange={handelmail}
            />
            <br />
            <input
              style={{width:"300px",height:"30px",borderRadius:"4px"}}
              type="password"
              value={password}
              placeholder="Password"
              onChange={handelpassword}
            />
            <br />
            {toogle && (
              <p style={{ color: "red" }}>Email or Password is incorrect</p>
            )}
            <button onClick={handelSubmit} style={{ marginTop: "5px" ,width:"100px",height:"30px"}}>
              Login
            </button>
            <p>
              Don't have account <Link to="/reg">Register</Link> with us
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
