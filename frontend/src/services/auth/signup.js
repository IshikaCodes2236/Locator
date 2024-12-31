import axios from 'axios';

const signup = async (formData) => {
  try {
    
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, formData);
    localStorage.setItem('token', response.data.token);
    return response;

  } catch (error) {
   
    console.error("Error occurred in login:", error);
  }
};

export default signup