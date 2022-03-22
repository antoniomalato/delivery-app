import axios from 'axios';

const apiUrl = 'http://localhost:3001';

export const postRegisterData = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const postLoginData = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, data);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.status;
    } if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error:', error.message);
    }
  }
};

export const fetchCustomerProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/customer/products`);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.status;
    } if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error:', error.message);
    }
  }
};  

export const postOrderProducts = async (data, token) => {
  try {
    const response = await axios.post(`${apiUrl}/customer/checkout`, data, {
      headers: {
        authorization: token,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getOrdersById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/customer/orders/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

// get all orders
export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${apiUrl}/customer/orders`, {
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getSellerOrdersById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/seller/orders/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateSaleStatus = async (id, status) => {
  try {
    const response = await axios.put(`${apiUrl}/seller/orders/${id}`,
      { status_sale: status });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateCustomerSaleStatus = async (id, status) => {
  try {
    const response = await axios.put(`${apiUrl}/customer/orders/${id}`,
      { status_sale: status });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchSellerOrders = async () => {
  try {
    const response = await axios.get(`${apiUrl}/seller/orders`, {
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
