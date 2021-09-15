import axios from "axios";
import Swal from "sweetalert2";

export const Handel_home = () => {
  return { type: "toogle_home" };
};

export const register = (data, navlink) => {
  return () => {
    axios
      .post("http://dct-billing-app.herokuapp.com/api/users/register", data)
      .then((response) => {
        const result = response.data;
        if (result.hasOwnProperty("errors")) {
          Swal.fire("Enter Correct Cradentials");
        } else {
          navlink.push("/log");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const loginrequest = (data, redirect) => {
  const log = () => {
    return { type: "ISLOGGEDIn" };
  };

  return (dispatch) => {
    axios
      .post(" http://dct-billing-app.herokuapp.com/api/users/login", data)
      .then((response) => {
        const result = response.data;
        if (result.hasOwnProperty("errors")) {
          Swal.fire(result.errors);
        } else {
          localStorage.setItem("token", `Bearer ${result.token}`);
          dispatch(log());
          redirect();
        }
      })
      .catch(() => {
        Swal.fire("Servor Error");
      });
  };
};

export const logout_request = () => {
  return { type: "ISLOGGEDIn" };
};

export const user_detail = () => {
  const user = (result) => {
    return { type: "USER", payload: result };
  };

  return (dispatch) => {
    axios
      .get("http://dct-billing-app.herokuapp.com/api/users/account", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
        dispatch(user(result));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

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

export const Product_List = () => {
  const prod = (result) => {
    return { type: "product", payload: result };
  };

  return (dispatch) => {
    axios
      .get("http://dct-billing-app.herokuapp.com/api/products", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
        dispatch(prod(result));
      });
  };
};

export const addproduct = (data) => {
  const add = (result) => {
    return { type: "Addproduct", payload: result };
  };
  return (dispatch) => {
    axios
      .post("http://dct-billing-app.herokuapp.com/api/products", data, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
        dispatch(add(result));
      });
  };
};

export const deletE = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
        dispatch({ type: "add" });
      });
  };
};

export const edit_product = (id, data) => {
  return (dispatch) => {
    axios
      .put(`http://dct-billing-app.herokuapp.com/api/products/${id}`, data, {
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
