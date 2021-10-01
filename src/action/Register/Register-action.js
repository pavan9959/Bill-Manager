import axios from "axios";
import Swal from "sweetalert2";

export const register = (data, navlink) => {
  return () => {
    axios
      .post("https://dct-billing-app.herokuapp.com/api/users/register", data)
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
