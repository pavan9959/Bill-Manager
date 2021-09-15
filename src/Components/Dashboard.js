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
    <div style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}>
      <Card
        className={classesss.root}
        style={{
          width: "435px",
          height: "300px",
          position: "relative",
          left: "1px",
          backgroundColor: "whiteSmoke",
          top: "30px",
        }}
      >
        <CardContent style={{ textAlign: "center" }}>
          <h1>Customer</h1>
          <hr />
          <br />
          <h2>Total customers</h2>
          <h1>{customer.length}</h1>
        </CardContent>
      </Card>

      <Card
        className={classesss.root}
        style={{
          width: "430px",
          height: "300px",
          position: "relative",
          left: "7px",
          backgroundColor: "whiteSmoke",
          top: "30px",
        }}
      >
        <CardContent style={{ textAlign: "center" }}>
          <h1>Admin</h1>
          <hr />
          <br />
          <h2>{Admin.username}</h2>
          <h3>{Admin.email}</h3>
          <h4>{Admin.address}</h4>
        </CardContent>
      </Card>
      <Card
        className={classesss.root}
        style={{
          width: "435px",
          height: "300px",
          position: "relative",
          left: "13px",
          backgroundColor: "whiteSmoke",
          top: "30px",
        }}
      >
        <CardContent style={{ textAlign: "center" }}>
          <h1>Products</h1>
          <hr />
          <br />
          <h2>Total Products</h2>
          <h1>{ProductList.length}</h1>
        </CardContent>
      </Card>
      <Card
        className={classesss.root}
        style={{
          width: "435px",
          height: "200px",
          position: "relative",
          left: "452px",
          backgroundColor: "whiteSmoke",
          top: "50px",
        }}
      >
        <CardContent style={{ textAlign: "center" }}>
          <h1>Bills</h1>
          <hr />
          <h2>Total Bills</h2>
          <h1>{billlist.length}</h1>
        </CardContent>
      </Card>
    </div>
    <div style={{ position: "relative", top: "54px", left: "22px" }}>
        <Chart />
      </div>
    </div>
  );
};
export default Dashboard;
