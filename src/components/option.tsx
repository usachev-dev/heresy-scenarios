import React, {FC} from "react";
import {Option} from "../game/data";
import Img from "./img";

export const OptionComponent: FC<{option: Option, skipInfo?: boolean}> = ({option, skipInfo}) => {
  return <div>
    <h5>{skipInfo ? <></> : <>{option.id}.&nbsp;</>}{option.title}{skipInfo ? <></> : <>:&nbsp;{option.rollsText}</>}</h5>
    {option.image ? <Img src={option.image} /> : <></>}
    <p>{option.text}</p>
  </div>
}
