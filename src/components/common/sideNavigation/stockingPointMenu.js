import DashboardIcon from "../../../assets/navRailIcons/dashboard icon.png";
import OrderIcon from "../../../assets/navRailIcons/orders icon.png";
import ProductIcon from "../../../assets/navRailIcons/product icon.png";
import DeliveryIcon from "../../../assets/navRailIcons/delevery icon.png";
import ReportIcon from "../../../assets/navRailIcons/reports icon.png";
import StockingPointIcon from "../../../assets/navRailIcons/distributor icon.png";
export const SPMenuData = [
  //Dashboard
  // {
  //   title: "Dashboard",
  //   cName: "subbar-text",
  //   icon: DashboardIcon,
  //   subMenu: [
  //     {
  //       title: "Dashboard",
  //       path: "/sp/dashboard",
  //     },
  //   ],
  // },
  //Order
  {
    title: "Order",
    cName: "subbar-text",
    icon: OrderIcon,
    subMenu: [
      // { title: "Create Order", path: "/createorder" },
      { title: "Manage Order", path: "/manageorder" },
      // { title: "Pending Orders", path: "/pendingorders" },
    ],
  },
  //Product
  // {
  //   title: "Product",
  //   cName: "subbar-text",
  //   icon: ProductIcon,
  //   subMenu: [{ title: "Promotional Products", path: "/promotionalproducts" }],
  // },

  // //Payments
  // {
  //     title: "Payments",
  //     cName: "subbar-text",
  //     icon: PaymentIcon,
  //     subMenu: [
  //         { title: "Online Payment", path: "/onlinepayment" },
  //         { title: "Cash Payment", path: "/cashpayment" },
  //         { title: "Reconciliation", path: "/reconciliation" },
  //     ],
  // },

  //Delivery
  {
    title: "Delivery",
    cName: "subbar-text",
    icon: DeliveryIcon,
    subMenu: [
      { title: "Create Delivery Boy", path: "/createdeliveryboy" },
      { title: "Manage Delivery Boy", path: "/sp/managedeliveryboy" },
      // { title: "View Order", path: "/db/vieworder" },
    ],
  },
  //Report
  {
    title: "Report",
    cName: "subbar-text",
    icon: ReportIcon,
    subMenu: [{ title: "Report", path: "/sp/report" }],
  },
  //Stocking Point
  {
    title: "Stocking Point",
    cName: "subbar-text",
    icon: StockingPointIcon,
    subMenu: [
      // { title: "Create Delivery Boy", path: "/createdeliveryboy" },
      // { title: "Manage Delivery Boy", path: "/managedeliveryboy" },
      { title: "Stock Sheet", path: "/stocksheet" },
      { title: "Time", path: "/sp/time" },
    ],
  },
];
