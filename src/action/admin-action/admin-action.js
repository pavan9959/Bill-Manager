import axios from "axios";

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
