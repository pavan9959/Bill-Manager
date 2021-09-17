import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {
  toogle_home,
  push_loggin,
  Loggedin,
  userDetails,
  Customer_list,
  add_customer,
  Product_List,
  add_product,
  billList,
  addbill,
  Get_Bill,
} from "../reducer/reducers";

const Store = () => {
  const configstore = createStore(
    combineReducers({
      flag: toogle_home,
      push_to_loggin: push_loggin,
      islogged_in: Loggedin,
      user_details: userDetails,
      CustomerList: Customer_list,
      Updatecustomer: add_customer,
      productList: Product_List,
      products: add_product,
      Bill_List: billList,
      AddBill: addbill,
      getBill: Get_Bill,
    }),
    applyMiddleware(thunk)
  );
  return configstore;
};

export default Store;
