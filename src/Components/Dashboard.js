import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {  useEffect } from "react";
import {
  coustomer_api,
  user_detail,
  Product_List,
  Bill_list,
} from "../action/action";   
import Chart from "./Chart";

const useStyles = makeStyles({
  root: {
    width: "60%",
  },
  container: {
    maxHeight: 440,
  },
});

const Dashboard = () => {
  const dispatch = useDispatch();

  const customer = useSelector((state) => {
    return state.CoustomerList;
  });

  useEffect(() => {
    dispatch(coustomer_api());
  }, []);

  const Admin = useSelector((state) => {
    return state.user_details;
  });

  useEffect(() => {
    dispatch(user_detail());
  }, []);

  const ProductList = useSelector((state) => {
    return state.productList;
  });

  useEffect(() => {
    dispatch(Product_List());
  }, []);

  const billlist = useSelector((state) => {
    return state.Bill_List;
  });

  useEffect(() => {
    dispatch(Bill_list());
  }, []);

  const classesss = useStyles();
  return (
    <div>
    <div style={{ display: "flex" }}>
      <Card
        className={classesss.root}
        style={{
          width: "300px",
          height: "200px",
          position: "relative",
          left: "1px",
          backgroundColor: "orange",
          top: "30px",
        }}
      >
        <CardContent style={{ textAlign: "center",position:"relative",top:"-34px" }}>
          <h1>Customer</h1>
          <hr />
          <h2>Total customers</h2>
          <h1>{customer.length}</h1>
        </CardContent>
      </Card>

      <Card
        className={classesss.root}
        style={{
          width: "300px",
          height: "200px",
          position: "relative",
          left: "47px",
          backgroundColor: "lightblue",
          top: "30px",
        }}
      >
        <CardContent style={{ textAlign: "center",position:"relative",top:"-34px" }}>
          <h1>Admin</h1>
          <hr />
          <h2>{Admin.username}</h2>
          <h3>{Admin.email}</h3>
          <h4>{Admin.address}</h4>
        </CardContent>
      </Card>
      <Card
        className={classesss.root}
        style={{
          width: "300px",
          height: "200px",
          position: "relative",
          left: "96px",
          backgroundColor: "orangered",
          top: "30px",
        }}
      >
        <CardContent style={{ textAlign: "center",position:"relative",top:"-34px" }}>
          <h1>Products</h1>
          <hr />
          <h2>Total Products</h2>
          <h1>{ProductList.length}</h1>
        </CardContent>
      </Card>
      <Card
        className={classesss.root}
        style={{
          width: "300px",
          height: "200px",
          position: "relative",
          left: "148px",
          backgroundColor: "lightgreen",
          top: "30px",
        }}
      >
        <CardContent style={{ textAlign: "center",position:"relative",top:"-34px" }}>
          <h1>Bills</h1>
          <hr />
          <h2>Total Bills</h2>
          <h1>{billlist.length}</h1>
        </CardContent>
      </Card>
    </div>
    <div style={{ position: "relative", top: "54px", left: "-50px" }}>
        <Chart />
      </div>
    </div>
  );
};
export default Dashboard;
