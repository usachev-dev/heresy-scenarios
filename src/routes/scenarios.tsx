import React, { FC, useContext } from "react";
import Img from "../components/img";
import { LangDataStoreContext } from "../components/lang-data-store-context";
import { URLSforFILES } from "../components/urls";

const Builder: FC = () => {
  let l = useContext(LangDataStoreContext);
  let t = (s: string): string => l.t(s);

  return (
    <main className="container main container">

    </main>
  );
};
export default Builder;
