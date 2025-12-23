import {Army, SavedArmy} from "../../game/army";
import {storage} from "../storage";

const idsKey = "savedArmyIds"

export class ArmyStore {
  constructor(){}

  getSavedArmyIds = (): string[] => {
    let result;
    let data = storage.getItem(idsKey) || "[]"
    try {
      result = JSON.parse(data)
    } catch(e) {throw new Error(`could not load army ids list: ${e}`)}
    return result;
  }

  setSavedArmyIds = (ids: string[]) => {
    storage.setItem(idsKey, JSON.stringify(ids))
  }

  saveArmyById = (army: Army, id: string) => {
    let str = army.stringify();
    storage.setItem(id, str)
    let ids = this.getSavedArmyIds()
    if (!ids.find(i => i === id)) {
      ids.push(id)
      this.setSavedArmyIds(ids)
    }
    this.savedArmies = this.getSavedArmies()
  }

  saveArmy = (army: Army) => {
    let id = army.id
    this.saveArmyById(army, id)
    this.savedArmies = this.getSavedArmies()
  }

  getSavedArmy = (id: string): SavedArmy => {
    let str = storage.getItem(id) || ""
    let result: SavedArmy = JSON.parse(str)
    if (!result) {
      throw new Error(`could not load saved army`)
    }
    return result;
  }

  getSavedArmies = (): SavedArmy[] => {
    let ids = this.getSavedArmyIds()
    return ids.map(id => this.getSavedArmy(id))
  }

  removeArmy = (id: string) => {
    storage.removeItem(id)
    let ids = this.getSavedArmyIds()
    ids = ids.filter(i => i !== id)
    this.setSavedArmyIds(ids)
    this.savedArmies = this.getSavedArmies()
  }

  public savedArmies = this.getSavedArmies();
}
