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
  addproduct,
  Product_List,
  deletE,
  edit_product,
} from "../action/Products-actions/Products-actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import Grid from "@material-ui/core/Grid";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import Swal from "sweetalert2";

const useStyle = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
}));

const columns = [
  { id: "name", label: "NAME", minWidth: 170 },
  {
    id: "price",
    label: "PRICE",
    minWidth: 170,
  },
  {
    id: "edit",
    label: "..EDIT..",
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

export default function Product() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [name, setname] = useState("");
  const [Price, setPrice] = useState("");
  const [data, setdata] = useState([]);
  const [data2, setdata2] = useState([]);
  const [toogleedit, settoogleedit] = useState(false);
  const [id, setid] = useState("");
  const [search, setsearch] = useState("");
  const [Editedname, setEditedname] = useState("");
  const [Editedprice, setEditedprice] = useState("");

  const classe = useStyle();

  const classes = useStyles();

  const classess = useStyles();

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const ProductList = useSelector((state) => {
    return state.productList;
  });

  const add = useSelector((state) => {
    return state.products;
  });

  useEffect(() => {
    dispatch(Product_List());
  }, []);

  useEffect(() => {
    setdata2([...data, ...add]);
    setdata([...data, ...add]);
  }, [add]);

  useEffect(() => {
    setdata2(ProductList);
    setdata(ProductList);
  }, [ProductList]);

  const handelname = (e) => {
    setname(e.target.value);
  };

  const handelPrice = (e) => {
    setPrice(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (name && Price) {
      const result = { name: name, price: Price };
      dispatch(addproduct(result));
      setname("");
      setPrice("");
    } else {
      Swal.fire("Please Enter Details");
    }
  };

  const update_edit = (id, Data) => {
    settoogleedit(!toogleedit);
    if (id) {
      settoogleedit(!toogleedit);
      if (id) {
        const edited_customer = data.map((ele) => {
          if (id != ele._id) {
            return ele;
          } else {
            return Data;
          }
        });
        setdata(edited_customer);
      }
    }
  };

  const handelDelete = (id) => {
    const result = data.filter((ele) => {
      return ele._id != id;
    });
    setdata(result);
    dispatch(deletE(id));
  };

  const handelEdit = (data) => {
    setid(data._id);
    setEditedname(data.name);
    setEditedprice(data.price);
    settoogleedit(true);
  };

  const handelSearch = (e) => {
    setsearch(e.target.value);
    if (e.target.value) {
      const result = data.filter((ele) => {
        if (ele.name.includes(e.target.value)) {
          return ele;
        }
      });
      setdata(result);
    } else {
      setdata(data2);
    }
  };

  const handelEditedname = (e) => {
    setEditedname(e.target.value);
  };
  const handelEditedPrice = (e) => {
    setEditedprice(e.target.value);
  };

  const handelEditeSubmit = (e) => {
    e.preventDefault();
    if (Editedname.length >= 3 && Editedprice.length > 0) {
      const Data = { _id: id, name: Editedname, price: Editedprice };
      const data = { name: Editedname, price: Editedprice };
      setEditedname("");
      setEditedprice("");
      dispatch(edit_product(Data._id, data));
      update_edit(id, Data);
    } else if ((Editedname.lengt == 0, Editedprice.length == 0)) {
      Swal.fire("Enter details");
    } else {
      Swal.fire("wrong credentials");
    }
  };

  const handelEditedCancel = () => {
    update_edit();
  };

  return (
    <div>
      <div>
        <h1 style={{ display: "inline" }}>PRODUCTS</h1>
        <input
          type="text"
          placeholder="Search Customer"
          style={{
            position: "relative",
            left: "40px",
            height: "35px",
            width: "621px",
          }}
          value={search}
          onChange={handelSearch}
        ></input>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={
              ({ position: "relative", left: "14px" }, { width: "1450px" })
            }
          >
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((ele) => {
                        return (
                          <TableRow>
                            <TableCell>{ele.name}</TableCell>
                            <TableCell>{ele.price}</TableCell>
                            <TableCell>
                              <Button
                                onClick={() => {
                                  handelEdit(ele);
                                }}
                              >
                                <Grid container className={classe.root}>
                                  <Grid item xs={4}>
                                    <Grid item xs={8}>
                                      <EditTwoToneIcon />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                onClick={() => {
                                  handelDelete(ele._id);
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

          {!toogleedit && (
            <div style={{ width: "870px" }}>
              <Card
                className={classess.root}
                style={{
                  width: "490px",
                  position: "relative",
                  left: "17px",
                  top: "-40px",
                  backgroundColor: "whitesmoke",
                }}
              >
                <CardContent>
                  ,
                  <h1
                    style={{
                      position: "relative",
                      left: "123px",
                      bottom: "29px",
                    }}
                  >
                    Add Product
                  </h1>
                  <form
                    style={{
                      position: "relative",
                      left: "96px",
                      bottom: "20px",
                    }}
                    onSubmit={handelSubmit}
                  >
                    <input
                      type="text"
                      placeholder="Product Name"
                      style={{
                        width: "276px",
                        height: "35px",
                        marginBottom: "10px",
                      }}
                      value={name}
                      onChange={handelname}
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="Price"
                      style={{
                        width: "276px",
                        height: "35px",
                        marginBottom: "10px",
                      }}
                      value={Price}
                      onChange={handelPrice}
                    />
                    <br />
                    <Button
                      variant="contained"
                      style={{ position: "relative", left: "54px" }}
                      onClick={handelSubmit}
                    >
                      Add Product
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
          {toogleedit && (
            <div style={{ width: "870px" }}>
              <Card
                className={classess.root}
                style={{
                  width: "490px",
                  height: "276px",
                  position: "relative",
                  left: "17px",
                  top: "-40px",
                  backgroundColor: "whitesmoke",
                }}
              >
                <CardContent style={{ position: "relative", top: "16px" }}>
                  <h1
                    style={{
                      position: "relative",
                      left: "123px",
                      bottom: "29px",
                    }}
                  >
                    Edit Product
                  </h1>
                  <form
                    style={{
                      position: "relative",
                      left: "96px",
                      bottom: "20px",
                    }}
                    onSubmit={handelEditeSubmit}
                  >
                    <input
                      type="text"
                      placeholder="Product Name"
                      style={{
                        width: "276px",
                        height: "35px",
                        marginBottom: "10px",
                      }}
                      value={Editedname}
                      onChange={handelEditedname}
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="Price"
                      style={{
                        width: "276px",
                        height: "35px",
                        marginBottom: "10px",
                      }}
                      value={Editedprice}
                      onChange={handelEditedPrice}
                    />
                    <br />
                    <Button
                      variant="contained"
                      style={{ position: "relative", left: "0px" }}
                      onClick={handelEditedCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      style={{ position: "relative", left: "33px" }}
                      onClick={handelEditeSubmit}
                    >
                      Update Product
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
