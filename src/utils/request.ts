// src/utils/request.ts
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
// import router from '@/routes';           // 根据你的路由文件实际路径调整

const service = axios.create({
  // 这里不直接写 baseURL，而是留给 Vite 代理或各环境 .env 去控制
  baseURL: import.meta.env.VITE_BASE_FILM_URL,
  timeout: 5000,
});

/* -------- 请求拦截 -------- */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) config.headers!['admin-front'] = `Bearer ${token}`;
    return config;
  },
  Promise.reject,
);

/* -------- Response Interception -------- */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.code !== 0 && res.code !== 200) {
      if (res.code === 401) {
        console.log('error')
        // ElMessage.error('身份认证已失效，请重新登录');
        // router.push('/login');
      } else {
        console.log(res.msg)
        // ElMessage.error(res.msg || '请求出错！');
      }
    }
    return res;          // 统一返回 data，组件里再按业务取字段
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const msg = data?.msg || `Status:${status}，server anomaly!`;
      console.log(msg)
      // ElMessage.error(msg);
    } else {
      // ElMessage.error('服务器无响应！');
      console.log('The server is not responding!')
    }
    return Promise.reject(error);
  },
);

/* -------- HTTP 快捷方法 -------- */
export const get  = <T = any>(url: string, params?: any) => service.get<T>(url, { params });
export const post = <T = any>(url: string, data?: any, params?: any) =>
  service.post<T>(url, data ?? null, { params });
export const put  = <T = any>(url: string, data?: any, params?: any) =>
  service.put<T>(url, data ?? null, { params });
export const del  = <T = any>(url: string, params?: any) => service.delete<T>(url, { params });
