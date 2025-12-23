import React, {FC} from "react";
import {observer} from "mobx-react-lite";
import {Army} from "../../game/army";
import {ArmyBuilderStatsTab} from "./amy-builder-stats-tab";

export const ArmyBuilderArmyView: FC<{ army: Army }> = observer(({army}) => {
  return <ArmyBuilderStatsTab army={army} />
})
