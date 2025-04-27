import axios from 'axios';
// import { postgrest } from './PostgrestClient';
import { Item, ItemInsert } from '@/types/DatabaseTypesShortcuts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}`;

axios.defaults.baseURL = API_BASE_URL;

export async function getItems() {
  const response = await axios.get<{ items: Item[] }>(`/items`);
  // const response = await postgrest.from('items').select();
  if (response.data) {
    return response.data.items;
  }
}

export async function deleteItem(id: number) {
  return await axios.delete(`/items/${id}`);
  // return await postgrest.from('items').delete().eq('id', id);
}

export async function addItem(item: ItemInsert) {
  return await axios.post('/items', { ...item });
  // return await postgrest.from('items').insert(item);
}
