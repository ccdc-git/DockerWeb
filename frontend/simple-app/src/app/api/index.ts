import axios from "axios";

const apiClient = axios.create();

export const gate = {
  getItemList: async () => {
    const res = await apiClient.get<Item[]>("/api/item/");
    return res.data;
  },

  getItem: async (pk: number) => {
    const res = await apiClient.get<Item>(`/api/item/${pk}/`);
    return res.data;
  },

  postItem: async (item: Item) => {
    return await apiClient.post<Item>(`/api/item/`, item);
  },

  putItem: async (item: Item) => {
    return await apiClient.put<Item>(`/api/item/${item.id}/`, item);
  },

  deleteItem: async (pk: number) => {
    return await apiClient.delete(`/api/item/${pk}/`);
  },
};
