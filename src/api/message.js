import request from '@/utils/request'

export function getInfo(params) {
  return request({
    url: '/dashboard/message/user/list',
    method: 'get',
    params
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

export function getMessageList(params) {
  return request({
    url: '/gpt-history',
    method: 'get',
    params
  })
}

export function setMessageList(params) {
  return request({
    url: '/gpt-history',
    method: 'post',
    data: params
  })
}

export function leaveMessage(params) {
  return request({
    url: '/gpt-endMessage',
    method: 'post',
    data: params
  })
}

export function dateLine(params) {
  return request({
    url: '/dashboard/message/dateLine',
    method: 'get',
    data: params
  })
}

export function messageList(params) {
  return request({
    url: '/dashboard/message/list',
    method: 'get',
    params
  })
}
