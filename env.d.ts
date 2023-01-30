declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_SECRET_ID: string;
      REDIS_URL: string;
      REDIS_ENABLED: boolean;
    }
  }
}

export {};
