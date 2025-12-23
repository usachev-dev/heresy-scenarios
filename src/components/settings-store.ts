import {storage} from "./storage";

let settingsKey = "settings"

interface Settings {
  UWLength: number;
  UWUnits: string;
}

function nilSettings(): Settings {
  return {UWLength: 1, UWUnits: "UW"}
}

export class SettingsStore {
  public settings: Settings = this.getSettings();
  constructor() {
    this.settings = this.getSettings();
  }

  getSettings(): Settings {
    let str = storage.getItem(settingsKey);
    if (!str) {
      return nilSettings();
    }
    let settings: Settings;
    try {
      settings = JSON.parse(str)
    } catch (e) {
      console.error('could not get settings from storage: ', e);
      return nilSettings()
    }
    return {...nilSettings(), ...settings}
  }

  saveSettings(s: Settings) {
    storage.setItem(settingsKey, JSON.stringify(s))
  }

  setSettings(s: Settings) {
    this.settings = s;
    this.saveSettings(s)
  }

}
