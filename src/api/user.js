import { cartadd_length, cart_Alipay, cart_cats_cart, cart_pwd, cart_cats, cart_pay, cart_create, cart_getArea, cartamend, cartdelete, cart_order, cartadd_user, cartadd, minelogin, minecode, minepass, homeList, hometabListl, homedetali, searchtop, searchhistory, minephone, mineuser } from './index'
// axios
import request from '@/utils/request'

// 获取首页数据
export function getHomeList (params = {}) {
  return request({
    url: homeList,
    method: 'get',
    params,
    hideloading: false
  })
}
//tab切换
export function getHometabList (params = {
}) {
  return request({
    url: hometabListl,
    method: 'get',
    params,
    hideloading: false
  })
}
//详情页数据

export function getHomedetali (params = {
}) {
  return request({
    url: homedetali,
    method: 'get',
    params,
    hideloading: false
  })
}
export function getsearchtop (params = {
}) {
  return request({
    url: searchtop,
    method: 'get',
    params,
    hideloading: false
  })
}

export function getsearchhistory (params = {
}) {
  return request({
    url: searchhistory,
    method: 'get',
    params,
    hideloading: false
  })
}
export function getminephone (params = {
}) {
  return request({
    url: minephone,
    method: 'get',
    params,
    hideloading: false
  })
}
export function getmineuser (params = {
}) {
  return request({
    url: mineuser,
    method: 'get',
    params,
    hideloading: false
  })
}
export function getminecode (params = {
}) {
  return request({
    url: minecode,
    method: 'get',
    params,
    hideloading: false
  })
}
export function getminepass (params = {
}) {
  return request({
    url: minepass,
    method: 'post',
    params,
    hideloading: false
  })
}
export function getminelogin (params = {
}) {
  return request({
    url: minelogin,
    method: 'post',
    params,
    hideloading: false
  })
}
export function postcartadd (params = {
}) {
  return request({
    url: cartadd,
    method: 'post',
    params,
    hideloading: false
  })
}
export function postcartadd_legth (params = {
}) {
  return request({
    url: cartadd_length,
    method: 'get',
    params,
    hideloading: false
  })
}
export function postcartadd_user (params = {
}) {
  return request({
    url: cartadd_user,
    method: 'get',
    params,
    hideloading: false
  })
}
export function postcart_delete (params = {
}) {
  return request({
    url: cartdelete,
    method: 'patch',
    params,
    hideloading: false
  })
}
export function postcart_mend (params = {
}) {
  return request({
    url: cartamend,
    method: 'patch',
    params,
    hideloading: false
  })
}
export function postcart_order (params = {
}) {
  return request({
    url: cart_order,
    method: 'get',
    params,
    hideloading: false
  })
}
export function postcart_cart_getArea (params = {
}) {
  return request({
    url: cart_getArea,
    method: 'post',
    params,
    hideloading: false
  })
}
export function postcart_cart_create (params = {
}) {
  return request({
    url: cart_create,
    method: 'post',
    params,
    hideloading: false
  })
}
export function postcart_cart_pwd (params = {
}) {
  return request({
    url: cart_pwd,
    method: 'post',
    params,
    hideloading: false
  })
}
export function postcart_cart_pay (params = {
}) {
  return request({
    url: cart_pay,
    method: 'post',
    params,
    hideloading: false
  })
}
export function postcart_cart_cats (params = {
}) {
  return request({
    url: cart_cats,
    method: 'get',
    params,
    hideloading: false
  })
}
export function postcart_cart_cats_cart (params = {
}) {
  return request({
    url: cart_cats_cart,
    method: 'get',
    params,
    hideloading: false
  })
}
export function postcart_cart_Alipay (params = {
}) {
  return request({
    url: cart_Alipay,
    method: 'post',
    params,
    hideloading: false
  })
}
