import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const useAuthRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      if (!window.location.pathname.includes('/auth/login') && !window.location.pathname.includes('/auth/signup')) {
        navigate('/auth/login');  
      }
    } else {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/details`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('User details fetched:', response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);  
          navigate('/auth/login');  
        }
      };
      fetchUserDetails();
    }
  }, [navigate]);
};

export default useAuthRedirect;
