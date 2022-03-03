import DashboardIcon from "../../../assets/navRailIcons/dashboard icon.png";
import OrderIcon from "../../../assets/navRailIcons/orders icon.png";
import ProductIcon from "../../../assets/navRailIcons/product icon.png";
import CustomerIcon from "../../../assets/navRailIcons/customers icon.png";
import PaymentIcon from "../../../assets/navRailIcons/payments icon.png";
import CallCenterIcon from "../../../assets/navRailIcons/call-center icon.png";
import DeliveryIcon from "../../../assets/navRailIcons/delevery icon.png";
import ReportIcon from "../../../assets/navRailIcons/reports icon.png";
import MarketingIcon from "../../../assets/navRailIcons/marketing icon.png";
import StockingPointIcon from "../../../assets/navRailIcons/distributor icon.png";
import SettingsIcon from "../../../assets/navRailIcons/settings icon.png";
export const SidebarData = [
  //Dashboard
  {
    title: "Dashboard",
    cName: "subbar-text",
    icon: DashboardIcon,
    subMenu: [
      {
        title: "Admin Dashboard",
        path: "/dashboard",
      },
      // {
      //   title: "Distributor Dashboard",
      //   path: "/distributordashboard",
      // },
      // {
      //   title: "Call Centre Dashboard",
      //   path: "/callcentredashboard",
      // },
      // {
      //   title: "DeliveryBoyDashboard",
      //   path: "/deliveryboydashboard",
      // },
    ],
  },
  //Order
  {
    title: "Order",
    cName: "subbar-text",
    icon: OrderIcon,
    subMenu: [
      { title: "Create Order", path: "/createorder" },
      { title: "Manage Order", path: "/la/vieworder" },
      { title: "Pending Orders", path: "/pendingorders" },
    ],
  },
  //Product
  {
    title: "Product",
    cName: "subbar-text",
    icon: ProductIcon,
    subMenu: [
      { title: "Add Product", path: "/addproduct" },
      { title: "Manage Product", path: "/manageproduct" },
      { title: "Promotional Products", path: "/promotionalproducts" },
    ],
  },
  //Customers
  {
    title: "Customers",
    cName: "subbar-text",
    icon: CustomerIcon,
    subMenu: [
      { title: "Create Customer", path: "/createcustomer" },
      { title: "Manage Customer", path: "/managecustomer" },
    ],
  },
  //Payments
  {
    title: "Payments",
    cName: "subbar-text",
    icon: PaymentIcon,
    subMenu: [
      // { title: "Online Payment", path: "/onlinepayment" },
      // { title: "Cash Payment", path: "/cashpayment" },
      { title: "Online payment", path: "/onlinepayment" },
    ],
  },
  //Call Center
  {
    title: "Call Center",
    cName: "subbar-text",
    icon: CallCenterIcon,
    subMenu: [
      // { title: "Create Order", path: "/createorder" },

      // { title: "View Payments", path: "/viewpayments" },

      { title: "Create Executive", path: "/createexecutives" },
      { title: "Manage Executive", path: "/manageexecutive" },
    ],
  },
  //Delivery
  {
    title: "Delivery",
    cName: "subbar-text",
    icon: DeliveryIcon,
    subMenu: [
      { title: "Create Delivery Boy", path: "/createdeliveryboy" },
      { title: "Manage Delivery Boy", path: "/managedeliveryboy" },
    ],
  },
  //Report
  {
    title: "Report",
    cName: "subbar-text",
    icon: ReportIcon,
    subMenu: [{ title: "Report", path: "/report" }],
  },
  //Marketing
  {
    title: "Marketing",
    cName: "subbar-text",
    icon: MarketingIcon,
    subMenu: [
      { title: "Create Promotion Code", path: "/createpromotioncode" },
      { title: "Manage Promotion Code", path: "/managepromotioncode" },
    ],
  },
  //Stocking Point
  {
    title: "Stocking Point",
    cName: "subbar-text",
    icon: StockingPointIcon,
    subMenu: [
      { title: "Manage Stocking Point", path: "/managestockingpoint" },
      { title: "Add Stocking Point", path: "/addstockingpoint" },
      { title: "Create Delivery Boy", path: "/createdeliveryboy" },
      { title: "Manage Delivery Boy", path: "/managedeliveryboy" },
      { title: "Daily Sheet", path: "/dailysheet" },
    ],
  },
  //Settings
  {
    title: "Settings",
    cName: "subbar-text",
    icon: SettingsIcon,
    subMenu: [
      { title: "Filters", path: "/filter" },
      // { title: "Units", path: "/units" },
      { title: "Region", path: "/region" },
      { title: "Categories", path: "/categories" },
      { title: "Banners", path: "/banners" },
      { title: "Global Time", path: "/globeltime" },
    ],
  },
];
