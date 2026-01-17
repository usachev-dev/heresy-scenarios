import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import Builder from "./routes/buid";
import Navbar from "./components/navbar";
import { makeAutoObservable } from "mobx";
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
          <Route path={`build`} element={<Builder />} />
        </Route>
      ))}
    </Routes>
  </LangDataStoreContext.Provider>
);

export default app;
