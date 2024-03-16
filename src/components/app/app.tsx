import { useEffect } from "react";
import {
  AppRoot,
  SplitLayout,
  View,
  Panel,
  PanelHeader,
  usePlatform,
} from "@vkontakte/vkui";
import "./app.css";
import "@vkontakte/vkui/dist/vkui.css";
import { useAppDispatch } from "../../services";
import { getData } from "../../services/actions/items-actions";
import { Items } from "../items/items";
import { Total } from "../total/total";

export const App = () => {
  const dispatch = useAppDispatch();
  const platform = usePlatform();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <AppRoot>
      <SplitLayout
        header={
          platform !== "vkcom" && <PanelHeader delimiter="none"></PanelHeader>
        }
      >
        <PanelHeader>Проект подготовила Халитова Валерия</PanelHeader>
        <div className="content-container">
          <View activePanel="bascket">
            <Panel id="bascket">
              <PanelHeader></PanelHeader>
              <Items />
            </Panel>
          </View>

          <View activePanel="totalSum">
            <Panel id="totalSum">
              <PanelHeader></PanelHeader>
              <Total />
            </Panel>
          </View>
        </div>
      </SplitLayout>
    </AppRoot>
  );
};
