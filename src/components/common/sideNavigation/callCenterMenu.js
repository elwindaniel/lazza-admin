import DashboardIcon from "../../../assets/navRailIcons/dashboard icon.png";
import OrderIcon from "../../../assets/navRailIcons/orders icon.png";
import ProductIcon from "../../../assets/navRailIcons/product icon.png";
import PaymentIcon from "../../../assets/navRailIcons/payments icon.png";
import CallCenterIcon from "../../../assets/navRailIcons/call-center icon.png";
import ReportIcon from "../../../assets/navRailIcons/reports icon.png";
import StockingPointIcon from "../../../assets/navRailIcons/distributor icon.png";
export const CallCenterMenu = [
  //Dashboard
  // {
  //   title: "Dashboard",
  //   cName: "subbar-text",
  //   icon: DashboardIcon,
  //   subMenu: [
  //     {
  //       title: "Admin Dashboard",
  //       path: "/c/dashboard",
  //     },
  //   ],
  // },
  //Order
  {
    title: "Order",
    cName: "subbar-text",
    icon: OrderIcon,
    subMenu: [
      { title: "Create Order", path: "/ex/createOrder" },
      { title: "Manage Order", path: "/la/vieworder" },
      { title: "Pending Orders", path: "/pendingorders" },
    ],
  },
  //Product
  // {
  //   title: "Product",
  //   cName: "subbar-text",
  //   icon: ProductIcon,
  //   subMenu: [{ title: "Promotional Products", path: "/promotionalproducts" }],
  // },

  //Payments
  {
    title: "Payments",
    cName: "subbar-text",
    icon: PaymentIcon,
    subMenu: [{ title: "Payment List", path: "/viewpayments" }],
  },
  //Call Center
  // {
  //   title: "Call Center",
  //   cName: "subbar-text",
  //   icon: CallCenterIcon,
  //   subMenu: [
  //     { title: "View Orders", path: "/vieworders" },
  //      { title: "Online payment", path: "/onlinepayment" },
  //   ],
  // },

  //Report
  {
    title: "Report",
    cName: "subbar-text",
    icon: ReportIcon,
    subMenu: [{ title: "Sales Report", path: "/report" }],
  },

  //Stocking Point
  // {
  // title: "Stocking Point",
  // cName: "subbar-text",
  // icon: StockingPointIcon,
  // subMenu: [
  //   { title: "Manage Stocking Point", path: "/managestockingpoint" },
  //   { title: "Manage Delivery Boy", path: "/managedeliveryboy" },
  //   { title: "Daily Sheet", path: "/dailysheet" },
  // ],
  // },
];
