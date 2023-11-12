import axios from 'axios';


const API_URL = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000/api'; 
console.log(API_URL);

const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export { fetchData };