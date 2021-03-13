import axios from "axios";
 const baseUrl = `http://localhost:8000`

export default {
  getCurrentUser: (config) => {
      return  axios.get(baseUrl+"/api/auth/user", config);
    },
  login:(username , password)=>{
    return axios.post(baseUrl+"/api/auth/login", { username, password })
  },
  register:(username, email, password)=>{
    return axios.post(baseUrl+ "/api/auth/register", { email, username, password })
  },
  logout: (config) => {
    return  axios.post(baseUrl+"/api/auth/logout", null, config);
  },
  getPosts: (config)=>{
    return axios.get(baseUrl+"/api/posts", config);
  },
  addPost: (post, config)=>{
    return axios.post(baseUrl+ "/createpost", post, config)
  },
  getTopics: (config)=>{
    return axios.get(baseUrl+"/api/topics", config);
  },
  addTopic: (postId, body, config)=>{
    return axios.patch(baseUrl+ `/api/posts/${postId}/`, body, config)
  },
  getUserProfile: (id, config)=>{
    return axios.get(baseUrl+ `/api/userprofile/${id}`, config)
  }

};
