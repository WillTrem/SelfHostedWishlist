import Item from '@/interfaces/Item';
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}`;

axios.defaults.baseURL = API_BASE_URL;

export async function getItems(): Promise<Item[] | undefined> {
  const response = await axios.get<Item[]>(`/items`);

  if (response.data) {
    return response.data;
  }
}

export async function deleteItem(id: number): Promise<AxiosResponse> {
  return await axios.delete(`/items/${id}`);
}
