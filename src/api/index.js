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
  minelogin:'/api/LoginPage/Login'
}

module.exports = api

