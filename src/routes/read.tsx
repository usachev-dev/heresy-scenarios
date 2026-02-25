import React, {FC, useContext} from "react";
import Img from "../components/img";
import {LangDataStoreContext} from "../components/lang-data-store-context";
import {OptionComponent} from "../components/option";

const Read: FC = () => {
  let l = useContext(LangDataStoreContext);
  let t = (s: string): string => l.t(s);
  let gameData = l.gameData
  return (
    <main className="container main is-max-desktop content">
      <h1>{t("textTitle")}</h1>
      <p>{t("text1p0")}</p>
      <p>{t("text1p1")}</p>
      <p>{t("text1p2")}</p>
      <p>{t("text1p3")}</p>
      <h2>{t("deploymentTypeTitle")}</h2>
      <p>{t("deploymentTypeSubtitle")}</p>
      {
        gameData.deploymentTypes.map(o => <OptionComponent option={o} />)
      }
      <h2>{t("primaryTitle")}</h2>
      {
        gameData.primaryObjectives.map(o => <OptionComponent option={o} />)
      }
      <h2>{t("durationTitle")}</h2>
      {
        gameData.duration.map(o => <OptionComponent option={o} />)
      }
      <h2>{t("secondaryTitle")}</h2>
      <p>{t("secondarySubtitle")}</p>
      {
        gameData.secondaryObjectives.map(o => <OptionComponent option={o} />)
      }
      <h2>{t("specialTitle")}</h2>
      {
        gameData.special.map(o => <OptionComponent option={o} />)
      }

    </main>
  );
};


export default Read;
