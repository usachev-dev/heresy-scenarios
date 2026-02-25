import React, {FC, useContext} from "react";
import {observer} from "mobx-react-lite";
import {newScenario} from "../game/scenario";
import {useParams} from "react-router";
import {ScenarioStoreContext} from "../components/scenario-store-context";
import {Navigate, createSearchParams} from "react-router-dom";
import {LangDataStoreContext} from "../components/lang-data-store-context";

export const NewScenario: FC = observer(() => {
  let l = useContext(LangDataStoreContext)
  let gameData = l.gameData;

  let params = useParams()
  let dataId = params['dataId'];
  if (!dataId) {
    throw new Error(`dataId route param not found, cannot create army`)
  }

  let scenario = newScenario(gameData)
  let store = useContext(ScenarioStoreContext)
  store.save(scenario)
  return  <Navigate to={`${l.lang === "ru" ? "/ru" : ""}/scenarios/${scenario.id}`} replace={true}/>


})
