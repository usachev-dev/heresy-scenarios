import React, {FC, useContext} from "react";
import {Helmet} from "react-helmet";
import {LangDataStoreContext} from "./lang-data-store-context";

let H: FC = () => {
  let langDataStore = useContext(LangDataStoreContext)
  let l = langDataStore.langData
  let title = l["title"];
  let t: string;
  if (Array.isArray(title)) {
    t = title[0];
  } else {
    t = title;
  }
  return <Helmet defaultTitle={t}>
    <html lang={langDataStore.lang}/>
  </Helmet>
}
export default H;
