import React, {FC, useContext} from "react";
import {observer} from "mobx-react-lite";
import {Army} from "../../game/army";
import s from "./army-builder-tabs.module.scss";
import {FiMinus as Minus, FiPlus as Plus, FiX as Cross} from "react-icons/fi/index";
import {LangDataStoreContext} from "../lang-data-store-context";

export const ArmyBuilderArmyTab: FC<{ army: Army }> = observer(({army}) => {
  let l = useContext(LangDataStoreContext)
  let t = (s: string): string => l.t(s)

  return <div className="container padded-mobile is-max-desktop">
    <div className={s.armyContainer}>
      <div className={s.armyColumn}>
        <ul className={s.choicesList}>
          {army.choicesSelectable.map(c => (
            <li onClick={_ => army.addChoice(c)} className={s.choiceItem} key={c.id}>
              <div><><Plus
                className={s.listIcon}/>{c.name}&nbsp;{c.type == "main" ? t("mainShort") : c.type === "elite" ? t("rareShort") : ""}</>
              </div>
              <div>{c.cost}&nbsp;pts</div>
            </li>))}
        </ul>

      </div>
      <div className={s.armyColumn}>
        <ul className={s.choicesList}>
          {army.selectedChoices.map(c => (
            <li className={s.choiceSelectedItem} key={c.choice.id}>
              <div className="aic">
                <button onClick={() => army.removeChoice(c.choice)}
                        className={`${s.choiceSelectedButton} ${s.choiceSelectedButtonDelete} button is-text `}>{
                  <Cross/>}</button>
                <div className={s.choiceSelectedItemText}>
                    <span><>{c.choice.name}&nbsp;&nbsp;x{c.count}</></span>&nbsp;
                    <strong>{c.choice.cost * c.count}&nbsp;pts</strong>
                </div>
              </div>

              <div className="aic">
                <button onClick={() => army.decrementChoice(c.choice)}
                        className={`${s.choiceSelectedButton} button is-text`}>{<Minus/>}</button>
                <button onClick={() => army.addChoice(c.choice)}
                        className={`${s.choiceSelectedButton} button is-text`}>{<Plus/>}</button>
              </div>

            </li>))}
        </ul>
      </div>
    </div>
  </div>
})
