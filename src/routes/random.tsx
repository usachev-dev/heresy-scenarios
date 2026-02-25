import React, {FC, useContext} from "react";
import {observer} from "mobx-react-lite";
import {randomScenario} from "../game/scenario";
import {useParams} from "react-router";
import {Navigate, createSearchParams, useSearchParams} from "react-router-dom";
import {LangDataStoreContext} from "../components/lang-data-store-context";

export const RandomScenario: FC = observer(() => {
  let l = useContext(LangDataStoreContext)
  let gameData = l.gameData;
  let params = useParams()

  let scenario = randomScenario(gameData)
  // return  <Navigate to={`${l.lang === "ru" ? "/ru" : ""}/scenario${scenario.getUrlParamsString()}`} replace={true}/>
  return  <Navigate to={{
    pathname: `${l.lang === "ru" ? "/ru" : ""}/scenario`,
    search: `?${createSearchParams(scenario.getSavedParam())}`
  }} replace={true}/>

  // createSearchParams(scenario.getSavedParam()).toString()
})
