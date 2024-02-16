import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const Route = async (
  method,
  endpoint,
  token,
  data,
  contentType = "application/json"
) => {
  const headers = {
    "Content-Type": contentType,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const requestOptions = {
    method,
    headers,
  };
  if (contentType === "application/json") {
    if (data) {
      requestOptions.data = JSON.stringify(data);
    }
  } else {
    requestOptions.data = data;
  }

  try {
    const response = await axios(`${apiUrl}${endpoint}`, requestOptions);
    return response;
  } catch (error) {
    return error;
  }
};

export default Route;
