import {
  Button,
  ButtonGroup,
  ContentCard,
  Counter,
  Div,
  IconButton,
  Paragraph,
} from "@vkontakte/vkui";
import "./itemCard.css";
import { useAppDispatch } from "../../services/index";
import { IItem } from "../../utils/types";
import { FC, useState } from "react";
import { deleteItem } from "../../services/actions/items-actions";
import {
  decreaseCount,
  increaseCount,
} from "../../services/actions/items-actions";
import { Icon36Delete } from "@vkontakte/icons";
import { formattedCost } from "../../utils/functions";

interface Props {
  cardItem: IItem;
}

export const ItemCard: FC<Props> = ({ cardItem }) => {
  const [isActive] = useState(false);

  const dispatch = useAppDispatch();

  const handleIncrease = () => {
    dispatch(increaseCount(cardItem, cardItem.keyUuid));
  };

  const handleDecrease = () => {
    dispatch(decreaseCount(cardItem, cardItem.keyUuid));
  };
  const handleDelete = () => {
    dispatch(deleteItem(cardItem.keyUuid));
  };
  return (
    <>
      <ContentCard
        caption={cardItem.title}
        src={cardItem.image}
        className="cardImg"
        mode="tint"
      ></ContentCard>
      <Div>
        <ButtonGroup stretched align="center" className="buttons__container">
          <Button
            size="l"
            appearance="accent"
            onClick={handleDecrease}
            disabled={cardItem.count === 1 ? !isActive : isActive}
          >
            -
          </Button>
          <Counter mode="contrast" className="counter">
            {cardItem.count}
          </Counter>
          <Button
            size="l"
            appearance="accent"
            onClick={handleIncrease}
            disabled={cardItem.count === 10 ? !isActive : isActive}
          >
            +
          </Button>
        </ButtonGroup>
      </Div>
      <div className="container__buscket-sum">
        <Paragraph className="price">
          {cardItem.count === 1
            ? formattedCost(cardItem.price)
            : formattedCost(cardItem.totalPrice)}{" "}
          &#8381;
        </Paragraph>
        <IconButton
          label="Удалить"
          className="delete-button"
          onClick={handleDelete}
        >
          <Icon36Delete />
        </IconButton>
      </div>
    </>
  );
};
