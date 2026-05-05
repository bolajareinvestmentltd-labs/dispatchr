import { neon } from '@neondatabase/serverless';

// This securely connects to your Neon database using your environment variable
export const sql = neon(process.env.DATABASE_URL);
