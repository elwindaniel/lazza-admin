import "./App.css";
import React from "react";
import SideNavigation from "./components/common/sideNavigation";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./components/common/dashboard/dashboard";
import Filter from "./components/common/settings/filter/filters";
import Units from "./components/common/settings/units";
import Banner from "./components/common/settings/banner";
import Region from "./components/common/settings/Region/region";
import Categories from "./components/common/settings/categories/category";
import CreateCustomer from "./components/common/customers/createCustomer.js";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import ManageCustomers from "./components/common/customers/manageCustomers";
import ManagePromotionCode from "./components/common/marketing/managepromotionCode/managepromotionCode";
import ReportPage from "./components/common/report/report";
import SpReportPage from "./components/common/report/spReport";
import createStock from "./components/common/stockingpoint/createStockingpoint";
import createProduct from "./components/common/product/createProduct";
import manageDistributer from "./components/common/stockingpoint/manageDistributer";
import ManageProduct from "./components/common/product/manageProductTable";
import UsedCode from "./components/common/marketing/usedCode/usedCode";
import createDelivery from "./components/common/delivery/managedelivery/createdelivery";
import Managedeliveri from "./components/common/delivery/managedelivery/managedelivery";
import createExecutive from "./components/common/Executive/manageexecutive/createexecutive";
import manageExecutive from "./components/common/Executive/manageexecutive/manageexecutive";
import CreateOrder from "./components/common/Orders/createOrder";
import createPromo from "./components/common/marketing/createPromo";
import stockMange from "./components/common/stockingpoint/stockMange";
import CustomerDemography from "./components/common/marketing/customerDemography/customerDemography";
import Login from "./components/auth/login";
import DailyStock from "../src/components/common/stockingpoint/dailyStock";
import ManageOrder from "../src/components/common/Orders/manageOrder";
import Vieworder from "./components/common/delivery/viewOrder/viewOrder";
import DeliveryConfirmed from "./components/common/delivery/confirmedDlvry";
import Dispatchedorder from "./components/common/delivery/dispatchedOrders";
import ViewOrderAdmin from "./components/common/Orders/viewOrderAdmin";
import PendingOrderAdmin from "./components/common/Orders/pendingOrderAdmin";
import promotionalproducts from "./components/common/product/promotionalProductTable";
import SPManagedeliveri from "./components/common/delivery/managedelivery/spManageDelivery";
import DeliveryBoyLogin from "./components/common/delivery";
import Viewpayments from "./components/common/payment";
import { Report } from "@material-ui/icons";
import GlobelTime from "./components/common/time";
import spTime from "./components/common/time/spTime";
const theme = createMuiTheme({
  background: {
    default: "rgb(252, 251, 236)",
  },
});

const authentication = {
  isLoggedIn: false,
  onAuthentication() {
    this.isLoggedIn = true;
  },
  geLoggedInStatus() {
    return this.isLoggedIn;
  },
};
const session = {
  token: sessionStorage.getItem("token"),
};
if (session.token) {
  authentication.onAuthentication();
}

