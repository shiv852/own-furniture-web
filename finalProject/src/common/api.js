
import axios from 'axios';

const api = axios.create({
  // baseURL:'http://jaipurbestfurniture.shop/auth'    //if i will run this application on domain 
 // baseURL:'http://localhost:3000/auth'         //if my application running on localhost 
    baseURL:'http://13.203.220.54:31000/auth'    //if my application running on this port
   
});
export const googleAuth =(code) => api.get(`/google?code=${code}`)

