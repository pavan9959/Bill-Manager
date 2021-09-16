import axios from "axios";
import Swal from "sweetalert2";

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
