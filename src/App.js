import Router from "./Router/Router";
import Navigation from "./Components/Navigation";
import { useSelector } from "react-redux";

function App(props) {
  const state = useSelector((state) => {
    return state.islogged_in;
  });
  return (
    <div>{state || localStorage.getItem("token") ? <Router /> : <Navigation />}</div>
  );
}

export default App;
