import { minelogin, minecode, minepass, homeList, hometabListl, homedetali, searchtop, searchhistory, minephone, mineuser } from './index'
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
    hideloading: true
  })
}
export function getmineuser (params = {
}) {
  return request({
    url: mineuser,
    method: 'get',
    params,
    hideloading: true
  })
}
export function getminecode (params = {
}) {
  return request({
    url: minecode,
    method: 'get',
    params,
    hideloading: true
  })
}
export function getminepass (params = {
}) {
  return request({
    url: minepass,
    method: 'post',
    params,
    hideloading: true
  })
}
export function getminelogin (params = {
}) {
  return request({
    url: minelogin,
    method: 'post',
    params,
    hideloading: true
  })
}
