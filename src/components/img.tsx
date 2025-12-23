import React, {FC} from "react";
import images from "./images";
import {trim} from "lodash-es";

const Img: FC<{ src?: string, alt?: string, style?: any, maxRes?: number, className?: string, source?: string }> = ({src, alt, style, maxRes, className, source}) => {
  src = src || source || "";
  src = trim(src)
  let srcset;
  style = style || {};
  className = className || "";
  try {
    srcset = srcsetToMaxSrcset(images[src].srcset, maxRes);
  } catch(e) {
    throw new Error(`could not get srcset for ${src}: ${e}`)
  }

  return <img src={images[src].fallback}
              alt={alt}
              style={style}
              className={className}
              srcSet={srcset}/>
}

export default Img;

function srcsetToMaxSrcset(srcset: string, maxRes?: number): string {
  if (!maxRes) {
    return srcset;
  }
  let result = "";
  let split = srcset.split(",")
  split.forEach(value => {
    let halves: string[] = value.trim().split(" ");
    if (!halves || halves.length < 2) {
      return
    }
    let width = halves[1].slice(0, -1)
    let widthNum = Number.parseInt(width)
    if (Number.isNaN(widthNum) || !widthNum) {
      return
    }
    if (widthNum > maxRes) {
      return
    }
    result = result + `${halves[0]} ${halves[1]},`;
  })
  result = result.slice(0, -1)
  return result;
}
