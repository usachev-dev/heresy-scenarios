import React, {FC} from "react";
import {observer} from "mobx-react-lite";
import {Army} from "../../game/army";
import BoardComponent from "../board";

export const ArmyBuilderBoardTab: FC<{ army: Army }> = observer(({army}) => {
  return <div className="container padded-mobile is-max-desktop"><BoardComponent armyId={army.dataId} board={army.board} commandRadius={army.commandRadius}/> </div>
})
