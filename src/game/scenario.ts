import {GameData, Option} from "./data";
import {isFinite, isNumber, shuffle, uniqBy, includes, uniq} from "lodash-es";

export interface SavedScenario {
  id?: number;
  name?: string;
  d: number,
  p: number,
  s: number[],
  du: number,
  sp: number[],
}

export function newSavedScenario(): SavedScenario {
  return {
    id: Date.now(),
    name: "Новый сценарий",
    d: 1,
    p: 1,
    du: 1,
    s: [1,2,3],
    sp: [1,2,3],
  }
}

export function savedScenarioToUrlParams(s: SavedScenario): URLSearchParams {
  let p = new URLSearchParams();
  if (!!s.id) {
    p.append("id", s.id.toString());
  }
  p.append("d", s.d.toString());
  p.append("p", s.p.toString());
  p.append("du", s.du.toString());
  s.sp.forEach(v => {
    p.append("sp[]", v.toString());
  });
  s.s.forEach(v => {
    p.append("s[]", v.toString());
  });

  return p;
}

export function URLParamsToSavedScenario(params: URLSearchParams): SavedScenario {
  let dParam = params.get("d") || "1";
  let pParam = params.get("p") || "1";
  let duParam = params.get("du") || "1";
  let sParam = params.getAll("s") || ["1"];
  let spParam = params.getAll("sp") || ["1"];

  console.log(params)
  console.log(params.getAll("s"))

  return {
    d: Number.parseInt(dParam),
    p: Number.parseInt(pParam),
    du: Number.parseInt(duParam),
    s: sParam.map(v => Number.parseInt(v)),
    sp: spParam.map(v => Number.parseInt(v)),
  }
}

export function newScenario(gameData: GameData): Scenario {
  return new Scenario(gameData, newSavedScenario())
}

export function randomScenario(gameData: GameData): Scenario {
  let s = new Scenario(gameData, newSavedScenario());
  s.randomize();
  return s;
}

export class Scenario {
  constructor(private gameData: GameData, private saved: SavedScenario) {
    console.log('saved', saved)
    this.id = saved.id || Date.now();
    this.name = saved.name || "Новый сценарий";
    this.deployment = gameData.deploymentTypes.find(dt => dt.id === saved.d) || gameData.deploymentTypes[0];
    this.primary = gameData.primaryObjectives.find(dt => dt.id === saved.d) || gameData.primaryObjectives[0];
    this.duration = gameData.duration.find(dt => dt.id === saved.d) || gameData.duration[0];
    //@ts-ignore
    this.secondaries = uniqBy(saved.s.map((id, index) => gameData.secondaryObjectives.find(dt => dt.id === id)), o => o.id)
    //@ts-ignore
    this.specials = uniqBy(saved.sp.map((id, index) => gameData.special.find(dt => dt.id === id)), o => o.id);
    console.log('getSaved', this.getSaved())
  }

  id: number;
  name: string;
  deployment: Option;
  primary: Option;
  duration: Option;
  secondaries: Option[];
  specials: Option[];

  getSaved(): SavedScenario {
    return {
      d: this.deployment.id,
      p: this.primary.id,
      s: this.secondaries.map(o => o.id),
      du: this.duration.id,
      sp: this.specials.map(o => o.id),
    }
  }

  getSavedParam(): Record<string, string | string[]> {
    return {
      id: this.id.toString(),
      d: this.deployment.id.toString(),
      p: this.primary.id.toString(),
      du: this.duration.id.toString(),
      s: this.secondaries.map(o => o.id.toString()),
      sp: this.specials.map(o => o.id.toString()),
    }
  }

  stringify(): string {
    return JSON.stringify(this.getSaved())
  };


  getUrlParams(): string {
    return savedScenarioToUrlParams(this.getSaved()).toString();
  }

  getUrlParamsString(): string {
    return savedScenarioToUrlParams(this.getSaved()).toString();
  }

  randomize() {
    let depRoll = d6();
    let primRoll = d6();
    let durRoll = d6();
    this.deployment = this.gameData.deploymentTypes.find(d => includes(d.rolls, depRoll)) || this.deployment;
    this.primary = this.gameData.deploymentTypes.find(d => includes(d.rolls, primRoll)) || this.deployment;
    this.duration = this.gameData.deploymentTypes.find(d => includes(d.rolls, durRoll)) || this.deployment;

    this.secondaries = fillUpTo(d3() + d3(), shuffleWithSomeStuck(this.gameData.secondaryObjectives, 3));
    this.specials = fillUpTo(d3() + d3(), shuffleWithSomeStuck(this.gameData.special, 3));
  }

}

function d6(): number {
  return Math.floor(Math.random() * 6) + 1;
}

function d3(): number {
  return Math.floor(Math.random() * 3) + 1;
}

function shuffleWithSomeStuck<T>(ar: T[], stuck: number): T[] {
  return [...ar.slice(0, stuck), ...shuffle(ar.slice(stuck, ar.length))]
}

function fillUpTo(num: number, deck: Option[]): Option[] {
  let result: Option[] = [];
  let i = 0;
  while (result.length < num) {
    if (includes(deck[i].rolls, d6())) {
      result.push(deck[i]);
      deck.splice(i, 1);
    } else {
      if (i < deck.length - 1) {
        i++;
      } else {
        i = 0;
      }
    }
  }
  return result;
}
