import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILED,
  TItemsActions,
  INCREASE_COUNT,
  DECREASE_COUNT,
  DELETE_ITEM,
} from "../actions/items-actions";
import { IItem } from "../../utils/types";
import { totalPrice } from "../../utils/functions";

export type TItemsState = {
  items: IItem[];
  itemsRequest: boolean;
  itemsFailed: boolean;
  totalPrice: number;
};

const initialState: TItemsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  totalPrice: 0,
};

export const itemsReducer = (state = initialState, action: TItemsActions) => {
  switch (action.type) {
    case GET_DATA_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_DATA_SUCCESS: {
      const newData = action.data.map(item => ({
        ...item,
        count: 1 // дефолтно
      }))
      return {
        ...state,
        itemsFailed: false,
        items: newData,
        itemsRequest: false,
        totalPrice: totalPrice(state.items),
      };
    }
    case GET_DATA_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false,
      };
    }
    case INCREASE_COUNT: {
        return {
          ...state,
          items: state.items.map(item => {
            if (item.keyUuid === action.keyUuid) {
              item.count = item.count+1;
              item.totalPrice = item.price * item.count;
            } 
            return item;
          }),
          totalPrice: totalPrice(state.items)
        }
     }
    case DECREASE_COUNT: {
      return {
        ...state,
        items: state.items.map(item => {
          if (item.keyUuid === action.keyUuid) {
            item.count = item.count-1;
            item.totalPrice = item.totalPrice - item.price;
          } 
          return item;
        }),
        totalPrice: totalPrice(state.items)
      }
    }
    case DELETE_ITEM: {
      const arrayWithoutItem = [...state.items].filter((item)=> item.keyUuid !== action.keyUuid);
      return {
        ...state,
        items: arrayWithoutItem,
        totalPrice: totalPrice(arrayWithoutItem)
      }
    }
    default: {
      return state;
    }
  }
};
