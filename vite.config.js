// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default ({ mode }) => {
  // 1) 读取对应 .env 文件
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    /* ---------- 全局基础路径，挂到子目录时用 ---------- */
    // 例：部署到 https://xxx.com/react-film/ 则设 base:'/react-film/'
    base: env.VITE_PUBLIC_PATH || '/',

    /* ---------- 插件 ---------- */
    plugins: [
      react(),
      // reactRouterPlugin(),          // 可选
    ],

    /* ---------- 路径别名 ---------- */
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    /* ---------- 开发服务器 ---------- */
    server: {
      host: '0.0.0.0',   // 同局域网可访问
      port: 3000,
      open: true,        // 启动自动打开浏览器
      proxy: {
        // /api 开头 → 对应后端网关
        '/api': {
          target: env.VITE_BASE_REQ_URL,     // .env.development 里写真实地址
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, ''),
        },
        // /mock 开头 → 例子：转到百度
        '/mock': {
          target: 'https://www.baidu.com',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/mock/, ''),
        },
      },
    },

    /* ---------- 构建 ---------- */
    build: {
      sourcemap: mode !== 'production', // 生产不生成 source map，可按需调整
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // 把第三方依赖拆包，加速首屏
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
        },
      },
    },

    /* ---------- 依赖优化 ---------- */
    optimizeDeps: {
      include: ['axios', 'qs'],
    },

    /* ---------- 定义全局常量 ---------- */
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  });
};
