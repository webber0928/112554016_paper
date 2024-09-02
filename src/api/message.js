import request from '@/utils/request'

export function getInfo() {
  return request({
    url: '/dashboard/message/user/list',
    method: 'get'
  })
}

export function getUser(id) {
  return request({
    url: '/dashboard/message/user/' + id,
    method: 'get'
  })
}

export function getUserGroup() {
  return request({
    url: '/dashboard/message/userGroup/list',
    method: 'get'
  })
}

export function getUserGroupOne(groupName) {
  return request({
    url: '/dashboard/message/userGroup/' + groupName,
    method: 'get'
  })
}
