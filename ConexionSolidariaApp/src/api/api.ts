import axios from "axios";
const API = axios.create({
  baseURL: "http://192.168.129.92:3000/api", 
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});
export default API;