import request from '../util/request';

export function queryList(data) {
  return request('/oms/category/search', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getInfo(data) {
  return request('/oms/category/detail', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function modifySort(data) {
  return request('/oms/category/saveOrUpdate', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
} 

export function deleteOne(id) {
  return request(`/api/cards/${id}`, {
    method: 'DELETE'
  });
}

export function addOne(data) {
  return request('/api/cards/add', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getStatistic(id) {
  return request(`/api/cards/${id}/statistic`);
}