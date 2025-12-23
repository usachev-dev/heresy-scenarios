import React from "react";
import {ArmyStore} from "./army-store";
import {makeAutoObservable} from "mobx";

export const ArmyStoreContext = React.createContext<ArmyStore>(makeAutoObservable(new ArmyStore()));
