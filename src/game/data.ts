//@ts-ignore
import Deployment from "./data/deployment.toml";
//@ts-ignore
import Primary from "./data/primary.toml";
//@ts-ignore
import Duration from "./data/duration.toml";
//@ts-ignore
import Special from "./data/special.toml";
//@ts-ignore
import Secondary from "./data/secondary.toml";
import {cloneDeep, isEqual, sortBy, shuffle} from "lodash-es";

type Localized = {
  en: string;
  ru: string;
} | string;

function isLocalized(obj: any): boolean {
  return obj && typeof obj.en === "string" && typeof obj.ru === "string";
}

function localizedToString(loc: Localized, lang: "ru" | "en"): string {
  return lang === "ru" ? (loc as any)["ru"] : (loc as any)["en"];
}

function objectRemoveLocalized(object: any, lang: "ru" | "en"): any {
  let obj = cloneDeep(object);
  if (!!obj["rolls"]) {
    obj.rollsText = rollsToText(obj["rolls"], lang)
  } else {
    obj.rollsText = "";
  }
  Object.keys(obj).forEach((key) => {
    if (isLocalized(obj[key])) {
      obj[key] = localizedToString(obj[key], lang);
    }
  });

  return obj;
}

function ensureOption(v: unknown): OptionLocalized {
  let result: OptionLocalized = {
    id: 0,
    image: "",
    rolls: [],
    title: { en: "", ru: "" },
    text: { en: "", ru: "" },
  };

  if (typeof v === "object" && !!v) {
    let val = v as any
    let id = result.id
    if (typeof val["id"] === "number") {
      id = val["id"]
    }
    result = {
      id: id,
      image: val["image"] || result.image,
      rolls:val["rolls"] || result.rolls,
      title: val["title"] || result.title,
      text: val["text"] || result.text,
    };
  }

  return result;
}

function ensureOptions(v: unknown): OptionLocalized[] {
  let result: OptionLocalized[] = [];

  if (Array.isArray(v)) {
    result = v.map(ensureOption);
  }

  return result;
}

export interface OptionLocalized {
  id: number;
  image?: string;
  rolls: number[];
  title: Localized;
  text?: Localized;
}

export interface GameDataLocalized {
  deploymentTypes: OptionLocalized[],
  primaryObjectives: OptionLocalized[],
  secondaryObjectives: OptionLocalized[],
  duration: OptionLocalized[],
  special: OptionLocalized[],
}

export interface Option {
  id: number;
  image?: string;
  rolls: number[];
  rollsText: string;
  title: string;
  text: string;
}

export interface GameData {
  deploymentTypes: Option[],
  primaryObjectives: Option[],
  secondaryObjectives: Option[],
  duration: Option[],
  special: Option[],
}

export function rollsToText(rolls: number[], lang: "en" | "ru"): string {
  if (isEqual([1,2,3,4,5,6], rolls)) {
    return lang == "en" ? "Auto" : "Автоматически"
  }

  if (isEqual([5,6], rolls)) {
    return "⚄+"
  }
  if (isEqual([4,5,6], rolls)) {
    return "⚃+"
  }
  if (isEqual([3,4,5,6], rolls)) {
    return "⚂+"
  }
  if (isEqual([2,3,4,5,6], rolls)) {
    return "⚁+"
  }
  return rolls.map(d => {
    switch (d) {
      case 1:
        return "⚀";
      case 2:
        return "⚁";
      case 3:
        return "⚂";
      case 4:
        return "⚃";
      case 5:
        return "⚄";
      case 6:
        return "⚅";
      default:
        return "⚀"
    }
  }).join(" ")

}


export class GameDataStore {
  private _gameData: GameDataLocalized;
  constructor() {
    this._gameData = {
      deploymentTypes: sortBy(ensureOptions(Deployment.deployment), o => o.id),
      primaryObjectives: sortBy(ensureOptions(Primary.primary), o => o.id),
      duration: sortBy(ensureOptions(Duration.duration), o => o.id),
      secondaryObjectives: sortBy(ensureOptions(Secondary.secondary), o => o.id),
      special: sortBy(ensureOptions(Special.special), o => o.id),
    };
  }

  localized(lang: "ru" | "en"): GameData {
    return {
      deploymentTypes: this._gameData.deploymentTypes.map(o => objectRemoveLocalized(o, lang)),
      primaryObjectives: this._gameData.primaryObjectives.map(o => objectRemoveLocalized(o, lang)),
      secondaryObjectives: this._gameData.secondaryObjectives.map(o => objectRemoveLocalized(o, lang)),
      duration: this._gameData.duration.map(o => objectRemoveLocalized(o, lang)),
      special: this._gameData.special.map(o => objectRemoveLocalized(o, lang)),
    };
  }
}
