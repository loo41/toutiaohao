import request from '../utils/request.js'
const BASEURL = `http://api.nowrank.cn/get`

export function getType () {
  return request(`${BASEURL}/toutiao_type`)
}

export function getDayTime () {
  return request(`${BASEURL}/toutiao_day/time`)
}

export async function getWeekTime () {
  return request(`${BASEURL}/toutiao_week/time`)
}

export function getDayList (params) {
  return request(`${BASEURL}/toutiao_day/${params.type}/${params.date}`)
}

export function getWeekList (params) {
  return request(`${BASEURL}/toutiao_week/${params.type}/${params.date}`)
}

// 抖音
export function getDouyinType () {
  return request(`${BASEURL}/douyin/categories`)
}

export function getDouyinDayTime () {
  return request(`${BASEURL}/douyin/day/time`)
}

export function getDouyinWeekTime () {
  return request(`${BASEURL}/douyin/week/time`)
}

export function getDouyinList (params) {
  console.log(params)
  return request(`${BASEURL}/douyin/${params.flag}/${params.type}/${params.date}`)
}
