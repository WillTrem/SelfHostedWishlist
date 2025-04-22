import { Database } from '@/types/database.types';
import { PostgrestClient } from '@supabase/postgrest-js';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}`;

export const postgrest = new PostgrestClient<Database>(API_BASE_URL, {
  schema: 'self_hosted_wishlist',
});
