import React, { FC, useContext } from "react";
import Img from "../components/img";
import { Link } from "react-router-dom";
import { LangDataStoreContext } from "../components/lang-data-store-context";
import { URLSforFILES } from "../components/urls";
import Read from "./read";

const Home: FC = () => {
  let l = useContext(LangDataStoreContext);
  let t = (s: string): string => l.t(s);

  return (
    <>
      <div className="homepage-hero">
        <Img className={`img-bg`} src={"art/cover.jpg"} alt={t("title")} />
        <div className={`bg-darken`} />
        <div className="container">
          <div className="homepage-hero-content">
            <div className="home-text">
              <h1 className="homepage-title title">{t("title")}</h1>
              <p className="homepage-subtitle">{t("description")}</p>
              <div className={`home-buttons`}>
                <Link
                  to={l.linkToCurrentLang(`/read`)}
                  className={`button is-light is-medium`}
                >
                  {t("read")}
                </Link>
                <Link
                  to={l.linkToCurrentLang(`/build`)}
                  className={`button is-light is-medium`}
                >
                  {t("create")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Read />
    </>
  );
};
export default Home;
