//@ts-ignore
import locales from "../assets/locales/locales.toml";
import { GameData, gameData } from "../game/data";
import { transform, trimEnd, cloneDeep } from "lodash-es";
//@ts-ignore
let host = HOST;
type Lang = "en" | "ru";

let langs: Lang[] = ["en", "ru"];
let defaultLang: Lang = "en";

function strToLang(s: string): Lang {
  switch (s) {
    case "ru":
      return "ru";
    case "en":
    default:
      return "en";
  }
}

function langDataFromLocales(lang: Lang): Record<string, string> {
  return Object.keys(locales).reduce(
    (acc, key, _) => ({ ...acc, [key]: locales[key][lang] }),
    {},
  );
}

export class LangDataStore {
  public lang: Lang = defaultLang;
  public langData: Record<string, string | string[]>;
  public gameData: GameData;

  constructor() {
    this.lang = defaultLang;
    this.langData = langDataFromLocales(defaultLang);
    this.gameData = new GameData();
  }

  setLang(lang: string) {
    let l = strToLang(lang);
    if (l === this.lang) {
      return;
    }
    this.lang = l;
    this.langData = langDataFromLocales(l);
  }

  get otherLangs(): Lang[] {
    return langs.filter((l) => l !== this.lang);
  }

  get langs(): Lang[] {
    return langs;
  }

  get defaultLang(): Lang {
    return defaultLang;
  }

  public t(key: string): string {
    let result = this.langData[key];
    if (!result) {
      return `ERROR: LOCALE ${key} NOT FOUND`;
    }
    if (Array.isArray(result)) {
      return result.length > 0 ? result[0] : "";
    }
    return result;
  }

  public tlist(key: string): string[] {
    let result = this.langData[key];
    if (!result) {
      return [`ERROR: LOCALE ${key} NOT FOUND`];
    }
    if (!Array.isArray(result)) {
      return [result];
    }
    return result;
  }

  langPrefix(): string {
    if (this.lang === "ru") {
      return "ru";
    }
    return "";
  }

  linkToLang(path: string, lang: Lang) {
    let prefix = {
      en: "",
      ru: "ru/",
    };
    let url = new URL(path, host);
    let fragments = url.pathname.split("/").filter((v) => !!v);
    if (fragments.length == 0) {
      url.pathname = trimEnd(`/${prefix[lang]}`, "/");
      return url.toString();
    }
    if (fragments[0] == "en" || fragments[0] == "ru") {
      fragments = fragments.slice(1, fragments.length);
    }
    url.pathname = trimEnd(`/${prefix[lang]}${fragments.join("/")}`, "/");
    return url.toString();
  }

  linkToCurrentLang(path: string): string {
    return this.linkToLang(path, this.lang);
  }

  linkToOtherLang(path: string): string {
    switch (this.lang) {
      case "ru":
        return this.linkToLang(path, "ru");
      case "en":
      default:
        return this.linkToLang(path, "en");
    }
  }
}
