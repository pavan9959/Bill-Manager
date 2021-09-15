import React from "react";
import Chart from "react-google-charts";
import { useSelector, useDispatch } from "react-redux";
import {useEffect } from "react";
import {
  coustomer_api,
  Product_List,
  Bill_list,
} from "../action/action";

const Charts = () => {
  const dispatch = useDispatch();

  const billData = useSelector((state) => {
    return state.Bill_List;
  });

  const customerData = useSelector((state) => {
    return state.CoustomerList;
  });

  const product = useSelector((state) => {
    return state.productList;
  });

  useEffect(() => {
    dispatch(coustomer_api());
  }, []);

  useEffect(() => {
    dispatch(Product_List());
  }, []);

  useEffect(() => {
    dispatch(Bill_list());
  }, []);

  const chartdata = () => {
    if (billData) {
      const data = [];
      const Datearray = billData.map((ele) => {
        return ele.date.slice(0, 10);
      });
      Datearray.map((ele) => {
        if (data.includes(ele)) {
          return ele;
        } else {
          data.push(ele);
        }
      });
      const obj2 = {};
      billData.map((ele) => {
        if (obj2.hasOwnProperty(ele.date.slice(0, 10))) {
          obj2[ele.date.slice(0, 10)] += 1;
        } else {
          obj2[ele.date.slice(0, 10)] = 1;
        }
      });

      let result = [["Date", "Sales"]];
      for (let keys in obj2) {
        result.push([keys, obj2[keys]]);
      }
      return result;
    } else {
      return [];
    }
  };

  const Customer = () => {
    const data = {};
    customerData.map((ele) => {
      if (data.hasOwnProperty(ele.name)) {
        data[ele.name] += 1;
      } else {
        data[ele.name] = 1;
      }
    });
    const obj = [["Customer", "Quantity"]];
    for (let key in data) {
      obj.push([key, data[key]]);
    }
    return obj;
  };

  const data = chartdata();
  const barData = Customer();

  return (
    <div style={{ display: "grid" }}>
      <Chart
        style={{ position: "relative", left: "20px" }}
        width={"1200px"}
        height={"500px"}
        chartType="ScatterChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          chart: {
            title: "Daily Sales",
          },
        }}
        rootProps={{ "data-testid": "2" }}
      />

      <Chart
        style={{ position: "relative", left: "89px" }}
        width={"1000px"}
        height={"500px"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={barData}
        options={{
          chart: {
            title: "Regular Customers",
          },
        }}
        rootProps={{ "data-testid": "2" }}
      />

      <Chart
        style={{ position: "relative", left: "170px" }}
        width={"800px"}
        height={"600px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Task", "Hours per Day"],
          ["Customers", customerData.length],
          ["Products", product.length],
          ["Bills", billData.length],
        ]}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default Charts;
