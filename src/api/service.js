import axios from "axios";
import {
  API_URL,
  filterRequests,
  filterGroupRequests,
  unitRequests,
  countryRequests,
  stateRequests,
  districtRequests,
  cityRequests,
  regionRequests,
  categoryRequests,
  SubcategoryRequests,
  bannerRequests,
  customersRequests,
  userExist,
  cart,
  product,
  executiveRequests,
  ProductRequests,
  StockingPointRequests,
  deliveryBoyRequests,
  sendPaymentLink,
  orderRequests,
  dailyStockRequests,
  Report,
} from "./constants";

class service {
  //Filter
  async CreateFilter(data) {
    const response = await axios.post(
      `${API_URL}${filterRequests.createFilter}`,
      data
    );
    return response;
  }
  async EditFilter(data, itemId) {
    const response = await axios.put(
      `${API_URL}${filterRequests.editFilter}/${itemId}`,
      data
    );
    return response;
  }
  async DeleteFilter(deleteid) {
    const response = await axios.delete(
      `${API_URL}${filterRequests.deleteFilter}/${deleteid}`
    );
    return response;
  }
  async GetFilter() {
    const response = await axios.get(
      `${API_URL}${filterRequests.getAllFilter}`
    );
    return response;
  }
  async GetActiveFilter(id) {
    const response = await axios.get(
      `${API_URL}${filterRequests.getAllActiveFilterbyGroupId}/${id}`
    );
    return response;
  }

  async StatusFilter(dataid, status) {
    const response = await axios.put(
      `${API_URL}${filterRequests.changeFilterStatus}/${dataid}/${status}`
    );
    return response;
  }
  //Filter Group
  async CreateFilterGp(data) {
    const response = await axios.post(
      `${API_URL}${filterGroupRequests.createFilteGroup}`,
      data
    );
    return response;
  }
  async EditFilterGp(data, itemId) {
    const response = await axios.put(
      `${API_URL}${filterGroupRequests.editFilterGroup}/${itemId}`,
      data
    );
    return response;
  }
  async DeleteFilterGp(deleteid) {
    const response = await axios.delete(
      `${API_URL}${filterGroupRequests.deleteFilterGroup}/${deleteid}`
    );
    return response;
  }
  async GetFilterGp() {
    const response = await axios.get(
      `${API_URL}${filterGroupRequests.getAllFilterGroup}`
    );
    return response;
  }
  async GetActiveFilterGp() {
    const response = await axios.get(
      `${API_URL}${filterGroupRequests.getAllFilterGroupActive}`
    );
    return response;
  }
  async StatusFilterGp(dataid, status) {
    const response = await axios.put(
      `${API_URL}${filterGroupRequests.statusFilterGroup}/${dataid}/${status}`
    );
    return response;
  }

  //Unit
  async CreateUnit(data) {
    const response = await axios.post(
      `${API_URL}${unitRequests.createUnit}`,
      data
    );
    return response;
  }
  async EditUnit(data, itemId) {
    const response = await axios.put(
      `${API_URL}${unitRequests.editUnit}/${itemId}`,
      data
    );
    return response;
  }
  async DeleteUnit(deleteid) {
    const response = await axios.delete(
      `${API_URL}${unitRequests.deleteUnit}/${deleteid}`
    );
    return response;
  }
  async GetUnit() {
    const response = await axios.get(`${API_URL}${unitRequests.getAllUnit}`);
    return response;
  }
  async GetActiveUnit() {
    const response = await axios.get(
      `${API_URL}${unitRequests.getAllActiveUnit}`
    );
    return response;
  }
  //Country

  async CreateCountry(data) {
    const response = await axios.post(
      `${API_URL}${countryRequests.createCountry}`,
      data
    );
    return response;
  }
  async EditCountry(data, itemId) {
    const response = await axios.put(
      `${API_URL}${countryRequests.editCountry}/${itemId}`,
      data
    );
    return response;
  }
  async DeleteCountry(deleteid) {
    const response = await axios.delete(
      `${API_URL}${countryRequests.deleteCountry}/${deleteid}`
    );
    return response;
  }
  async GetCountry() {
    const response = await axios.get(
      `${API_URL}${countryRequests.getAllCountry}`
    );
    return response;
  }
  async GetActiveCountry() {
    const response = await axios.get(
      `${API_URL}${countryRequests.getActiveCountry}`
    );
    return response;
  }

  //State

