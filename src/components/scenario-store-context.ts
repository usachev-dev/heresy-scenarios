import React from "react";
import {ScenarioStore} from "./scenario-store";
import {makeAutoObservable} from "mobx";

export const ScenarioStoreContext = React.createContext<ScenarioStore>(makeAutoObservable(new ScenarioStore()));
