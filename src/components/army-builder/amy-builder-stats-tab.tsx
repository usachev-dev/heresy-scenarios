import React, {FC, useContext} from "react";
import {observer} from "mobx-react-lite";
import {Army} from "../../game/army";
import ChoiceComponent from "../choice";
import s from "./army-builder-tabs.module.scss";
import {LangDataStoreContext} from "../lang-data-store-context";
import {Localized} from "../../game/localized";

export const ArmyBuilderStatsTab: FC<{ army: Army }> = observer(({army}) => {
  let l = useContext(LangDataStoreContext)
  let t = (s: string): string => l.t(s)
  let as = (t: Localized): string => l.localizedAsString(t)

  return <div className="container padded-mobile is-max-desktop">
    <div className={s.statsGrid}>
      {
        army.selectedChoices.map(c => <ChoiceComponent key={c.choice.id} choice={c.choice} count={c.count}/>)
      }
    </div>
    <h3 className="has-text-weight-semibold is-size-4 mt-3 mb-2">{t("specialRules")}</h3>
    <div>
      {army.selectedSpecials.map(s => <p className="mb-1" key={s.id}>
        <strong><>{l.localizedAsString(s.name)}:</>
        </strong>&nbsp;<span>{l.localizedAsString(s.description)}</span>
      </p>)}
    </div>

    <h3 className="has-text-weight-semibold is-size-4 mt-3 mb-2">{t("assets")}</h3>
    {army.assetsSelected.map(asset => <div className="mb-1" key={asset.id}>
      <strong><>{asset.name}{asset.count > 1 ? ` x${asset.count}` : "" }:</></strong>&nbsp;<span>{as(asset.text)}</span>
    </div>)}
  </div>
})
