import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const Route = async (method, endpoint, token, data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const requestOptions = {
    method,
    headers,
  };
  if (data) {
    requestOptions.data = JSON.stringify(data);
  }
  try {
    const response = await axios(`${apiUrl}${endpoint}`, requestOptions);
    return response;
  } catch (error) {
    return error;
  }
};

export default Route;
