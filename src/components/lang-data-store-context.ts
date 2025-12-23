import React from "react";
import {LangDataStore} from "./lang-data-store";
import {makeAutoObservable} from "mobx";

export const LangDataStoreContext = React.createContext<LangDataStore>(makeAutoObservable(new LangDataStore()));
