import axios from 'axios'
import store from '../store'

axios.defaults.timeout = 8000;
axios.defaults.withCredentials=true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(
  config => {
    if (store.state.userStatus.token) { //判断token是否存在
      config.headers.Authorization = store.state.userStatus.token;  //将token设置成请求头
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default axios