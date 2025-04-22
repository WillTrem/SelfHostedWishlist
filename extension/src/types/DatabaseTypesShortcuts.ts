import { Tables, TablesInsert } from './database.types';

export type Item = Tables<{ schema: 'self_hosted_wishlist' }, 'items'>;
export type ItemInsert = TablesInsert<{ schema: 'self_hosted_wishlist' }, 'items'>;
