import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {
  toogle_home,
  push_loggin,
  Loggedin,
  userDetails,
  Coustomer_list,
  add_coustomer,
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
      CoustomerList: Coustomer_list,
      Updatecoustomer: add_coustomer,
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
