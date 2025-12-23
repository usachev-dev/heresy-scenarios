import React, {FC, useContext} from "react";
import {Unit} from "../game/unit";
import s from "./unit.module.scss";
import {Special} from "../game/dataTypes";
import {LangDataStoreContext} from "./lang-data-store-context";
import {Localized} from "../game/localized";
import swords from "../assets/images/icons/swords.svg?url"
import guns from "../assets/images/icons/guns.svg?url"
import gun from "../assets/images/icons/gun.svg?url"
import flag from "../assets/images/icons/flag.svg?url"
import shield from "../assets/images/icons/shield.svg?url"
import cannon from "../assets/images/icons/cannon.svg?url"
import boot from "../assets/images/icons/boot.svg?url"

let UnitComponent: FC<{ unit: Unit, label?: string, cost?: number, subtitle?: string, count?: number }> = (props) => {
  let l = useContext(LangDataStoreContext);
  let t = (s: string): string => l.t(s);
  let as = (v: Localized) => l.localizedAsString(v);

  let unit = props.unit;
  let label = props.label || unit.name;
  let cost = props.cost || unit.cost;

  let specials = specialsToString(unit.special)
  let count = props.count || 0;

  return <div className={s.unitBox}>
    <div className={s.unitNameRow}>
      <div>
        {count ? <span>{count}х&nbsp;</span> : <></>}
        <span className="b">{as(label)}</span>&nbsp;<span>{props.subtitle}</span></div>
      <div><span className="b">{cost}</span>pts</div>
    </div>
    <div className={s.unitBody}>
      <div className={s.unitStatsRow}>
        <div className={s.unitStatBlock}>
          <div className={s.unitStat} style={{marginLeft: 0}}>
            <img className={s.unitStatIcon} src={swords}/>
            {unit.cc}
          </div>
          {
            unit.strength[1] ?
              <>
                <div className={s.unitStat}>
                  <img className={s.unitStatIcon} src={guns} style={{marginRight: 0}}/>
                  {unit.strength[1]}
                </div>
              </> : <></>
          }
          {
            unit.strength[2] ?
              <>
                <div className={s.unitStat}>
                  <img className={s.unitStatIcon} src={gun} style={{marginRight: 0}}/>
                  {unit.strength[2]}
                </div>
              </> : <></>
          }
        </div>
        <div className={s.unitStatBlock}>

          <div className={s.unitStat}>
            <img className={s.unitStatIcon} src={boot}/>
            {unit.move}/{unit.reform}
          </div>
          {
            unit.morale ?
              <>
                <div className={s.unitStat}>
                  <img className={s.unitStatIcon} src={flag}/>
                  {unit.morale}&nbsp;(-{unit.loss})
                </div>
              </> : <></>
          }

          {
            unit.bombStr ?
              <>
                <div className={s.unitStat}>
                  <img className={s.unitStatIcon} src={cannon}/>
                  {unit.bombStr}
                </div>
              </> : <></>
          }
          <div className={s.unitStat}>
            <img className={s.unitStatIcon} src={shield} style={{marginRight: 7}}/>
            {unit.discipline}+
          </div>
        </div>
      </div>
      <div className={s.unitSpecial}>
        <span className="b">{t("specialRules")}:</span>&nbsp;{specials}
      </div>

    </div>

  </div>
}

function specialsToString(specials: Special[]): string {
  if (!Array.isArray(specials) || specials.length == 0) {
    return ""
  }

  let str = specials.reduce((acc, next) => `${acc}, ${next.name}`, ``)
  return str.slice(2)
}

export default UnitComponent
