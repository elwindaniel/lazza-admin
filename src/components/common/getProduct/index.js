import React, { useEffect, useState } from "react";
import "./allProducts.css";
import HeadBannerImg from "../../../assets/allProduct/allProductbanner.png";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
  Snackbar,
} from "@material-ui/core";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./card/card";
import Service from "../../../api/service";
import { category, product, cart } from "../../../api/constants";
import Alert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";
const drawerWidth = 100;
let theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 37,
    },
  },
  drawer: {
    width: drawerWidth,
    marginTop: "40px",
    flexShrink: 0,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  divroot: {
    marginRight: "20px",
  },
  pagination: {
    "& > *": {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      display: "flex",
      justifyContent: "center",
    },
  },
  body: {
    minHeight: "55vh",
  },
  topText: {
    marginRight: 50,
    flexGrow: 1,
    color: "#1B1D2A",
  },
  flex: {
    display: "flex",
    backgroundColor: "#F8CD5E",
  },
  drawerClosed: {
    display: "none",
  },
  button: {
    marginLeft: 20,
  },
}));

function AllProducts({ onSuccess, pinCode, name, userId, phone }) {
  const [categoryList, setCategoryList] = useState();
  const [productList, setProductList] = useState(true);
  const [openAlert, setopenAlert] = useState(false);
  const [loading, setLoading] = useState();
  const [getCartCount, setGetCartCount] = useState(0);
  const [currntPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(50);
  const [open, setOpen] = React.useState(false);

  // const get_cart_count = `${cart.getCartCount}/${userId}`;

  const CartCount = async () => {
    try {
      await Service.GetCartCount(userId).then((res) => {
        if (res.data.length > 0) {
          setGetCartCount(res.data);
        } else {
          setGetCartCount([]);
        }
      });
    } catch (e) { }
  };

  const GetCategori = async () => {
    try {
      await Service.GetCategory().then((res) => {
        if (res.data.length > 0) {
          setCategoryList(res.data);
        } else {
          setCategoryList([]);
        }
      });
    } catch (e) { }
  };

  const fetchPosts = async () => {
    try {
      await Service.GetAllProduct().then((res) => {
        setLoading(true);
        if (res.data.length > 0) {
          setProductList(res.data);
          setLoading(false);
        } else {
          setProductList([]);
          setLoading(false);
        }
      });
    } catch (e) { }
  };

  useEffect(() => {
    GetCategori();
    CartCount();
    fetchPosts();
  }, []);

  const indexOfLastPost = currntPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  let currentPost;
  let paginationquotient;
  let paginationRemainter;
  let PaginationLength = 0;

  if (loading === false) {
    currentPost = productList.slice(indexOfFirstPost, indexOfLastPost);

    paginationquotient = Math.floor(productList.length / postPerPage);
    paginationRemainter = productList.length % postPerPage;

    if (paginationRemainter > 0) {
      PaginationLength = paginationquotient + 1;
    } else {
      PaginationLength = paginationquotient;
    }
  }

  const classes = useStyles();

  const pageChangeFn = (event, value) => {
    setCurrentPage(value);
  };
  const openFilter = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const filterClose = () => {
    setOpen(false);
  };
  function backfn() {
    onSuccess();
  }
  function addCartSuccess() {
    setopenAlert(true);
    CartCount();
  }

  const handleCloseAlert = () => {
    setopenAlert(false);
  };

  return (
    <div className="allProduct">
      <MuiThemeProvider theme={theme}>
        <div className={classes.flex}>
          <Typography className={classes.topText} variant="h6" align="left">
            Pincode : {pinCode}
          </Typography>
          <Typography className={classes.topText} variant="h6" align="left">
            Name : {name}
          </Typography>

          <div onClick={backfn}>
            {" "}
            <Typography className={classes.topText} variant="h6" align="right">
              close
            </Typography>
          </div>
        </div>
        <div
          className="allProduct_heading"
          style={{ backgroundImage: `url(${HeadBannerImg})`, height: "120px" }}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h2" align="center">
              All Products
            </Typography>
          </ThemeProvider>
        </div>
        <div>
          <Grid container justify="center" className={classes.body}>
            {currentPost && currentPost.length
              ? currentPost.map((data) => {
                return (
                  <div className={classes.divroot}>
                    <Card
                      key={data._id}
                      id={data._id}
                      imgsrc={data.productImage}
                      title={data.productName}
                      offer={data.offers}
                      filterGp={data.filterGroups}
                      disMrp={data.discountPrice}
                      mrp={data.regularPrice}
                      varient={data.variants}
                      varientId={data.variantId}
                      varientName={data.variantName}
                      description={data.description}
                      pincode={pinCode}
                      userId={userId}
                      onSuccess={() => addCartSuccess()}
                    />
                  </div>
                );
              })
              : null}
          </Grid>
          <div className={classes.pagination}>
            <Pagination
              count={PaginationLength}
              shape="rounded"
              onChange={pageChangeFn}
            />
          </div>
        </div>
      </MuiThemeProvider>

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Add to cart!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AllProducts;
