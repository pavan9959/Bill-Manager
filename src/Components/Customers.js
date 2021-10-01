import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  add_customer,
  customer_api,
  delet,
  edit,
} from "../action/customer-actions/Customer-actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Swal from "sweetalert2";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import Grid from "@material-ui/core/Grid";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import TablePagination from "@material-ui/core/TablePagination";

const useStyle = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
}));

const columns = [
  { id: "name", label: "NAME", minWidth: 170 },
  { id: "id", label: "ID", minWidth: 100 },
  {
    id: "mobile",
    label: "MOBILE",
    minWidth: 170,
  },
  {
    id: "EMAIL",
    label: "EMAIL",
    minWidth: 170,
  },
  {
    id: "edit",
    label: "...EDIT...",
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

export default function Customer() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [mail, setmail] = useState("");
  const [toogleedit, settoogleedit] = useState(false);
  const [id, setid] = useState("");
  const [data, setdata] = useState([]);
  const [data2, setdata2] = useState([]);
  const [search, setsearch] = useState("");
  const [Editedname, setEditedname] = useState("");
  const [Editedphone, setEditedphone] = useState("");
  const [Editedmail, setEditedmail] = useState("");

  const classe = useStyle();

  const classes = useStyles();

  const dispatch = useDispatch();

  const AddCustomer = useSelector((state) => {
    return state.Updatecustomer;
  });

  const rows = useSelector((state) => {
    return state.CustomerList;
  });

  useEffect(() => {
    dispatch(customer_api());
  }, []);

  useEffect(() => {
    setdata([...data,AddCustomer]);
  }, [AddCustomer]);

  useEffect(() => {
    setdata2(rows);
    setdata(rows);
  }, [rows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handelname = (e) => {
    setname(e.target.value);
  };

  const handelmail = (e) => {
    setmail(e.target.value);
  };

  const handelphone = (e) => {
    setphone(e.target.value);
  };

  const classesss = useStyles();

  const handelEditedname = (e) => {
    setEditedname(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const validator = require("email-validator");
    const email_check = validator.validate(mail);
    if (name.length >= 3 && phone.length == 10 && email_check) {
      const data = { name: name, mobile: Number(phone), email: mail };
      setname("");
      setphone("");
      setmail("");
      dispatch(add_customer(data));
    } else if ((name.lengt == 0, phone.length == 0, mail.length == 0)) {
      Swal.fire("Enter details");
    } else {
      Swal.fire("wrong credentials");
    }
  };

  const Edit = (ele) => {
    setid(ele._id);
    setEditedname(ele.name);
    setEditedphone(ele.mobile);
    setEditedmail(ele.email);
    settoogleedit(true);
  };

  const update_edit = (id, Data) => {
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
  };

  const handelDelete = (id) => {
    const new_data = data.filter((ele) => {
      if (ele._id !== id) {
        return ele;
      }
    });
    setdata(new_data);
    dispatch(delet(id));
  };

  const handelSearch = (e) => {
    setsearch(e.target.value);
    if (e.target.value) {
      const toogle_data = data;
      if (search.length === 1) {
        setdata(toogle_data);
      } else {
        const result = data.filter((ele) => {
          if (ele.name.includes(e.target.value)) {
            return ele;
          }
        });
        setdata(result);
      }
    } else {
      setdata(data2);
    }
  };

  const handelEditedSubmit = (e) => {
    e.preventDefault();
    const validator = require("email-validator");
    const email_check = validator.validate(Editedmail);
    if (Editedname.length >= 3 && Editedphone.length == 10 && email_check) {
      const Data = {
        _id: id,
        name: Editedname,
        email: Editedmail,
        mobile: Number(Editedphone),
      };
      const data = { name: Editedname, mobile: Editedphone, email: Editedmail };
      setname("");
      setphone("");
      setmail("");
      dispatch(edit(Data._id, data));
      update_edit(id, Data);
    } else if ((name.lengt == 0, phone.length == 0, mail.length == 0)) {
      Swal.fire("Enter details");
    } else {
      Swal.fire("wrong credentials");
    }
  };

  const handelEditedCancel = () => {
    update_edit();
  };

  const handelEditedmail = (e) => {
    setEditedmail(e.target.value);
  };

  const handelEditedphone = (e) => {
    setEditedphone(e.target.value);
  };

  return (
    <div>
      <div>
        <h1 style={{ display: "inline" }}>CUSTOMERS</h1>
        <input
          type="text"
          placeholder="Search Customer"
          style={{
            position: "relative",
            left: "34px",
            height: "35px",
            width: "610px",
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
                      .map((row,i) => {
                        return (
                          <TableRow key={i} >
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row._id}</TableCell>
                            <TableCell>{row.mobile}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>
                              <Button
                                onClick={() => {
                                  Edit(row);
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
                                  handelDelete(row._id);
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>

          {toogleedit == false && (
            <div style={{ width: "870px" }}>
              <Card
                className={classesss.root}
                style={{
                  width: "490px",
                  position: "relative",
                  left: "17px",
                  backgroundColor: "whitesmoke",
                  top: "-41px",
                }}
              >
                <CardContent>
                  <h1
                    style={{
                      position: "relative",
                      left: "123px",
                      bottom: "29px",
                    }}
                  >
                    Add Customer
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
                      placeholder="Customer Name"
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
                      placeholder="Mobile"
                      style={{
                        width: "276px",
                        height: "35px",
                        marginBottom: "10px",
                      }}
                      value={phone}
                      onChange={handelphone}
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="Email"
                      style={{
                        width: "276px",
                        height: "35px",
                        marginBottom: "10px",
                      }}
                      value={mail}
                      onChange={handelmail}
                    />
                    <br />
                    <Button
                      variant="contained"
                      style={{ position: "relative", left: "54px" }}
                      onClick={handelSubmit}
                    >
                      Add Customer
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
          {toogleedit && (
            <div style={{ width: "870px" }}>
              <Card
                className={classesss.root}
                style={{
                  width: "490px",
                  position: "relative",
                  left: "17px",
                  backgroundColor: "whitesmoke",
                  top: "-41px",
                }}
              >
                <CardContent>
                  <h1
                    style={{
                      position: "relative",
                      left: "123px",
                      bottom: "29px",
                    }}
                  >
                    Edit Customer
                  </h1>
                  <form
                    style={{
                      position: "relative",
                      left: "96px",
                      bottom: "20px",
                    }}
                    onSubmit={handelEditedSubmit}
                  >
                    <input
                      type="text"
                      placeholder="Customer Name"
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
                      placeholder="Mobile"
                      style={{
                        width: "276px",
                        height: "35px",
                        marginBottom: "10px",
                      }}
                      value={Editedphone}
                      onChange={handelEditedphone}
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="Email"
                      style={{
                        width: "276px",
                        height: "35px",
                        marginBottom: "10px",
                      }}
                      value={Editedmail}
                      onChange={handelEditedmail}
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
                      style={{ position: "relative", left: "18px" }}
                      onClick={handelEditedSubmit}
                    >
                      Update Customer
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
