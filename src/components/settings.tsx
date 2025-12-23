import React, {FC} from "react";
import {SettingsContext} from "./settings-context";
import {observer} from "mobx-react-lite";
import {SettingsStore} from "./settings-store";

const SettingsInner: FC<{ store: SettingsStore }> = observer(({store}) => {
  let setUWLength = (e: React.FormEvent) => {
    let value: string = (e.target as HTMLInputElement).value;
    let num: number = Number.parseInt(value, 10);
    store.setSettings({...store.settings, UWLength: num})
  }

  let onUWunitSelect = (e: React.FormEvent) => {
    let value: string = (e.target as HTMLSelectElement).value;
    store.setSettings({...store.settings, UWUnits: value})
  }

  let shouldConvert = store.settings.UWUnits != "UW" || store.settings.UWLength != 1;

  let toggleShouldConvert = (_: React.FormEvent) => {
    if (shouldConvert) {
      store.setSettings({...store.settings, UWUnits: "UW", UWLength: 1})
    } else {
      store.setSettings({...store.settings, UWUnits: "см", UWLength: 4})
    }
  }

  return <form onSubmit={(e) => {e.preventDefault()}}>
    <div className="field">
      <label className="checkbox">
        <input className="is-bold" type="checkbox" defaultChecked={shouldConvert} onInput={toggleShouldConvert}/>&nbsp;
          Переводить UW в единицы длины
      </label>
    </div>


    <div className={`field  ${shouldConvert ? '' : 'is-hidden'}`}>
      <div className="field-label">
        <label className="label tal">Ширина отряда</label>
      </div>

      <div className="field-body">
        <div className="field">
          <div className="control">
            <input min={1} className="input" type="number" placeholder="Name" value={store.settings.UWLength} onInput={setUWLength}/>
          </div>
        </div>
        <div className="field">
          <div className="control is-expanded">
            <div className="select">
              <select onInput={onUWunitSelect} value={store.settings.UWUnits}>
                <option value="см">сантиметров</option>
                <option value={`"`}>дюймов</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

  </form>
})

export const Settings: FC = observer(() => {
  return <SettingsContext.Consumer>{settingsStore => {
    return <SettingsInner store={settingsStore}></SettingsInner>
  }}</SettingsContext.Consumer>
})
