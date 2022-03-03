//export const API_URL = "https://creditt3.com/lazza/api/";
export const API_URL = "http://lazzaadminv2.efcynt.com/lazza/api/";
//export const API_URL = "http://localhost:8000/lazza/api/";
//export const API_URL = "http://lazzaadmin.efcynt.com/lazza/api/";

export const filterGroupRequests = {
  createFilteGroup: "master/createFilterGroup",
  editFilterGroup: "master/editFilterGroup",
  deleteFilterGroup: "master/deleteFilterGroup",
  statusFilterGroup: "master/ActivateFilterGroup",
  getAllFilterGroup: "master/getAllFilterGroup",
  getAllFilterGroupActive: "master/getActiveFilterGroup",
};
export const filterRequests = {
  createFilter: "master/createFilter",
  editFilter: "master/editFilter",
  deleteFilter: "master/deleteFilter",
  changeFilterStatus: "master/activateFilter",
  getAllFilter: "master/getAllFilter",
  getAllActiveFilterbyGroupId: "master/getAllActiveFilterbyGroupId",
};
export const unitRequests = {
  createUnit: "master/createUnit",
  editUnit: "master/editUnit",
  deleteUnit: "master/deleteUnit",
  changeUnitStatus: "master/activateUnit",
  getAllUnit: "master/getAllUnit",
  getAllActiveUnit: "master/getAllActiveUnitbyGroupId",
};
export const regionRequests = {
  createRegion: "master/createRegion",
  getAllRegion: "master/getAllRegion",
  deleteRegion: "master/deleteRegion",
  editRegion: "/master/editRegion",
  getActiveRegion: "master/getActiveRegion",
};
export const districtRequests = {
  createDistrict: "master/createDistrict",
  getAllDistrict: "master/getAllDistrict",
  getDistrictById: "master/getAllDistrict",
  deleteDistrict: "master/deleteDistrict",
  editDistrict: "master/editDistrict",
  getActiveDistrict: "master/getActiveDistrict",
  getDistrictByStateId: "master/getDistrictByStateId",
};
export const countryRequests = {
  createCountry: "master/createCountry",
  getAllCountry: "master/getAllCountry",
  deleteCountry: "master/deleteCountry",
  editCountry: "master/editCountry",
  getActiveCountry: "master/getActiveCountry",
  getCountryById: "master/getCountryById",
};
export const stateRequests = {
  createState: "master/createState",
  getAllState: "master/getAllState",
  deleteState: "master/deleteState",
  editState: "master/editState",
  getstatebyid: "master/getStatesByCountryId",
  getActiveState: "master/getActiveState",
  getStateName: "master/getStateById",
};
export const cityRequests = {
  createCity: "master/createCity",
  getAllCity: "master/getAllCity",
  deleteCity: "master/deleteCity",
  editCity: "master/editCity",
  getActiveCity: "master/getActiveCity",
};
export const categoryRequests = {
  createCategory: "master/createCategory",
  getAllCategory: "master/getAllCategory",
  deleteCategory: "master/deleteCategory",
  editCategory: "master/editCategory",
  getActiveCategory: "master/getActiveCategory",
};
export const SubcategoryRequests = {
  createSubcategory: "master/createSubCategory",
  getAllSubcategory: "master/getAllSubCategory",
  deleteSubcategory: "master/deleteSubCategory",
  editSubcategory: "master/editSubCategory",
  getActiveSubCategory: "master/getActiveSubCategory",
  getSubCategorybyCategoryId: "master/getSubCategorybycategoryId",
};
export const customersRequests = {
  createUser: "user/createUser",
  edituser: "user/EditUserById",
  getUserById: "user/getUserById",
  getActiveUser: "user/getActiveUser",
  getAllUser: "user/getAllUser",
  deleteUser: "user/deleteUser",
  editUser: "user/EditUserById",
  getOrdersByUser: "user/getOrdersByUser",
};
export const bannerRequests = {
  createBanner: "master/createBanner",
  getAllBanner: "master/getAllBanner",
  deleteBanner: "master/deleteBanner",
  editBanner: "master/editBanner",
};
// export const customersRequests = {
//   createUser: "user/createUser",
//   getAllUser: "user/getAllUser",
//   deleteUser: "user/deleteUser",
//   editUser: "user/EditUserById",
// };
export const StockingPointRequests = {
  createStocking: "master/createStockingPoint",
  getAllStockingPoint: "master/getAllStockingPoint",
  getStockingPointCode: "master/stockingPointIdIncrement",
  deleteStock: "master/deleteStockingPoint",
  editStock: "master/editStockingPoint",
  getStockingPointById: "master/getStockingPointById",
};
export const ProductRequests = {
  createProduct: "master/createProduct",
  getAllProduct: "master/getAllProduct",
  findAllProduct: "master/findAllProduct",
  deleteProduct: "master/deleteProduct",
  editProduct: "master/editProduct",
  getproductid: "master/getProductById",
  getofferZone: "master/getOfferZone",
  getPromoProducts: "user/getPromoProducts",
  getfilterproductid: "master/getProductByProductId",
};
export const PromoCodeRequests = {
  createPromo: "master/createPromoCode",
  getAllPromo: "master/getAllPromoCode",
  getAllPromoId: "master/getPromoCodeById",
  deletePromo: "master/deletePromoCode",
  editPromo: "master/editPromoCode",
  getUsedPromoCode: "master/getUsedPromoCode",
};
export const deliveryBoyRequests = {
  createDelivery: "master/createDeliveryBoy",
  getAllDelivery: "master/getAllDeliveryBoy",
  getSPDelivery: "master/getDeliveryBoyByStockingPointId",
  deleteDelivery: "master/deleteDeliveryBoy",
  editDelivery: "master/editDeliveryBoy",
  getDeliveryBoyById: "master/getDeliveryBoyById",
  deliveryBoyAssign: "master/deliveryBoyAssign",
  getOrderByDeliveryBoyId: "master/getOrderByDeliveryBoyId",
  verifyOtp: "Master/verifyDeliveryOtp",
  // getOrderByDeliveryBoyId: "master/getOrderByStatus",
};
export const executiveRequests = {
  createExecutive: "master/createExecutive",
  getAllExecutive: "master/getAllExecutive",
  deleteExecutive: "master/deleteExecutive",
  editExecutive: "master/editExecutive",
  getExecutiveId: "master/getExecutiveById",
};
export const stockRequests = {
  createStock: "master/createStock",
  getAllStock: "master/getAllStock",
  deleteStock: "master/deleteStock",
  editStock: "master/editStock",
  currentStock: "master/getStockByDate",
};
export const dailyStockRequests = {
  getDailyStock: "master/getStockByDate",
};
export const variantsRequests = {
  getAllVariants: "master/getAllVariants",
};
export const orderRequests = {
  createOrder: "master/createOrder",
  deleteOrder: "master/deleteOrder",
  editOrder: "master/editOrder",
  getOrderByStockingPointId: "master/getOrderByStockingPointId",
  getAllOrder: "master/getAllOrder",
  getOrderById: "master/getOrderById",
  getOrdersByUserId: "master/getOrdersByUserId",
};

