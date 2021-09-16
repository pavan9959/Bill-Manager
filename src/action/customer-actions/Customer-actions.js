import Swal from "sweetalert2";
import axios from "axios";

export const coustomer_api = () => {
  return (dispatch) => {
    axios
      .get("http://dct-billing-app.herokuapp.com/api/customers", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
        dispatch({ type: "Coustomers_list", payload: result });
      })
      .catch((err) => {
        alert(console.error.message);
      });
  };
};

export const add_coustomer = (data) => {
  const add = (result) => {
    return { type: "add_coustomer", payload: result };
  };
  return (dispatch) => {
    axios
      .post("http://dct-billing-app.herokuapp.com/api/customers", data, {
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
  const ed = (result) => {
    return { type: "add_coustomer", payload: result };
  };
  return (dispatch) => {
    axios
      .put(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, data, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
        // dispatch(ed(result))
      })
      .catch((err) => {
        Swal.fire("error");
      });
  };
};

export const delet = (id) => {
  // const del=(result)=>{
  //     return {type:"add_coustomer",payload:result}
  // }

  return (dispatch) => {
    axios
      .delete(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
        // dispatch(del(result))
      });
  };
};
