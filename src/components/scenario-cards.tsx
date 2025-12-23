import React, {FC, useContext} from "react";
import s from "./scenario-cards.module.scss";
import {ScenarioConditionData} from "../game/dataTypes";
import {LangDataStoreContext} from "./lang-data-store-context";
import {FiInfo as Info} from "react-icons/fi/index";


export let ScenarioCard: FC<{data: ScenarioConditionData}> = ({data}) => {
  let l = useContext(LangDataStoreContext);
  return <div className={s.scenarioCard}>
    <div className={s.category}>{l.t(data.category)}</div>
    <div className={s.title}>{l.localizedAsString(data.name)}</div>
    <div className={s.text}>{l.localizedAsString(data.text)}</div>
    {data.num == "bonus" ? <div className={s.bonus}>{l.t("bonus")}</div> : <></> }
    {data.num == "note" ? <div className={s.note}><Info /></div> : <></> }
    {Number.isInteger(data.num) ? <div className={s.num}>{data.num}</div> : <></> }

  </div>
}

export let ScenarioCardsGrid: FC<{cards: ScenarioConditionData[], nonSpaced?: boolean}> = ({cards, nonSpaced}) => {
  return <div className={`${s.scenarioCardsGrid} ${nonSpaced ? s.nonSpaced : ""}`}>
    {cards.map(c => <ScenarioCard data={c}/>)}
  </div>
}
