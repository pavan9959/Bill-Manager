import axios from "axios";
import Swal from "sweetalert2";

export const Bill_list = () => {
  return (dispatch) => {
    axios
      .get("http://dct-billing-app.herokuapp.com/api/bills", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
        dispatch({ type: "billlist", payload: result });
      })
      .catch((err) => {
        Swal.fire("Server Error");
      });
  };
};

export const add_Bill = (data) => {
  return (dispatch) => {
    axios
      .post("http://dct-billing-app.herokuapp.com/api/bills", data, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
        dispatch({ type: "addbill", payload: result });
      })
      .catch((err) => {
        Swal.fire("error");
      });
  };
};

export const delete_bill = (data) => {
  return (dispatch) => {
    axios
      .delete(`http://dct-billing-app.herokuapp.com/api/bills/${data._id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
      })
      .catch((err) => {
        Swal.fire("error");
      });
  };
};

export const Get_bill = (id, setviewdata) => {
  return (dispatch) => {
    axios
      .get(`http://dct-billing-app.herokuapp.com/api/bills/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
        dispatch({ type: "Get_Bill", payload: result });
      });
  };
};
