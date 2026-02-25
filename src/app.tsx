import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./routes/home";
import Scenarios from "./routes/scenarios";
import Scenario from "./routes/scenario";
import {NewScenario} from "./routes/new";
import Read from "./routes/read";
import Navbar from "./components/navbar";
import {makeAutoObservable} from "mobx";
import LangSelector from "./components/lang-selector";
import {LangDataStoreContext} from "./components/lang-data-store-context";
import {LangDataStore} from "./components/lang-data-store";
import Helmet from "./components/helmet";
import {ScenarioStoreContext} from "./components/scenario-store-context";
import {ScenarioStore} from "./components/scenario-store";
import {RandomScenario} from "./routes/random";

let baseUrl = import.meta.env.BASE_URL;

const app: FC = () => (
  <LangDataStoreContext.Provider
    value={makeAutoObservable(new LangDataStore())}
  >
    <ScenarioStoreContext.Provider value={makeAutoObservable(new ScenarioStore())}>
      <Routes>
        {[":lang", ""].map((prefix) => (
          <Route
            key={prefix}
            path={prefix}
            element={
              <>
                <LangSelector/>
                <Helmet/>
                <Navbar/>
              </>
            }
          >
            <Route path={``} element={<Home/>}/>
            <Route path={`scenarios`} element={<Scenarios/>}/>
            <Route path={`random`} element={<RandomScenario/>}/>
            <Route path={`new`} element={<NewScenario/>}/>
            <Route path={`scenario`} element={<Scenario/>}/>
            <Route path={`read`} element={<Read/>}/>
          </Route>
        ))}
      </Routes>
    </ScenarioStoreContext.Provider>
  </LangDataStoreContext.Provider>
);

export default app;
