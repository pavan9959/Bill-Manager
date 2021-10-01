import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { register } from "../action/Register/Register-action";
import reg from "../image/reg.svg";

const Register = (props) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [busimessname, setbname] = useState("");
  const [address, setaddress] = useState("");
  const dispatch = useDispatch();

  const handelname = (e) => {
    setname(e.target.value);
  };

  const handelemail = (e) => {
    setemail(e.target.value);
  };

  const handelpassword = (e) => {
    setpassword(e.target.value);
  };

  const handelBname = (e) => {
    setbname(e.target.value);
  };

  const handeladdress = (e) => {
    setaddress(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && busimessname && address) {
      const data = {
        username: name,
        email: email,
        password: password,
        businessName: busimessname,
        address: address,
      };
      dispatch(register(data, props.history));
    } else {
      Swal.fire("Please Provide All Credentials");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "lightsteelblue",
        height: "100vh",
        position: "relative",
        top: "7px",
      }}
    >
      <img
        src={reg}
        style={{
          position: "relative",
          top: "40px",
          left: "10px",
          height: "500px",
        }}
      />
      <div
        style={{
          textAlign: "center",
          position: "relative",
          top: "-390px",
          right: "-250px",
          display: "inline",
        }}
      >
        <h1>Register</h1>
        <form onSubmit={handelSubmit}>
          <input
            placeholder="Enter name"
            value={name}
            onChange={handelname}
            style={{ marginBottom: "5px", width: "300px", height: "30px" }}
          ></input>
          <br />
          <input
            placeholder="Enter Email"
            value={email}
            onChange={handelemail}
            style={{ marginBottom: "5px", width: "300px", height: "30px" }}
          ></input>
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handelpassword}
            style={{ marginBottom: "5px", width: "300px", height: "30px" }}
          ></input>
          <br />
          <input
            placeholder="Business name"
            value={busimessname}
            onChange={handelBname}
            style={{ marginBottom: "5px", width: "300px", height: "30px" }}
          ></input>
          <br />
          <textarea
            placeholder="Address"
            value={address}
            onChange={handeladdress}
            style={{ marginBottom: "5px", width: "300px", height: "50px" }}
          ></textarea>
          <br />
          <button
            onClick={handelSubmit}
            style={{ marginTop: "5px", width: "100px", height: "30px" }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
