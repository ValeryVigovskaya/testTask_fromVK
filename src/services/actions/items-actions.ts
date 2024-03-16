import { getDataFetch } from "../../api/api";
import { IItem } from "../../utils/types";
import { AppDispatch } from "../../services/index";

export const GET_DATA_REQUEST: "GET_DATA_REQUEST" = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS: "GET_DATA_SUCCESS" = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED: "GET_DATA_FAILED" = "GET_DATA_FAILED";
export const INCREASE_COUNT: "INCREASE_COUNT" = "INCREASE_COUNT";
export const DECREASE_COUNT: "DECREASE_COUNT" = "DECREASE_COUNT";
export const DELETE_ITEM: "DELETE_ITEM" = "DELETE_ITEM";

export interface IGetDataAction {
  readonly type: typeof GET_DATA_REQUEST;
}

export interface IGetDataFailedAction {
  readonly type: typeof GET_DATA_FAILED;
}

export interface IIncreaseCountAction {
  readonly type: typeof INCREASE_COUNT;
  readonly items: IItem;
  readonly keyUuid: string;
}

export interface IDecreaseCountAction {
  readonly type: typeof DECREASE_COUNT;
  readonly items: IItem;
  readonly keyUuid: string;
}

export interface IGetDataSuccessAction {
  readonly type: typeof GET_DATA_SUCCESS;
  readonly data: IItem[];
}

export interface IDeleteItemAction {
  readonly type: typeof DELETE_ITEM;
  readonly keyUuid: string;
}

export type TItemsActions =
  | IGetDataAction
  | IGetDataFailedAction
  | IGetDataSuccessAction
  | IIncreaseCountAction
  | IDecreaseCountAction
  | IDeleteItemAction;

export const getDataAction = (): IGetDataAction => ({
  type: GET_DATA_REQUEST,
});

export const getDataFailedAction = (): IGetDataFailedAction => ({
  type: GET_DATA_FAILED,
});

export const getDataSuccessAction = (data: IItem[]): IGetDataSuccessAction => ({
  type: GET_DATA_SUCCESS,
  data,
});

export function getData() {
  return function (dispatch: AppDispatch) {
    dispatch(getDataAction());
    getDataFetch()
      .then((res) => {
        if (res) {
          const itemsSlice = res.slice(0, 3);
          dispatch(getDataSuccessAction(itemsSlice));
        }
      })
      .catch((err) => {
        dispatch(getDataFailedAction());
      });
  };
};

export const increaseCount = (item: IItem, keyUuid: string): IIncreaseCountAction => ({
    type: INCREASE_COUNT,
    keyUuid: keyUuid,
    items: item,
});

export const decreaseCount = (item: IItem, keyUuid: string): IDecreaseCountAction => ({
  type: DECREASE_COUNT,
  keyUuid: keyUuid,
  items: item,
});

export const deleteItem = (keyUuid: string): IDeleteItemAction => ({
  type: DELETE_ITEM,
  keyUuid,
});
