import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import Navbar from "./components/navbar";
import { ArmyStoreContext } from "./components/army-builder/army-store-context";
import { SettingsContext } from "./components/settings-context";
import { ArmyStore } from "./components/army-builder/army-store";
import { makeAutoObservable } from "mobx";
import { SettingsStore } from "./components/settings-store";
import LangSelector from "./components/lang-selector";
import { LangDataStoreContext } from "./components/lang-data-store-context";
import { LangDataStore } from "./components/lang-data-store";
import Helmet from "./components/helmet";

let baseUrl = import.meta.env.BASE_URL;
console.log("baseUrl is", baseUrl);

const app: FC = () => (
  <LangDataStoreContext.Provider
    value={makeAutoObservable(new LangDataStore())}
  >
    <SettingsContext.Provider value={makeAutoObservable(new SettingsStore())}>
      <ArmyStoreContext.Provider value={makeAutoObservable(new ArmyStore())}>
        <Routes>
          {[":lang", ""].map((prefix) => (
            <Route
              key={prefix}
              path={prefix}
              element={
                <>
                  <LangSelector />
                  <Helmet />
                  <Navbar />
                </>
              }
            >
              <Route path={``} element={<Home />} />
            </Route>
          ))}
        </Routes>
      </ArmyStoreContext.Provider>
    </SettingsContext.Provider>
  </LangDataStoreContext.Provider>
);

export default app;
