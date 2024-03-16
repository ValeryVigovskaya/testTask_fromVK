import { IItem } from "../utils/types";

const BASE_URL = "https://fakestoreapi.com/";

const request = <T>(
  endpoint: RequestInfo | URL,
  options?: RequestInit
): Promise<T> => {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
};

const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: string) => Promise.reject(err));
};

export const getDataFetch = (): Promise<IItem[]> => {
    return request('products');
  };