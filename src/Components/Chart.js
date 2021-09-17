import React from "react";
import Chart from "react-google-charts";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Bill_list } from "../action/Bills-actions/Bills-actions";
import { customer_api } from "../action/customer-actions/Customer-actions";
import { Product_List } from "../action/Products-actions/Products-actions";

const Charts = () => {
  const dispatch = useDispatch();

  const billData = useSelector((state) => {
    return state.Bill_List;
  });

  const customerData = useSelector((state) => {
    return state.CustomerList;
  });

  const product = useSelector((state) => {
    return state.productList;
  });

  useEffect(() => {
    dispatch(customer_api());
    dispatch(Product_List());
    dispatch(Bill_list());
  }, []);
  console.log(billData)

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

  return (
    <div style={{ display: "flex" }}>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={chartdata()}
        options={{
          chart: {
            title: "Daily Sales",
          },
        }}
        rootProps={{ "data-testid": "2" }}
      />

      <Chart
        style={{ position: "relative", top: "27px" }}
        width={"500px"}
        height={"250px"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={Customer()}
        options={{
          chart: {
            title:"Regular Customer"
          },
        }}
        rootProps={{ "data-testid": "2" }}
      />

      <Chart
        width={"400px"}
        height={"300px"}
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
