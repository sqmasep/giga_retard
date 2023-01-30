declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      REDIS_URL: string;
      REDIS_ENABLED: boolean;
    }
  }
}

export {};