export const cart = {
  addToCart: "master/addToCart",
  getCart: "user/getCartDetails",
  deleteCartbyId: "user/deleteCart",
  updateCartquantity: "user/updateCartQuantity",
  getCartCount: "user/cartCount",
};
export const category = {
  getCattegory: "master/getActiveCategory",
  getSubCattegorybyCatId: "master/getSubCategoryByCategoryId",
};

export const product = {
  getAllProduct: "master/getAllProduct",
  getProductsByCategoryId: "master/productGetByCategoryId",
  getProductsBySubCategoryId: "master/productGetBySubCategoryId",
};
export const userExist = {
  userExist: "user/userExist",
};
export const user = {
  createUser: "user/createUser",
  getUserbyUserid: "user/getUserById",
  editUserDataWithid: "user/EditUserById",
  editAddress: "user/editAddressByAddressId",
  delectAddress: "user/deleteAddress",
  addNewAddress: "user/addNewAddress",
  resetPassword: "user/resetPassword",
};
export const sendPaymentLink = {
  sendPaymentLink: "user/sendPaymentLink",
};
export const Report = {
  getAllReports: "master/report",
};
export const globalTime = {

  getAllGlobalTime: "master/getAllGlobalTime",
  deleteGlobalTime: "master/deleteGlobalTime",
  editGlobalTime: "master/editGlobalTime",
  setGlobalTime: "master/setGlobalTime",
  getStockingPointAllTime: "master/getStockingPointAllTime",
  onOffStockingPoint: "master/onOffStockingPoint",
  editStockingPointTime: "master/editStockingPointTime"


};