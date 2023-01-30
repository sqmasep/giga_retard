import superjson from "superjson";
import { createClient } from "redis";

const DEFAULT = {
  PREFIX: "giga_retard:",
  TTL: 60 * 60 * 24 * 7, // one week
};
let isConnected: boolean = false;

export const redis = createClient();

redis.on("connect", () => (isConnected = true));

interface CacheCallbackArgs {
  key: string;
}

export const redisCache = async <T>(
  key: string,
  cb: (opts: CacheCallbackArgs) => Promise<T>
): Promise<T> => {
  if (!process.env.REDIS_ENABLED || !isConnected) return await cb({ key });

  const fullKey = `${DEFAULT.PREFIX}${key}`;
  const cachedValue = await redis.get(fullKey);

  if (cachedValue !== null) {
    return superjson.parse(cachedValue);
  }

  const res = await cb({ key });
  redis.setEx(fullKey, DEFAULT.TTL, superjson.stringify(res));

  return res;
};
