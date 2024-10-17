import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
      OPENAI_API_KEY: z.string(),
      BINANCE_API_KEY: z.string(),
      BINANCE_API_SECRET: z.string(),
      CMC_API_KEY: z.string()
    },
    client: {
      NEXT_PUBLIC_EXAMPLE: z.string()
    },
    runtimeEnv: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      NEXT_PUBLIC_EXAMPLE: process.env.NEXT_PUBLIC_EXAMPLE,
      BINANCE_API_KEY: process.env.BINANCE_API_KEY,
      BINANCE_API_SECRET: process.env.BINANCE_API_SECRET,
      CMC_API_KEY: process.env.CMC_API_KEY,
    },
  });
