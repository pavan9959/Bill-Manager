import axios from "axios";
import Swal from "sweetalert2";

export const Product_List = () => {
  const prod = (result) => {
    return { type: "product", payload: result };
  };

  return (dispatch) => {
    axios
      .get("https://dct-billing-app.herokuapp.com/api/products", {
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
      .post("https://dct-billing-app.herokuapp.com/api/products", data, {
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
      .delete(`https://dct-billing-app.herokuapp.com/api/products/${id}`, {
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
      .put(`https://dct-billing-app.herokuapp.com/api/products/${id}`, data, {
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