  async CreateState(data) {
    const response = await axios.post(
      `${API_URL}${stateRequests.createState}`,
      data
    );
    return response;
  }
  async EditState(data, itemId) {
    const response = await axios.put(
      `${API_URL}${stateRequests.editState}/${itemId}`,
      data
    );
    return response;
  }
  async DeleteState(deleteid) {
    const response = await axios.delete(
      `${API_URL}${stateRequests.deleteState}/${deleteid}`
    );
    return response;
  }
  async GetState() {
    const response = await axios.get(`${API_URL}${stateRequests.getAllState}`);
    return response;
  }
  async GetActiveState() {
    const response = await axios.get(
      `${API_URL}${stateRequests.getActiveState}`
    );
    return response;
  }
  async GetActiveStateById(id) {
    const response = await axios.get(
      `${API_URL}${stateRequests.getstatebyid}/${id}`
    );
    return response;
  }

  //District

  async CreateDistrict(data) {
    const response = await axios.post(
      `${API_URL}${districtRequests.createDistrict}`,
      data
    );
    return response;
  }
  async EditDistrict(data, itemId) {
    const response = await axios.put(
      `${API_URL}${districtRequests.editDistrict}/${itemId}`,
      data
    );
    return response;
  }
  async DeleteDistrict(deleteid) {
    const response = await axios.delete(
      `${API_URL}${districtRequests.deleteDistrict}/${deleteid}`
    );
    return response;
  }
  async GetDistrict() {
    const response = await axios.get(
      `${API_URL}${districtRequests.getAllDistrict}`
    );
    return response;
  }
  async GetActiveDistrict() {
    const response = await axios.get(
      `${API_URL}${districtRequests.getActiveDistrict}`
    );
    return response;
  }
  async GetActiveDistrictById(id) {
    const response = await axios.get(
      `${API_URL}${districtRequests.GetActiveDistrictById}/${id}`
    );
    return response;
  }
  //City

  async CreateCity(data) {
    const response = await axios.post(
      `${API_URL}${cityRequests.createCity}`,
      data
    );
    return response;
  }
  async EditCity(data, itemId) {
    const response = await axios.put(
      `${API_URL}${cityRequests.editCity}/${itemId}`,
      data
    );
    return response;
  }
  async DeleteCity(deleteid) {
    const response = await axios.delete(
      `${API_URL}${cityRequests.deleteCity}/${deleteid}`
    );
    return response;
  }
  async GetCity() {
    const response = await axios.get(`${API_URL}${cityRequests.getAllCity}`);
    return response;
  }
  async GetActiveCity() {
    const response = await axios.get(`${API_URL}${cityRequests.getActiveCity}`);
    return response;
  }
  //Region
  async CreateRegion(data) {
    const response = await axios.post(
      `${API_URL}${regionRequests.createRegion}`,
      data
    );
    return response;
  }
  async EditRegion(data, itemId) {
    const response = await axios.put(
      `${API_URL}${regionRequests.editRegion}/${itemId}`,
      data
    );
    return response;
  }
  async DeleteRegion(deleteid) {
    const response = await axios.delete(
      `${API_URL}${regionRequests.deleteRegion}/${deleteid}`
    );
    return response;
  }
  async GetRegion() {
    const response = await axios.get(
      `${API_URL}${regionRequests.getAllRegion}`
    );
    return response;
  }
  async GetActiveRegion() {
    const response = await axios.get(
      `${API_URL}${regionRequests.getActiveRegion}`
    );
    return response;
  }
  //Category
  async CreateCategory(data) {
    const response = await axios.post(
      `${API_URL}${categoryRequests.createCategory}`,
      data
    );
    return response;
  }
  async EditCategory(data, itemId) {
    const response = await axios.put(
      `${API_URL}${categoryRequests.editCategory}/${itemId}`,
      data
    );
    return response;
  }
  async DeleteCategory(deleteid) {
    const response = await axios.delete(
      `${API_URL}${categoryRequests.deleteCategory}/${deleteid}`
    );
    return response;
  }
  async GetCategory() {
    const response = await axios.get(
      `${API_URL}${categoryRequests.getAllCategory}`
    );
    return response;
  }
  async GetActiveCategory() {
    const response = await axios.get(
      `${API_URL}${categoryRequests.getActiveCategory}`
    );
    return response;
  }
  //Subcategory
  async CreateSubCategory(data) {
    const response = await axios.post(
      `${API_URL}${SubcategoryRequests.createSubcategory}`,
      data
    );
    return response;
  }
  async EditSubCategory(data, itemId) {
    const response = await axios.put(
      `${API_URL}${SubcategoryRequests.editSubcategory}/${itemId}`,
      data
    );
    return response;
  }
  async DeleteSubCategory(deleteid) {
    const response = await axios.delete(
      `${API_URL}${SubcategoryRequests.deleteSubcategory}/${deleteid}`
    );
    return response;
  }
  async GetSubCategory() {
    const response = await axios.get(
      `${API_URL}${SubcategoryRequests.getAllSubcategory}`
    );
    return response;
  }
  async GetActiveSubCategory() {
    const response = await axios.get(
      `${API_URL}${SubcategoryRequests.getActiveSubCategory}`
    );
    return response;
  }
  //Banner
  async CreateBanner(data) {
    const response = await axios.post(
      `${API_URL}${bannerRequests.createBanner}`,
      data
    );
    return response;
  }
  async EditBanner(data, itemId) {
    const response = await axios.put(
      `${API_URL}${bannerRequests.editBanner}/${itemId}`,
      data
    );
    return response;
  }
  async DeleteBanner(deleteid) {
    const response = await axios.delete(
      `${API_URL}${bannerRequests.deleteBanner}/${deleteid}`
    );
    return response;
  }
  async GetBanner() {
    const response = await axios.get(
      `${API_URL}${bannerRequests.getAllBanner}`
    );
    return response;
  }

