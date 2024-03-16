import { IItem } from "./types";

//функция расчета полной стоимости
export const totalPrice = (array: IItem[]) => {
    return array.reduce((acc, item) => {
       return acc + item.price * item.count;
     }, 0)
   };

//функция форматировария стоимости
export const formattedCost = (number: number) => {
    return number.toFixed(2);
  }