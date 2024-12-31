import axios from 'axios';
const login = async (formData) => {
  
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log("Login successful:", response.data);
    } else {
      console.error("Token not found in response");
    }
  } catch (error) { 
  
    console.error("Error occurred in login:", error);
  }
};

export default login
