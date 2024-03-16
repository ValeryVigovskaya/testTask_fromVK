import "./total.css";
import { Group, Header, Paragraph } from "@vkontakte/vkui";
import { useAppSelector } from "../../services/index";
import { formattedCost } from "../../utils/functions";

export const Total = () => {
  const { totalPrice } = useAppSelector((state) => state.items);
  return (
    <>
      <Group
        header={<Header mode="secondary">Итоговая сумма к оплате</Header>}
        className="total__container"
        mode="card"
      >
        <Paragraph className="caption">
          Итого: {formattedCost(totalPrice)} руб.
        </Paragraph>
      </Group>
    </>
  );
};
