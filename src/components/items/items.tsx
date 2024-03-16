import { Card, Group, Header } from "@vkontakte/vkui";
import "./items.css";
import { useAppDispatch, useAppSelector } from "../../services/index";
import { IItem } from "../../utils/types";
import { useEffect } from "react";
import { getData } from "../../services/actions/items-actions";
import { ItemCard } from "../itemCard/itemCard";
import { v4 as uuidv4 } from "uuid";

export const Items = () => {
  const dispatch = useAppDispatch();
  const { items, itemsRequest, itemsFailed } = useAppSelector(
    (state) => state.items
  );

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  if (itemsFailed) {
    return <p>Произошла ошибка при получении данных</p>;
  } else if (itemsRequest) {
    return <p>Загрузка</p>;
  } else {
    return (
      <Group
        header={<Header mode="secondary">Корзина</Header>}
        className="group_items"
        mode="card"
      >
        {items?.map((item: IItem) => (
          <Card key={(item.keyUuid = uuidv4())} className="card" mode="outline">
            <ItemCard cardItem={item} />
          </Card>
        ))}
      </Group>
    );
  }
};
