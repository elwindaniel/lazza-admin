import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import CardActions from "@material-ui/core/CardActions";
import "./card.css";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "@material-ui/core/Modal";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { API_URL, category, product } from "../../../../api/constants";
import AddToCartBox from "../addToCart";

const useStyles = makeStyles((theme) => ({
  divroot: {
    marginRight: "50%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "3%",
    },
  },
  root: {
    width: 300,
    height: 430,
    marginBottom: "5%",
    marginRight: "50%",
    marginTop: "5%",
  },
  media: {
    paddingTop: "180px",
    objectFit: "contain",
  },
  paper: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  varientDropdown: {
    width: "80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: "15px 0 0 0",
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(0.5),
    position: "relative",
  },
  varientDropdownOptions: {
    zIndex: 9,
    width: "80px",
    position: "absolute",
    top: "71px",
    padding: theme.spacing(1),
  },
  discountPrice: {
    height: 75,
  },
  root: {
    width: 300,
    height: 430,
    marginBottom: "5%",
    marginRight: "50%",
    marginTop: "5%",
  },
  media: {
    paddingTop: "180px",
    objectFit: "contain",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  modal: {
    width: 300,
    height: 430,
  },
}));
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: "#ff9100",
  },
  tooltip: {
    backgroundColor: "rgba(188,135,0,1)",
    fontSize: theme.typography.pxToRem(18),
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const MAX_LENGTH = 25;

function Cards(props) {
  const classes = useStyles();

  const [pincodeOpen, setPincodeOpen] = React.useState(false);
  const [productData, setProductData] = React.useState({
    productId: props.id,
    productName: props.title,
    offer: props.offer,
    img: props.imgsrc,
    discountPrice: props.disMrp,
    regularPrice: props.mrp,
    filterGp: props.filterGp,
    pinCode: props.pincode,
    userId: props.userId,
    variantId: props.varientId,
    variantName: props.varientName,
  });

  //varientList
  const [varientList, setVarientList] = React.useState(props.varient);
  // console.log(props, "props");
  const [data, setData] = React.useState({
    variantName: varientList[0].variantName,

    variantId: varientList[0]._id,

    productId: props.id,
    productName: props.title,
  });

  const [isDropdownOptions, setIsDropdownOptions] = React.useState(false);
  const changeVariant = (index) => {
    let temp = varientList[0];
    varientList[0] = varientList[index + 1];
    varientList[index + 1] = temp;
    setIsDropdownOptions(!isDropdownOptions);
    setProductData({
      variantId: varientList[0]._id,
      productId: varientList[0]._id,
      variantName: varientList[0].variantName,
      productName: varientList[0].variantName,
      offer: varientList[0].offers,

      img: varientList[0].imagePath,
      discountPrice: varientList[0].discountPrice,
      regularPrice: varientList[0].regularPrice,
    });
  };

  const [addCartOpen, setAddCartOpen] = React.useState(false);
  const [addCartData, setAddCartData] = React.useState(false);

  const addToCart = (cData) => {
    // console.log(cData, "cData");
    setAddCartOpen(true);
    setAddCartData(cData);
  };

  const addCartClose = () => {
    setAddCartOpen(false);
  };
  function addCartSuccess(selectedSP) {
    setAddCartOpen(false);
    // console.log(selectedSP, "ssssssssssss");
    props.onSuccess();
  }

  return (
    <div>
      <Card className={classes.root}>
        <Grid container justify="space-between" style={{ width: "100%" }}>
          {productData.offer ? (
            <div className="offer">
              <div className="offer_subDiv">Offer</div>
            </div>
          ) : (
            <div style={{ width: "20px" }}></div>
          )}
          <div
            className="varientDropdown"
            onClick={() => setIsDropdownOptions(!isDropdownOptions)}
            onMouseEnter={() => setIsDropdownOptions(!isDropdownOptions)}
            onMouseLeave={() => setIsDropdownOptions(!isDropdownOptions)}
          >
            <div
              style={{
                width: "75px",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <img
                src={`${API_URL}/${varientList[0].imagePath}`}
                alt=""
                height="40px"
              />
            </div>
            {varientList[1] ? (
              <ExpandMoreIcon
                style={{
                  color: "rgba(194,141,3,100%)",
                }}
                fontSize="large"
              />
            ) : null}
            {varientList[1] && isDropdownOptions ? (
              <div className="varientDropdownOptions">
                {varientList.slice(1, 7).map((data, index) => {
                  return (
                    <div
                      className="varientDropdownOptionsName"
                      onClick={() => changeVariant(index)}
                    >
                      <div
                        style={{
                          width: "80px",
                          display: "flex",

                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={`${API_URL}/${data.imagePath}`}
                          alt=""
                          height="40px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <BootstrapTooltip title={data.variantName}>
                        <Typography
                          variant="h6"
                          align="center"
                          component="p"
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          {data.variantName.substring(0, 20)}
                        </Typography>
                      </BootstrapTooltip>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </Grid>
        <CardMedia
          className={classes.media}
          image={API_URL + productData.img}
          title="Image 1"
        />
        <CardContent>
          <Paper
            className={classes.paper}
            elevation={0}
            style={{ color: "#6d4c41" }}
          >
            <Grid container spacing={1} justify="center">
              <Grid item>
                <BootstrapTooltip title={productData.productName}>
                  <Typography
                    variant="h6"
                    align="center"
                    component="p"
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "rgba(188,135,0,1)",
                      cursor: "pointer",
                    }}
                  >
                    {productData.productName.substring(0, 22)}
                  </Typography>
                </BootstrapTooltip>
                {/*</Link>*/}
              </Grid>
              <Grid
                container
                // direction="column"
                justify="space-evenly"
                alignItems="center"
                className={classes.discountPrice}
              >
                {/* <div className={classes.discountPrice}> */}
                {productData.offer ? (
                  <>
                    <Grid item xs={12}>
                      <Typography
                        variant="h4"
                        color="initial"
                        component="p"
                        align="center"
                      >
                        &#x20B9;
                        {productData.discountPrice}
                        {/* {varientList[0].regularPrice} */}
                        {/*props.prize*/}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        component="p"
                        align="center"
                        style={{ textDecorationLine: "line-through" }}
                      >
                        &#x20B9;
                        {productData.regularPrice}
                        {/* {props.mrp} */}
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={12}>
                    <Typography
                      variant="h4"
                      color="initial"
                      component="p"
                      align="center"
                    >
                      &#x20B9;
                      {productData.regularPrice}
                      {/* {varientList[0].regularPrice} */}
                      {/*props.prize*/}
                    </Typography>
                  </Grid>
                )}
                {/* </div> */}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  //color="#fff"
                  style={{
                    backgroundColor: "#ff9100",
                    color: "#fff",
                    outline: "none",
                    letterSpacing: "1px",
                  }}
                  onClick={() => addToCart(productData)}
                  elevation={7}
                >
                  Add to cart
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </CardContent>
      </Card>
      <Dialog
        open={addCartOpen}
        onClose={addCartClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <AddToCartBox
          cardData={addCartData}
          onSuccess={(selectedSP) => addCartSuccess(selectedSP)}
        />
      </Dialog>
    </div>
  );
}

export default Cards;
