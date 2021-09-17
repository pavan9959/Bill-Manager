const flag = false;
const push_to_loggin = false;
const log = false;
const user_Details = {};
const cu_list = [];

export const toogle_home = (state = flag, action) => {
  switch (action.type) {
    default: {
      return !state;
    }
  }
};

export const push_loggin = (state = push_to_loggin, action) => {
  switch (action.type) {
    case "PUSH_LOGGIN": {
      return !state;
    }
    default: {
      return state;
    }
  }
};

export const Loggedin = (state = log, action) => {
  switch (action.type) {
    case "ISLOGGEDIn": {
      return !state;
    }
    default: {
      return state;
    }
  }
};

export const userDetails = (state = user_Details, action) => {
  switch (action.type) {
    case "USER": {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export const Customer_list = (state = cu_list, action) => {
  switch (action.type) {
    case "Customers_list": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export const add_customer = (state = [], action) => {
  switch (action.type) {
    case "add_customer": {
      return [...state, { ...action.payload }];
    }
    default: {
      return state;
    }
  }
};

export const Product_List = (state = [], action) => {
  switch (action.type) {
    case "product": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export const add_product = (state = [], action) => {
  switch (action.type) {
    case "Addproduct": {
      return [...state, { ...action.payload }];
    }
    default: {
      return state;
    }
  }
};

export const billList = (state = [], action) => {
  switch (action.type) {
    case "billlist": {
      return [...action.payload];
    }
    default: {
      return state;
    }
  }
};

export const addbill = (state = [], action) => {
  switch (action.type) {
    case "addbill": {
      return [...state, { ...action.payload }];
    }
    default: {
      return state;
    }
  }
};

export const Get_Bill = (state = {}, action) => {
  switch (action.type) {
    case "Get_Bill": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