  //Order
  async CreateOrder(data) {
    // console.log(data, "data");
    const response = await axios.post(
      `${API_URL}${orderRequests.createOrder}`,
      data
    );
    return response;
  }

  async GetAllOrder(status) {
    const response = await axios.get(
      `${API_URL}${orderRequests.getAllOrder}/${status}`
    );
    return response;
  }
  async DeleteOrder(deleteid) {
    const response = await axios.delete(
      `${API_URL}${orderRequests.deleteOrder}/${deleteid}`
    );
    return response;
  }
  async EditOrder(id) {
    const response = await axios.put(
      `${API_URL}${orderRequests.editOrder}/${id}`
    );
    return response;
  }

  //userExist
  async UserExist(data) {
    const response = await axios.post(`${API_URL}${userExist.userExist}`, data);
    return response;
  }
  //user
  async GetUserById(id) {
    const response = await axios.get(
      `${API_URL}${customersRequests.getUserById}/${id}`
    );
    return response;
  }
  async GetAllUser() {
    const response = await axios.get(
      `${API_URL}${customersRequests.getAllUser}`
    );
    return response;
  }
  async GetOrderByUser() {
    const response = await axios.get(
      `${API_URL}${customersRequests.getOrdersByUser}`
    );
    return response;
  }
  async DeleteUser(deleteid) {
    const response = await axios.delete(
      `${API_URL}${customersRequests.deleteUser}/${deleteid}`
    );
    return response;
  }

  async EditUser(data, itemId) {
    const response = await axios.put(
      `${API_URL}${customersRequests.editUser}/${itemId}`,
      data
    );
    return response;
  }

  //Cart
  async GetCartCount(id) {
    const response = await axios.get(`${API_URL}${cart.getCartCount}/${id}`);
    return response;
  }
  async GetCart(id) {
    const response = await axios.get(`${API_URL}${cart.getCart}/${id}`);
    return response;
  }

  async DeleteCart(userId, dataid) {
    const response = await axios.delete(
      `${API_URL}${cart.deleteCartbyId}/` + userId + "?cartId=" + dataid
    );
    return response;
  }

  //Product
  async GetAllProduct() {
    const response = await axios.get(`${API_URL}${product.getAllProduct}`);
    return response;
  }
  async CreateProduct(data) {
    const response = await axios.post(
      `${API_URL}${ProductRequests.createProduct}`,
      data
    );
    return response;
  }
  async EditProduct(data, itemId) {
    const response = await axios.put(
      `${API_URL}${ProductRequests.editProduct}/${itemId}`,
      data
    );
    return response;
  }
  async DeleteProduct(deleteid) {
    const response = await axios.delete(
      `${API_URL}${ProductRequests.deleteProduct}/${deleteid}`
    );
    return response;
  }
  async GetProduct() {
    const response = await axios.get(
      `${API_URL}${ProductRequests.findAllProduct}`
    );
    return response;
  }
  async GetProductId(id) {
    const response = await axios.get(
      `${API_URL}${ProductRequests.getProductId}/${id}`
    );
    return response;
  }