function App() {
  let userType;
  if (authentication.geLoggedInStatus()) {
    const payloadStart = session.token.indexOf(".") + 1;
    const payloadEnd = session.token.lastIndexOf(".");
    let payload = session.token.substring(payloadStart, payloadEnd);

    if (payload.length === 0) {
    } else {
      payload = atob(payload);
      const jsonPayload = JSON.parse(payload);

      userType = jsonPayload.userType;
    }
  }

  return (
    <>
      <div className="app">
        <ThemeProvider theme={theme}>
          {authentication.geLoggedInStatus() ? (
            userType === "deliveryBoy" ? null : (
              <div>
                <SideNavigation />
              </div>
            )
          ) : null}

          {authentication.geLoggedInStatus() ? (
            //Admin

            <Switch>
              <Route exact path="/ex/createOrder" component={CreateOrder} />
              <Route exact path="/globeltime" component={GlobelTime} />
              <Route exact path="/createOrder" component={CreateOrder} />
              <Route exact path="/filter" component={Filter} />
              <Route exact path="/units" component={Units} />
              <Route exact path="/Banners" component={Banner} />
              <Route exact path="/Region" component={Region} />
              <Route exact path="/Categories" component={Categories} />
              <Route
                exact
                path="/managepromotioncode"
                component={ManagePromotionCode}
              />
              <Route exact path="/report" component={ReportPage} />
              <Route exact path="/sp/report" component={SpReportPage} />

              <Route
                exact
                path="/createpromotioncode/:editId"
                component={createPromo}
              />
              <Route exact path="/UsedCode" component={UsedCode} />
              <Route exact path="/ManageCustomer" component={ManageCustomers} />
              <Route exact path="/addproduct" component={createProduct} />
              <Route
                exact
                path="/addproduct/:editId/edit"
                component={createProduct}
              />
              <Route exact path="/la/vieworder" component={ViewOrderAdmin} />
              <Route exact path="/onlinepayment" component={Viewpayments} />
              <Route
                exact
                path="/pendingorders"
                component={PendingOrderAdmin}
              />
              <Route
                exact
                path="/createpromotioncode"
                component={createPromo}
              />
              <Route
                exact
                path="/customerdemographics"
                component={CustomerDemography}
              />
              <Route
                exact
                path="/createexecutives"
                component={createExecutive}
              />
              <Route
                exact
                path="/createexecutives/:editId"
                component={createExecutive}
              />

              <Route
                exact
                path="/manageexecutive"
                component={manageExecutive}
              />
              <Route exact path="/addstockingpoint" component={createStock} />
              <Route
                exact
                path="/managestockingpoint"
                component={manageDistributer}
              />
              <Route
                exact
                path="/addstockingpoint/:editId"
                component={createStock}
              />
              <Route
                exact
                path="/promotionalproducts"
                component={promotionalproducts}
              />
              <Route exact path="/manageproduct" component={ManageProduct} />
              {/* <Route exact path="/CreateOrder" component={CreateOrder} />
                  <Route exact path="/manageorder" component={ManageOrder} /> */}
              {/* </>
              ) : (
                  <Redirect to={{ pathname: "/" }}></Redirect>
                )} */}
              {/* {
                //StockingPoint
                userType === "stockingPoint" ? (
                  <> */}
              <Route
                exact
                path="/createdeliveryboy"
                component={createDelivery}
              />
              <Route
                exact
                path="/createdeliveryboy/:editId"
                component={createDelivery}
              />
              <Route
                exact
                path="/managedeliveryboy"
                component={Managedeliveri}
              />
              <Route
                exact
                path="/sp/managedeliveryboy"
                component={SPManagedeliveri}
              />
              {/* </>
                ) : (
                    <Redirect to={{ pathname: "/" }}></Redirect>
                  )
              } */}
              {userType === "stockingPoint" ? (
                <Route exact path="/" component={manageDistributer} />
              ) : null}
              <Route exact path="/vieworder" component={Vieworder} />
              <Route
                exact
                path="/deliveryconfirmation"
                component={DeliveryConfirmed}
              />
              <Route
                exact
                path="/dispatchedorder"
                component={Dispatchedorder}
              />
              <Route
                exact
                path="/sp/time"
                component={spTime}
              />
              {
                /**/
                userType === "admin" ? (
                  <Route exact path="/dashboard" component={Dashboard} />
                ) : null || userType === "stockingPoint" ? (
                  <Route exact path="/dashboard" component={ManageOrder} />
                ) : null || userType === "executive" ? (
                  <Redirect to={{ pathname: "/ex/createOrder" }}></Redirect>
                ) : null || userType === "callCenter" ? (
                  <Redirect to={{ pathname: "/ex/createOrder" }}></Redirect>
                ) : null || userType === "deliveryBoy" ? (
                  <Redirect to={{ pathname: "/vieworder" }}></Redirect>
                ) : null
              }

              {userType === "admin" || userType === "stockingPoint" ? (
                <Route
                  exact
                  path="/CreateCustomer"
                  component={CreateCustomer}
                />
              ) : (
                <Redirect to={{ pathname: "/" }}></Redirect>
              )}
              {userType === "executive" || userType === "callcenter" ? (
                <Route
                  path="/editexecutives/:editId"
                  component={createExecutive}
                />
              ) : null}

              <Route exact path="/manageorder" component={ManageOrder} />

              <Route
                exact
                path="/CreateCustomer/:editId"
                component={CreateCustomer}
              />
              <Route
                exact
                path="/ViewCustomer/:viewId"
                component={CreateCustomer}
              />
              <Route exact path="/stocksheet" component={stockMange} />
              <Route exact path="/dailysheet" component={DailyStock} />
              {/* <Route exact path="/addproduct" component={createProduct} /> */}
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={Login} />
            </Switch>
          )}

          <CssBaseline />
        </ThemeProvider>
      </div>
      <div className="appMsg">
        <div className="center">
          {authentication.geLoggedInStatus() ? (
            <div>
              {userType === "deliveryBoy" ? (
                <>
                  <Redirect to={{ pathname: "/vieworder" }}></Redirect>
                  <Switch>
                    <Route exact path="/vieworder" component={Vieworder} />
                    <Route
                      exact
                      path="/deliveryconfirmation"
                      component={DeliveryConfirmed}
                    />
                    <Route
                      exact
                      path="/dispatchedorder"
                      component={Dispatchedorder}
                    />
                  </Switch>
                </>
              ) : (
                <div> Sorry This Page Only Available For Desktop</div>
              )}
            </div>
          ) : (
            <>
              {/* <Redirect to={{ pathname: "/dblogin" }}></Redirect> */}
              <Switch>
                <Route exact path="/" component={DeliveryBoyLogin} />
              </Switch>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
