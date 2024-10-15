import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  /** This comes from package.json */
  npm_package_version: z.string().default('0.0.1'),
});

const { success, data, error } = envSchema.safeParse(process.env);
if (!success) {
  console.error('❌ Invalid environment variables:', error.format());
  process.exit(1);
}

export const config = {
  app: {
    version: data.npm_package_version,
  },
};
