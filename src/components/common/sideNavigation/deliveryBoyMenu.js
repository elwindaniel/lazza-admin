import DashboardIcon from "../../../assets/navRailIcons/dashboard icon.png";
import DeliveryIcon from "../../../assets/navRailIcons/delevery icon.png";
export const DlvryBoyMenu = [
  //Dashboard
  // {
  //     title: "Dashboard",
  //     cName: "subbar-text",
  //     icon: DashboardIcon,
  //     subMenu: [

  //         {
  //             title: "Dashboard",
  //             path: "/deliveryboydashboard",
  //         },
  //     ],
  // },
  {
    title: "Delivery",
    cName: "subbar-text",
    icon: DeliveryIcon,
    subMenu: [
      { title: "View Order", path: "/vieworder" },
      { title: "Dispatched Order", path: "/dispatchedorder" },
      { title: "Delivery Confirmation", path: "/deliveryconfirmation" },
    ],
  },
];
