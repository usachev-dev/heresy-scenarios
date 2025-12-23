import React, {FC, useContext} from "react";
import {observer} from "mobx-react-lite";
import {Army} from "../../game/army";
import s from "./army-builder-tabs.module.scss";
import {FiPlus as Plus, FiX as Cross} from "react-icons/fi/index";
import {Localized} from "../../game/localized";
import {LangDataStoreContext} from "../lang-data-store-context";

export const ArmyBuilderAssetsTab: FC<{ army: Army }> = observer(({army}) => {
  let l = useContext(LangDataStoreContext);
  let t = (s: string): string => l.t(s);
  let as = (v: Localized) => l.localizedAsString(v);

  return <div className="container padded-mobile is-max-desktop">
    <div className={s.armyContainer}>
      <div className={s.armyColumn}>
        <ul className={s.choicesList}>
          {army.assetsSelectable.map((asset, index) => (
            <li onClick={_ => army.addAsset(asset.id)} className={s.choiceItem} key={index}>
              <div><><Plus className={s.listIcon}/>{as(asset.name)}</></div>
              <div>{asset.cost}&nbsp;pts</div>
            </li>))}
        </ul>

      </div>
      <div className={s.armyColumn}>
        <ul className={s.choicesList}>
          {army.assetsSelected.map((asset, index) => (
            <li className={`${s.choiceSelectedItem} fdc aifs`} key={index}>
              <div className="aic">
                <button onClick={() => army.removeAsset(asset.id)}
                        className={`${s.choiceSelectedButton} ${s.choiceSelectedButtonDelete} button is-text `}>{
                  <Cross/>}</button>
                <div className={s.choiceSelectedItemText}>
                  <span><>{asset.name}&nbsp;&nbsp;{army.assetsIdsSelected[asset.id] > 1 ? `x${army.assetsIdsSelected[asset.id]}` : ""}</></span>&nbsp;
                  <strong>{asset.cost * army.assetsIdsSelected[asset.id]}&nbsp;pts</strong>
                </div>
              </div>
              <div className={`${s.assetSelectedItemText}`}>
                {as(asset.text)}
              </div>
            </li>))}
        </ul>
      </div>
    </div>
  </div>
})
