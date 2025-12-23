import React, {FC, useContext} from "react";
import {Outlet, useParams} from "react-router"
import {LangDataStore} from "./lang-data-store";
import {LangDataStoreContext} from "./lang-data-store-context";

let LangSelector: FC = () => {
  let langDataStore: LangDataStore = useContext(LangDataStoreContext)
  let params = useParams()
  let lang = params['lang'];
  langDataStore.setLang(lang || "");
  return <Outlet />
}

export default LangSelector;
