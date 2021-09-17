import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  Bill_list,
  delete_bill,
  add_Bill,
} from "../action/Bills-actions/Bills-actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DehazeTwoToneIcon from "@material-ui/icons/DehazeTwoTone";
import ReactToPdf from "react-to-pdf";
import { customer_api } from "../action/customer-actions/Customer-actions";
import { Product_List } from "../action/Products-actions/Products-actions";

const useStyle = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
}));

const columns = [
  { id: "name", label: "NAME", minWidth: 170 },
  { id: "total", label: "TOTAL", minWidth: 100 },
  {
    id: "created at",
    label: "CREATED AT",
    minWidth: 170,
  },
  {
    id: "view",
    label: "..VIEW..",
    minWidth: 170,
  },
  {
    id: "delete",
    label: "..DELETE..",
    minWidth: 170,
  },
];

const useStyles = makeStyles({
  root: {
    width: "60%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function Bill() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setdata] = useState([]);
  const [data2, setdata2] = useState([]);
  const [open, setOpen] = useState(false);
  const [customerName, setcustomersName] = useState("");
  const [productid, setproductid] = useState("");
  const [date, setdate] = useState("");
  const [quantity, setquantity] = useState("");
  const [popupTable, setpopuptable] = useState([]);
  const [show, setshow] = useState(false);
  const [viewdetails, setviewdetails] = useState([]);
  const [dispatchdata, setdispatchdata] = useState([]);
  const [ToogleDownload, setToogleDownload] = useState(false);
  const [downloadData, setdownloadData] = useState([]);
  const [cname, setcname] = useState("");
  const [total, settotal] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = () => {
    setdispatchdata([]);
    setproductid("");
    setcustomersName("");
    setdate("");
    setquantity("");
    setOpen(true);
  };

  const handleClose = () => {
    setquantity("");
    setpopuptable([]);
    setproductid("");
    setcustomersName("");
    setOpen(false);
  };

  const classes = useStyles();
  const classe = useStyle();

  const dispatch = useDispatch();

  const billlist = useSelector((state) => {
    return state.Bill_List;
  });

  const customer = useSelector((state) => {
    return state.CustomerList;
  });

  const products = useSelector((state) => {
    return state.productList;
  });

  const AddBill = useSelector((state) => {
    return state.AddBill;
  });

  useEffect(() => {
    dispatch(Bill_list());
    dispatch(Product_List());
    dispatch(customer_api());
  }, []);

  useEffect(() => {
    setdata2([...data, ...AddBill]);
    setdata([...data, ...AddBill]);
  }, [AddBill]);

  useEffect(() => {
    setdata2(billlist);
    setdata(billlist);
  }, [billlist]);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (date && customer && quantity && productid && quantity > 0) {
      let result = {
        date: date.slice(0, 10),
        customer: customerName,
        lineItems: [{ product: productid, quantity: Number(quantity) }],
      };
      if (dispatchdata.length > 0) {
        const data = dispatchdata.map((ele) => {
          if (ele.customer == customerName) {
            ele.lineItems.push(result.lineItems[0]);
          } else {
            return ele;
          }
        });
      } else {
        setdispatchdata([result]);
      }
      const productname = products.filter((ele) => {
        if (productid == ele._id) {
          return ele;
        }
      });
      const data1 = {
        _id: productid,
        name: productname[0].name,
        quantity: quantity,
        Total: productname[0].price * quantity,
      };
      setpopuptable([...popupTable, { ...data1 }]);
      setquantity("");
    } else {
      setOpen(!open);
      Swal.fire("Please Enter All Required Field");
    }
  };

  const handelCustomer = (e) => {
    setcustomersName(e.target.value);
  };

  const handelproduct = (e) => {
    setproductid(e.target.value);
  };

  const handeldate = (e) => {
    let d = e.target.value;
    setdate(e.target.value.slice(0, 10));
  };

  const handelquantity = (e) => {
    setquantity(e.target.value);
  };

  const handelDelete = (i) => {
    dispatch(delete_bill(i));
    const result = data.filter((ele) => {
      if (ele._id != i._id) {
        return ele;
      }
    });
    setdata(result);
  };

  const handelView = (ele) => {
    const data = [];
    products.map((elem) => {
      ele.map((element) => {
        if (elem._id == element.product) {
          data.push({ ...element, name: elem.name });
        }
      });
    });
    let n = "";
    billlist.map((element) => {
      element.lineItems.map((ele) => {
        if (ele._id == data[0]._id) {
          n = element._id;
        }
      });
    });

    let id = "";
    billlist.map((element) => {
      if (n == element._id) {
        id = element.customer;
      }
    });

    customer.map((element) => {
      if (element._id == id) {
        data[0].name = element.name;
      }
    });
    setviewdetails(data);
    setshow(!show);
  };

  const handel_close = () => {
    setshow(!show);
    setviewdetails([]);
  };

  const handelremove = (id) => {
    const data = popupTable.filter((ele) => {
      if (ele._id != id) {
        return ele;
      }
    });
    setpopuptable(data);
  };

  const handeldminus = (ele) => {
    const productprice = products.filter((element) => {
      if (element._id == ele._id) {
        return element.price;
      }
    });
    let n;
    const data = popupTable.map((element) => {
      if (ele._id == element._id) {
        let num = Number(ele.quantity);
        n = num - 1;
        let total = productprice[0].price * n;
        if (num < 1) {
          num = 1;
          total = 0;
        }
        return { ...element, quantity: num - 1, Total: total };
      } else {
        return element;
      }
    });
    setpopuptable(data);

    const data1 = dispatchdata.map((element) => {
      if (element.lineItems.product == ele.product) {
        return { ...element, ...(element.lineItems[0].quantity = n) };
      } else {
        return element;
      }
    });
    setdispatchdata(data1);
  };

  const handeldplus = (ele) => {
    const productprice = products.filter((element) => {
      if (element._id == ele._id) {
        return element.price;
      }
    });
    let n;
    const data = popupTable.map((element) => {
      if (ele._id == element._id) {
        let num = Number(ele.quantity);
        n = num + 1;
        return {
          ...element,
          quantity: num + 1,
          Total: productprice[0].price * n,
        };
      } else {
        return element;
      }
    });
    setpopuptable(data);

    const data1 = dispatchdata.map((element) => {
      if (element.lineItems.product == ele.product) {
        return { ...element, ...(element.lineItems[0].quantity = n) };
      } else {
        return element;
      }
    });
    setdispatchdata(data1);
  };

  const handleGenerate = () => {
    setpopuptable([]);
    if (dispatchdata.length > 0) {
      setOpen(!open);
      dispatch(add_Bill(dispatchdata[0]));
      const customer_name = customer.filter((ele) => {
        if (ele._id == dispatchdata[0].customer) {
          return ele;
        }
      });
      setcname(customer_name[0].name);
      let downloadData = [];
      products.map((ele) => {
        dispatchdata[0].lineItems.map((element) => {
          if (ele._id == element.product) {
            downloadData.push({
              ...ele,
              name: ele.name,
              price: ele.price,
              quantity: element.quantity,
              total: ele.price * element.quantity,
              date: dispatchdata[0].date,
            });
          }
        });
      });
      let total = 0;
      downloadData.map((ele) => {
        total += ele.total;
      });
      settotal(total);
      setdispatchdata([]);
      setdownloadData(downloadData);
      setToogleDownload(!ToogleDownload);
    } else {
      setOpen(!open);
      Swal.fire("Please Add Items To Cart Before Generating Bill");
    }
  };

  const handelDownload = () => {
    setToogleDownload(!ToogleDownload);
  };

  const handeltotal = (ele) => {
    let price = 0;
    ele.map((element) => {
      price += element.price * element.quantity;
    });
    return price;
  };

  const handelSearch = (e) => {
    if (e.target.value) {
      const cdata = customer.filter((ele) => {
        if (ele.name.includes(e.target.value)) {
          return ele;
        }
      });
      const d = [];
      data.filter((ele) => {
        cdata.filter((element) => {
          if (ele.customer == element._id) {
            d.push(ele);
          }
        });
      });
      setdata(d);
    } else {
      setdata(data2);
    }
  };

  const Subtotal = () => {
    let count = 0;
    viewdetails.map((ele) => {
      count += ele.price * ele.quantity;
    });
    return count;
  };

  const ref = React.createRef();

  return (
    <div>
      <input
        type="text"
        placeholder="Search By Name"
        style={{
          marginBottom: "8px",
          marginTop: "8px",
          height: "28px",
          width: "840px",
        }}
        onChange={handelSearch}
      ></input>
      <div style={{ position: "relative", top: "-42px", left: "880px" }}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Create Bill
        </Button>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            style={
              ({ display: "flex", justifyContent: "center" },
              { height: "500px" })
            }
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <DialogContent>
                  <DialogContentText>
                    <form className={classes.container}>
                      <TextField
                        id="date"
                        type="date"
                        Value={date}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handeldate}
                      />
                    </form>
                    <form onSubmit={handelSubmit}>
                      <select value={customerName} onChange={handelCustomer}>
                        <option value="">Select Customer</option>
                        {customer.map((ele) => {
                          return (
                            <option value={ele._id} key={ele.id}>
                              {ele.name}
                            </option>
                          );
                        })}
                      </select>
                      <br />
                      <select value={productid} onChange={handelproduct}>
                        <option value="">Select Product</option>
                        {products.map((ele) => {
                          return (
                            <option value={ele._id} key={ele._id}>
                              {ele.name}
                            </option>
                          );
                        })}
                      </select>
                      <br />
                      <input
                        type="text"
                        value={quantity}
                        onChange={handelquantity}
                      />
                      <button onClick={handelSubmit}>Add Item</button>
                    </form>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleGenerate} color="primary">
                      Generate Bill
                    </Button>
                  </DialogContentText>
                </DialogContent>
              </div>
              <div>
                <DialogActions>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell>NAME</TableCell>
                        <TableCell>QUANTITY</TableCell>
                        <TableCell>TOTAL</TableCell>
                        <TableCell>REMOVE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {popupTable.map((ele) => {
                        return (
                          <TableRow key={ele.id}>
                            <TableCell>{ele.name}</TableCell>
                            <TableCell>
                              <button
                                onClick={() => {
                                  handeldminus(ele);
                                }}
                              >
                                -
                              </button>
                              {ele.quantity}
                              <button
                                onClick={() => {
                                  handeldplus(ele);
                                }}
                              >
                                +
                              </button>
                            </TableCell>
                            <TableCell>{ele.Total}</TableCell>
                            <TableCell>
                              <button
                                onClick={() => {
                                  handelremove(ele._id);
                                }}
                              >
                                Remove
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </DialogActions>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", left: "14px", width: "1450px" }}>
          <Paper style={{ backgroundColor: "whitesmoke" }}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((ele) => {
                      return (
                        <TableRow key={ele.id}>
                          {customer.map((cust, i) => {
                            if (ele.customer == cust._id) {
                              return <TableCell key={i}>{cust.name}</TableCell>;
                            }
                          })}
                          <TableCell>{handeltotal(ele.lineItems)}</TableCell>
                          <TableCell>{ele.date}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => {
                                handelView(ele.lineItems);
                              }}
                            >
                              <Grid container className={classe.root}>
                                <Grid item xs={4}>
                                  <Grid item xs={8}>
                                    <DehazeTwoToneIcon />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => {
                                handelDelete(ele);
                              }}
                            >
                              <Grid container className={classe.root}>
                                <Grid item xs={4}>
                                  <Grid item xs={8}>
                                    <DeleteTwoToneIcon />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>

      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={
          ({ display: "flex", justifyContent: "center" }, { height: "500px" })
        }
      >
        <div style={{ justifyContent: "center" }}>
          <DialogContent ref={ref}>
            <h1>Bill</h1>
            <hr />
            {viewdetails[0] && (
              <h2 style={{ color: "grey" }}>
                Customer Name-{viewdetails[0].name}
              </h2>
            )}
            <h2 style={{ color: "grey" }}>Date-{Date().slice(0, 23)}</h2>
            <hr />
            <DialogContentText>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>NAME</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>QUANTITY</TableCell>
                    <TableCell>SUB TOTAL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {viewdetails.map((ele) => {
                    return (
                      <TableRow>
                        <TableCell>{ele.name}</TableCell>
                        <TableCell>{ele.price}</TableCell>
                        <TableCell>{ele.quantity}</TableCell>
                        <TableCell>{ele.subTotal}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <hr />
            </DialogContentText>
          </DialogContent>
          <h3
            style={{
              position: "relative",
              top: "-30px",
              left: "25px",
              color: "grey",
            }}
          >
            Total-{Subtotal()}
          </h3>
          <Button
            onClick={handel_close}
            color="primary"
            style={{ position: "relative", left: "290px", bottom: "78px" }}
          >
            Close
          </Button>
        </div>
        <ReactToPdf targetRef={ref} filename="bill.pdf">
          {({ toPdf }) => (
            <Button
              onClick={toPdf}
              style={{
                position: "relative",
                bottom: "10px",
                height: "200px",
                backgroundColor: "lightblue",
              }}
            >
              Download Bill
            </Button>
          )}
        </ReactToPdf>
      </Dialog>

      <Dialog
        open={ToogleDownload}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={
          ({ display: "flex", justifyContent: "center" }, { height: "500px" })
        }
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DialogContent ref={ref}>
            <h1>Bill</h1>
            <hr />
            <h3 style={{ color: "grey" }}>Customer Name-{cname}</h3>
            <h3 style={{ color: "grey" }}>Date-{Date().slice(0, 23)}</h3>
            <hr />
            <DialogContentText>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Sub Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {downloadData.map((ele) => {
                    return (
                      <TableRow>
                        <TableCell>{ele.name}</TableCell>
                        <TableCell>{ele.price}</TableCell>
                        <TableCell>{ele.quantity}</TableCell>
                        <TableCell>{ele.total}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <hr />
              <h3>Total-{total}</h3>
              <Button
                onClick={handelDownload}
                color="primary"
                style={{ position: "relative", left: "310px", bottom: "46px" }}
              >
                Close
              </Button>
            </DialogContentText>
          </DialogContent>
          <DialogActions></DialogActions>
        </div>
        <ReactToPdf targetRef={ref} filename="bill.pdf">
          {({ toPdf }) => (
            <Button
              onClick={toPdf}
              style={{
                position: "relative",
                bottom: "10px",
                height: "200px",
                backgroundColor: "lightblue",
              }}
            >
              Download Bill
            </Button>
          )}
        </ReactToPdf>
      </Dialog>
    </div>
  );
}
