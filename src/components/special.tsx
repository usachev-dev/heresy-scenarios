import React, {FC, useContext} from "react";
import {Special} from "../game/dataTypes";
import {LangDataStoreContext} from "./lang-data-store-context";
import {Localized} from "../game/localized";

let SpecialComponent: FC<{ special: Special }> = ({special}) => {
  let l = useContext(LangDataStoreContext)
  let as = (v: Localized) => l.localizedAsString(v);

  return <div>
    <b><dfn>
      {as(special.name)}
    </dfn>:</b> {as(special.description)}
  </div>
}

export default SpecialComponent
