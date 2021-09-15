import Router from "./Router/Router";
import Home from "./Components/Home";
import { useSelector } from "react-redux";

function App(props) {
  const state = useSelector((state) => {
    return state.islogged_in;
  });

  return (
    <div>{state || localStorage.getItem("token") ? <Router /> : <Home />}</div>
  );
}

export default App;
