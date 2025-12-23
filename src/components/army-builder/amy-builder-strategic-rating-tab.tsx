import React, {FC, useContext} from "react";
import {observer} from "mobx-react-lite";
import {Army} from "../../game/army";
import {LangDataStoreContext} from "../lang-data-store-context";

export const ArmyBuilderStrategicRatingTab: FC<{ army: Army }> = observer(({army}) => {
  let l = useContext(LangDataStoreContext)

  return <div className="container padded-mobile is-max-desktop">
    {army.strategicRatingFull.elements.map((el, i) => <p className={`mb-2`} key={i}>
      <b>{el.value < 0 ? "" : "+"}{el.value}</b>: {l.t(el.explain)}
    </p>)}
  </div>
})
