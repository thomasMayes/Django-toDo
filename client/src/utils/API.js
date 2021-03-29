import axios from "axios";
 const baseUrl = `http://localhost:8000`

export default {
  getCurrentUser: (config) =>axios.get(baseUrl+"/api/auth/user", config),
  login:(username , password)=>axios.post(baseUrl+"/api/auth/login", { username, password }),
  register:(username, email, password)=> axios.post(baseUrl+ "/api/auth/register", { email, username, password }),
  logout: (config) => axios.post(baseUrl+"/api/auth/logout", null, config),
  getPosts: (config)=>axios.get(baseUrl+"/api/posts", config),
  addPost: (post, config)=>axios.post(baseUrl+ "/createpost", post, config),
  getTopics: (config)=>axios.get(baseUrl+"/api/topics", config),
  addTopic: (postId, body, config)=> axios.patch(baseUrl+ `/api/posts/${postId}/`, body, config),
  getUserProfile: (id, config)=>axios.get(baseUrl+ `/api/userprofile/${id}`, config)
};
