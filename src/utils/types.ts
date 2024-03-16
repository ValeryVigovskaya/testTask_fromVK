export interface IItem {
    id: number;
    image: string;
    title: string;
    price: number;
    keyUuid: string;
    count: number;
    totalPrice: number;
  }

  export type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
    [key in TDataKey]: TDataType;
  } & {
    success: boolean;
    message?: string;
    headers?: Headers;
  };