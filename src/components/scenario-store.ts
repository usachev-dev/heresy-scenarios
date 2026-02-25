import {SavedScenario, Scenario} from "../game/scenario";

export let storage: {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
} =  window?.localStorage || {
  getItem(key: string): string {
    return ""
  },
  setItem(key: string, value: string) {},
  removeItem(key: string) {}
}

const idsKey = "savedArmyIds"

export class ScenarioStore {
  constructor(){}

  getSavedIds = (): string[] => {
    let result;
    let data = storage.getItem(idsKey) || "[]"
    try {
      result = JSON.parse(data)
    } catch(e) {throw new Error(`could not load army ids list: ${e}`)}
    return result;
  }

  setSavedIds = (ids: string[]) => {
    storage.setItem(idsKey, JSON.stringify(ids))
  }

  saveById = (item: Scenario, id: string) => {
    let str = item.stringify();
    storage.setItem(id, str)
    let ids = this.getSavedIds()
    if (!ids.find(i => i === id)) {
      ids.push(id)
      this.setSavedIds(ids)
    }
    this.saved = this.getSaved()
  }

  save = (item: Scenario) => {
    let id = item.id
    this.saveById(item, id.toString())
    this.saved = this.getSaved()
  }

  getOneSaved = (id: string): SavedScenario => {
    let str = storage.getItem(id) || ""
    let result: SavedScenario = JSON.parse(str)
    if (!result) {
      throw new Error(`could not load saved army`)
    }
    return result;
  }

  getSaved = (): SavedScenario[] => {
    let ids = this.getSavedIds()
    return ids.map(id => this.getOneSaved(id))
  }

  removeArmy = (id: string) => {
    storage.removeItem(id)
    let ids = this.getSavedIds()
    ids = ids.filter(i => i !== id)
    this.setSavedIds(ids)
    this.saved = this.getSaved()
  }

  public saved = this.getSaved();
}
