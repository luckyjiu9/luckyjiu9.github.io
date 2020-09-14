const api = {
  homeList: '/api/Home/getHomeREC',
  hometabListl: '/api/Home/getHomeShowGoods',
  homedetali: '/api/Goods/GetGoodsInfo',
  searchtop: '/api/Goods/getSearchHot',
  searchhistory: '/api/Goods/GetGoodsByPrice',
  minephone: '/api/Verify/GetPhone',
  mineuser: '/api/Verify/LoginName',
  minecode: '/api/SMSCode/GetCode',
  minepass: '/api/LoginPage/AddLogin',
  minelogin: '/api/LoginPage/Login',
  cartadd: '/api/Cart/addCart',
  cartadd_length: '/api/Cart/getCartLength',
  cartadd_user: '/api/Cart/getCart',
  cartdelete: '/api/Cart/DeleteCart',
  cartamend: '/api/Cart/pathCartChecked',
  cart_order: '/api/Order/getOrderInfo',
  cart_getArea: 'api/UserInfo/addArea',
  cart_create: '/api/Order/cretaeOrder',
  cart_pwd: '/api/Order/verifyPayPWD',
  cart_pay: "/api/Order/payOrder",
  cart_cats: '/api/Goods/getCatsTree',
  cart_cats_cart: "/api/Goods/getCadGoods",
  cart_Alipay: '/api/Alipay/appWebPay'
}

module.exports = api

