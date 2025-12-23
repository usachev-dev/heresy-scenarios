import React from "react";
import {SettingsStore} from "./settings-store";
import {makeAutoObservable} from "mobx";

export const SettingsContext = React.createContext<SettingsStore>(makeAutoObservable(new SettingsStore()));
