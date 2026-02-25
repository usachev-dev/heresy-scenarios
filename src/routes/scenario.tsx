import React, { FC, useContext } from "react";
import Img from "../components/img";
import { LangDataStoreContext } from "../components/lang-data-store-context";
import { URLSforFILES } from "../components/urls";
import {useSearchParams} from "react-router-dom";
import {SavedScenario, Scenario, URLParamsToSavedScenario} from "../game/scenario";
import {OptionComponent} from "../components/option";

const Builder: FC = () => {
  let l = useContext(LangDataStoreContext);
  let t = (s: string): string => l.t(s);
  let [params] = useSearchParams();
  let savedScenario: SavedScenario = URLParamsToSavedScenario(params);
  let s = new Scenario(l.gameData, savedScenario);
  return (
    <main className="container main content">
      <h2>{t("deploymentTypeTitle")}</h2>
      <p>{t("deploymentTypeSubtitle")}</p>
      <OptionComponent option={s.deployment} skipInfo={true} />
      <h2>{t("primaryTitle")}</h2>
      <OptionComponent option={s.primary} skipInfo={true} />
      <h2>{t("durationTitle")}</h2>
      <OptionComponent option={s.duration} skipInfo={true} />
      <h2>{t("secondaryTitle")}</h2>
      <p>{t("secondarySubtitle")}</p>
      {
        s.secondaries.map((o, i) => <OptionComponent option={o} skipInfo={true} key={i} />)
      }
      <h2>{t("specialTitle")}</h2>
      {
        s.specials.map((o, i) => <OptionComponent option={o} skipInfo={true} key={i} />)
      }

    </main>
  );
};
export default Builder;
