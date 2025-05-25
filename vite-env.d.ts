/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_FILM_URL: string;
  // readonly VITE_SOME_OTHER_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};             
