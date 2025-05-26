import { createService } from '../utils/request';

// 从环境变量中读取 TMDB 的 base URL 和 API Key
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// 创建 TMDB 专用的 Axios 实例
const tmdb = createService(TMDB_BASE_URL);
/**
 * 获取热门电影
 */
export const getPopularMovies = () =>
  tmdb.get('/movie/popular', {
    params: {
      api_key: TMDB_API_KEY,
    },
  });
/**
 * 电影详情
 */

export const getMovie = (id: string | number) =>
  tmdb.get(`/movie/${id}`);

/**
 * 搜索电影
 * @param query 关键字
 * @param page 分页页码
 */
export function searchMovies(query: string, page = 1) {
  return tmdb.get('/search/movie', {
    params: {
      api_key: TMDB_API_KEY,
      query,
      page,
    },
  });
}
// import React, { useState } from 'react';
// import { searchMovies } from '@/api/tmdb';

// const MovieSearch = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const data = await searchMovies(query);
//       setResults(data.results || []);
//     } catch (error) {
//       console.error('搜索失败', error);
//     }
//   };

/**
 * 获取请求令牌 (Request Token)
 */
export function createRequestToken() {
  return tmdb.get('/authentication/token/new', {
    params: { api_key: TMDB_API_KEY },
  });
}

/**
 * 使用用户名和密码验证请求令牌
 * @param username TMDB 用户名
 * @param password TMDB 密码
 * @param requestToken 第一步获取的请求令牌
 */
export function validateWithLogin(username: string, password: string, requestToken: string) {
  return tmdb.post(
    '/authentication/token/validate_with_login',
    {
      username,
      password,
      request_token: requestToken,
    },
    {
      params: { api_key: TMDB_API_KEY },
    },
  );
}

/**
 * 创建会话 ID
 * @param validatedRequestToken 验证后的请求令牌
 */
export function createSession(validatedRequestToken: string) {
  return tmdb.post(
    '/authentication/session/new',
    { request_token: validatedRequestToken },
    { params: { api_key: TMDB_API_KEY } },
  );
}