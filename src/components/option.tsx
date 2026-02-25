import React, {FC} from "react";
import {Option} from "../game/data";
import Img from "./img";

export const OptionComponent: FC<{option: Option, skipInfo?: boolean}> = ({option, skipInfo}) => {
  return <div key={option.id}>
    <h5>{skipInfo ? <></> : <>{option.id}.&nbsp;</>}{option.title}{skipInfo ? <></> : <>:&nbsp;{option.rollsText}</>}</h5>
    {option.image ? <Img src={option.image} style={{maxWidth: 800}}/> : <></>}
    <p>{option.text}</p>
  </div>
}
