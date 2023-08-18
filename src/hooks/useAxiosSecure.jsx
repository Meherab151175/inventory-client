import axios from 'axios';
import { toast } from 'react-toastify';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});


const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use((req)=>{
      const token = localStorage.getItem("access-token");
      if(token){
          req.headers.Authorization = `Bearer ${token}`
      }
      return req;
  });

  axiosSecure.interceptors.response.use(
      response => response,
      (error) =>{
          if(error.response && (error?.response.status === 403 || error?.response.status === 401)){
              toast.error(error?.response?.data.error)
          
      }}
  )
return axiosSecure;
};


// const useAxiosSecure = () => {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();


//   useEffect(() => {
//     const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
//       const token = localStorage.getItem('access-token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     });

//     const responseInterceptor = axiosSecure.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//           await logout();
//           navigate('/login');
//           throw error; // Rethrow the error to avoid processing the response further
//         }
//         throw error; // Rethrow other errors to maintain consistent error handling
//       }
//     );

//     return () => {
//       // Clean up interceptors when the component unmounts
//       axiosSecure.interceptors.request.eject(requestInterceptor);
//       axiosSecure.interceptors.response.eject(responseInterceptor);
//     };
//   }, [logout, navigate, axiosSecure]);

//   return axiosSecure;
// };

export default useAxiosSecure;
