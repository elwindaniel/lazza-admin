import {
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import React, { useState, useEffect } from "react";
import useTable from "../../controls/table/useTable";
import { dailyStockRequests } from "../../../../api/constants";

import Axios from "../../../../api/axios";
import { MdSearch } from "react-icons/md";

import "../stock.css";
import service from "../../../../api/service";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "rgba(248,205,94,1)",
    padding: theme.spacing(2),
    marginTop: 20,
    marginBottom: 20,
  },
  right: {
    marginLeft: "80%",
    height: "30px",
  },
  left: {
    marginLeft: "80%",
  },
  tablePaper: {
    padding: theme.spacing(1),
  },
  searchTextField: {
    width: "75%",
  },
  paper: {
    width: "50%",
    backgroundColor: theme.palette.background.paper,

    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const headCells = [
  { id: "index", label: "Index", diableSorting: true },
  { id: "variantName", label: "Variant Name" },
  { id: "currentStock", label: "Current Stock" },
];

export default function DailyStock() {
  const session = {
    token: sessionStorage.getItem("token"),
  };

  let userId;

  const payloadStart = session.token.indexOf(".") + 1;
  const payloadEnd = session.token.lastIndexOf(".");
  let payload = session.token.substring(payloadStart, payloadEnd);

  if (payload.length === 0) {
  } else {
    payload = atob(payload);
    const jsonPayload = JSON.parse(payload);
    userId = jsonPayload.id;
  }

  const [Values, setinitialValues] = useState({
    country: "",
  });
  const GET_DailyStock_URL = `${dailyStockRequests.getDailyStock}/`;

  const [records, setRecords] = useState();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  const [filterfn, setFilterfn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const GetData = async () => {
    try {
      service.GetStockingpoint().then((res) => {
        setLoading(true);

        if (res.data.length > 0) {
          // console.log(res.data, "res.data");
          setPosts(res.data);
          setLoading(false);
        } else {
          setPosts([]);

          setLoading(false);
        }
      });
    } catch (e) {}
  };

  useEffect(() => {
    GetData();
  }, []);

  const classes = useStyles();

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterfn);

  const handleSearch = (e) => {
    let target = e.target;

    setFilterfn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              x[0].variantName.toLowerCase().includes(target.value) ||
              x[0].generatedOn.toLowerCase().includes(target.value)
          );
      },
    });
  };

  function child() {
    GetData();
  }
  const GetSP = (id) => {
    service
      .GetDailyStick(id)
      .then((res) => {
        setRecords(res.data);
      })
      .catch((err) => {});
    // Simulate async call
    return new Promise((resolve, reject) => {
      switch (id) {
        default:
          resolve([]);
      }
    });
  };
  const [country, setCurrency] = React.useState("");
  return (
    <>
      <Paper className={classes.root}>
        <Formik>
          <Field
            className="textFormikField_flex8"
            placeholder="India"
            as="select"
            id="country"
            name="country"
            // value={country}
            onChange={async (e) => {
              const { value } = e.target;
              // console.log(value);
              let jsonVariable = JSON.parse(value);
              const _regions = await GetSP(jsonVariable.id);
            }}
          >
            <option>Select Stocking Point</option>
            {posts && posts.length
              ? posts.map((post) => {
                  let json = {
                    id: post._id,
                    name: post.name,
                  };
                  let a = JSON.stringify(json);
                  return (
                    <option key={post._id} value={a}>
                      {post.name}
                    </option>
                  );
                })
              : null}
          </Field>
        </Formik>

        <div className={classes.right}>
          <div className="createbtn"></div>{" "}
        </div>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {loading ? null : records && records.length ? (
            <Paper className={classes.tablePaper}>
              <TextField
                placeholder="Search"
                fullWidth
                margin="small"
                variant="outlined"
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdSearch />
                    </InputAdornment>
                  ),
                }}
              />

              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item, index) => (
                    <TableRow key={item._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item[0].variantName}</TableCell>
                      <TableCell>{item[0].currentStock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TblContainer>
              <TblPagination />
            </Paper>
          ) : (
            <Paper className={classes.tablePaper}>
              "Select Stocking Point"
            </Paper>
          )}
        </Grid>
      </Grid>
      {/* Modal */}
    </>
  );
}
