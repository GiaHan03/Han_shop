const API_BASE_URL = 'http://localhost:5023/api';
const VNPAY_API_URL = 'http://localhost:3000';

const handleResponse = async (response) => {
  const text = await response.text();
  if (!response.ok) {
    let error;
    try {
      error = JSON.parse(text);
    } catch (e) {
      error = { message: text || response.statusText };
    }
    throw new Error(error.message || response.statusText);
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
};

export const api = {
  products: {
    getAll: () => fetch(`${API_BASE_URL}/product`).then(handleResponse),
    getById: (id) => fetch(`${API_BASE_URL}/product/${id}`).then(handleResponse),
  },
  categories: {
    getAll: () => fetch(`${API_BASE_URL}/category`).then(handleResponse),
  },
  orders: {
    create: (orderData) => fetch(`${API_BASE_URL}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    }).then(handleResponse),
    getByCustomer: (customerId) => fetch(`${API_BASE_URL}/order/customer/${customerId}`).then(handleResponse),
  },
  customers: {
    create: (data) => fetch(`${API_BASE_URL}/customer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    update: (id, data) => fetch(`${API_BASE_URL}/customer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
  },
  auth: {
    login: (credentials) => fetch(`${API_BASE_URL}/account/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }).then(handleResponse),
    register: (data) => fetch(`${API_BASE_URL}/account/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
  },
  vnpay: {
    createPaymentUrl: (params) => {
      const query = new URLSearchParams(params).toString();
      return fetch(`${VNPAY_API_URL}/payment?${query}`).then(handleResponse);
    }
  }
};
