import React, {FC, useContext} from "react";
import Img from "../components/img";
import {LangDataStoreContext} from "../components/lang-data-store-context";
import {OptionStr} from "../game/data";

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
        gameData.deploymentTypes.map(Option)
      }
      <h2>{t("primaryTitle")}</h2>
      {
        gameData.primaryObjectives.map(Option)
      }
      <h2>{t("durationTitle")}</h2>
      {
        gameData.duration.map(Option)
      }
      <h2>{t("secondaryTitle")}</h2>
      <p>{t("secondarySubtitle")}</p>
      {
        gameData.secondaryObjectives.map(Option)
      }
      <h2>{t("specialTitle")}</h2>
      {
        gameData.special.map(Option)
      }

    </main>
  );
};

const Option: FC<OptionStr> = (o) => {
  return <div key={o.order}>
    <h5>{o.order}.&nbsp;{o.title}:&nbsp;{o.rollsText}</h5>
    {o.image ? <Img src={o.image} style={{maxWidth: 800}}/> : <></>}
    <p>{o.text}</p>
  </div>
}

export default Read;