  //Call center Executive
  async CreateExecutive(data) {
    const response = await axios.post(
      `${API_URL}${executiveRequests.createExecutive}`,
      data
    );
    return response;
  }
  async EditExecutive(data, itemId) {
    const response = await axios.put(
      `${API_URL}${executiveRequests.editExecutive}/${itemId}`,
      data
    );
    return response;
  }
  async DeleteExecutive(deleteid) {
    const response = await axios.delete(
      `${API_URL}${executiveRequests.deleteExecutive}/${deleteid}`
    );
    return response;
  }
  async GetExecutive() {
    const response = await axios.get(
      `${API_URL}${executiveRequests.getAllExecutive}`
    );
    return response;
  }
  async GetExecutiveId(id) {
    const response = await axios.get(
      `${API_URL}${executiveRequests.getExecutiveId}/${id}`
    );
    return response;
  }
  //StockingPoint
  async CreateStockingpoint(data) {
    const response = await axios.post(
      `${API_URL}${StockingPointRequests.createStocking}`,
      data
    );
    return response;
  }
  async EditStockingpoint(newdata, stockingPointId) {
    const response = await axios.put(
      `${API_URL}${StockingPointRequests.editStock}/${stockingPointId}`,
      newdata
    );
    return response;
  }
  async DeleteStockingpoint(deleteid) {
    const response = await axios.delete(
      `${API_URL}${StockingPointRequests.deleteStock}/${deleteid}`
    );
    return response;
  }
  async GetStockingPointById(itemid) {
    const response = await axios.get(
      `${API_URL}${StockingPointRequests.getStockingPointById}/${itemid}`
    );
    return response;
  }
  async GetStockingpoint() {
    const response = await axios.get(
      `${API_URL}${StockingPointRequests.getAllStockingPoint}`
    );
    return response;
  }
  async GetActiveStockingpoint() {
    const response = await axios.get(
      `${API_URL}${StockingPointRequests.getActiveStockingpoint}`
    );
    return response;
  }
  async GetStockingpointCode() {
    const response = await axios.get(
      `${API_URL}${StockingPointRequests.getStockingPointCode}`
    );
    return response;
  }
  //DELIVERYBOY
  async CreateDeliveryBoy(data) {
    const response = await axios.post(
      `${API_URL}${deliveryBoyRequests.createDelivery}`,
      data
    );
    return response;
  }
  async ConfirmDeliveryBoyOrder(otp, data) {
    const response = await axios.post(
      `${API_URL}${deliveryBoyRequests.verifyOtp}/${otp}`,
      data
    );
    return response;
  }

  async EditDeliveryBoy(data, itemId) {
    const response = await axios.put(
      `${API_URL}${deliveryBoyRequests.editDelivery}/${itemId}`,
      data
    );
    return response;
  }
  async DeleteDeliveryBoy(deleteid) {
    const response = await axios.delete(
      `${API_URL}${deliveryBoyRequests.deleteDelivery}/${deleteid}`
    );
    return response;
  }
  async GetDelivery() {
    const response = await axios.get(
      `${API_URL}${deliveryBoyRequests.getAllDelivery}`
    );
    return response;
  }
  async GetDeliveryById(itemid) {
    const response = await axios.get(
      `${API_URL}${deliveryBoyRequests.getDeliveryBoyById}/${itemid}`
    );
    return response;
  }
  async GetDeliveryByStockingPoinId(itemid) {
    const response = await axios.get(
      `${API_URL}${deliveryBoyRequests.getDeliveryBoyById}/${itemid}`
    );
    return response;
  }
  //Daily Stock
  async GetDailyStick(itemid) {
    const response = await axios.get(
      `${API_URL}${dailyStockRequests.getDailyStock}/${itemid}`
    );
    return response;
  }
  //verify otp in deliveryboy

  //sendPaymentLink.sendPaymentLink
  async SendPaymentLink(userId, invoiceID) {
    const response = await axios.post(
      `${API_URL}${sendPaymentLink.sendPaymentLink}/${userId}/${invoiceID}`
    );
    return response;
  }
  //getall report
  async GetReport() {
    const response = await axios.get(`${API_URL}${Report.getAllReports}`);
    return response;
  }

  async ApplyPromoCode(body) {
    const response = await axios.post(
      `${API_URL}/user/calculatePromocode`,
      body
    );
    return response;
  }
}

export default new service();
