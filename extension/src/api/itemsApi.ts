import axios from 'axios';
import { Item, ItemInsert } from '@/types/DatabaseTypesShortcuts';
import { ERR_MSG } from '@/constants';
import { getApiUrl } from '@/helpers/ExtensionStorageHelper';

async function getBaseUrlFromExtensionStorage(): Promise<string> {
  const url = await getApiUrl();
  if (url) {
    return url;
  } else {
    throw Error(ERR_MSG.NO_BASE_URL);
  }
}

// API functions that depend on baseURL being set
export const itemsApi = {
  async getItems() {
    const baseUrl = await getBaseUrlFromExtensionStorage();
    const response = await axios.get<{ items: Item[] }>(`${baseUrl}/items`);
    if (response.data) {
      return response.data.items;
    }
  },

  async deleteItem(id: number) {
    const baseUrl = await getBaseUrlFromExtensionStorage();
    return await axios.delete(`${baseUrl}/items/${id}`);
  },

  async addItem(item: ItemInsert) {
    const baseUrl = await getBaseUrlFromExtensionStorage();
    return await axios.post(`${baseUrl}/items`, { ...item });
  },
};
