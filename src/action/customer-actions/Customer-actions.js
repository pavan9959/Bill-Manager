import Swal from "sweetalert2";
import axios from "axios";

export const customer_api = () => {
  return (dispatch) => {
    axios
      .get("https://dct-billing-app.herokuapp.com/api/customers", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
        dispatch({ type: "Customers_list", payload: result });
      })
      .catch((err) => {
        alert(console.error.message);
      });
  };
};

export const add_customer = (data) => {
  const add = (result) => {
    return { type: "add_customer", payload: result };
  };
  return (dispatch) => {
    axios
      .post("https://dct-billing-app.herokuapp.com/api/customers", data, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
        if (result.hasOwnProperty("errors")) {
          Swal.fire("please enter correct details");
        } else {
          dispatch(add(result));
        }
      })
      .catch((err) => {
        Swal.fire("Server Error");
      });
  };
};

export const edit = (id, data) => {
  return (dispatch) => {
    axios
      .put(`https://dct-billing-app.herokuapp.com/api/customers/${id}`, data, {
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

export const delet = (id) => {

  return (dispatch) => {
    axios
      .delete(`https://dct-billing-app.herokuapp.com/api/customers/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
      });
  };
};
