import React from "react";
import "./product.css";
import TopBar from "../topBar";
import YellowBox from "../settings/banner/backDiv/backDiv";
import AddProductFrom from "../forms/addProduct";
function createProduct(props) {
  // console.log(props, "ppp");
  let eid = props.match.params.editId;
  // let path = props.location ? props.location.pathname : "";
  let locationPath = props.location ? props.location.pathname : "";
  var urlArray = [];
  if (locationPath.indexOf("/") > -1) {
    urlArray = locationPath.split("/");
  }
  // console.log(urlArray, "urlArray");
  return (
    <div className="customer">
      <TopBar title={eid == null ? "Add Product" : "Edit Product"} />
      <YellowBox />
      <AddProductFrom
        productId={eid}
        pathName={urlArray[3] ? urlArray[3] : ""}
      />
    </div>
  );
}

export default createProduct;
