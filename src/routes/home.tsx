import React, { FC, useContext } from "react";
import Img from "../components/img";
import { Link } from "react-router-dom";
import { LangDataStoreContext } from "../components/lang-data-store-context";
import { URLSforFILES } from "../components/urls";

const Home: FC = () => {
  let l = useContext(LangDataStoreContext);
  let t = (s: string): string => l.t(s);

  return (
    <>
      <div className="homepage-hero">
        <Img
          className={`img-bg is-hidden-tablet`}
          src={"art/zjLdyhyKlL0.jpg"}
          alt={t("title")}
        />
        <Img
          className={`img-bg is-hidden-mobile`}
          src={"art/zjLdyhyKlL0.jpg"}
          alt={t("title")}
        />
        <div className="container is-max-desktop">
          <div className="homepage-hero-content">
            <div className="home-text">
              <h1 className="homepage-title">
                <img className="homepage-hero-text-logo" alt={t("title")} />
                <div>{t("title")}</div>
              </h1>
              <p className="subtitle">{t("homeSubtitle")}</p>
              <div className={`home-buttons`}>
                <Link
                  target="_blank"
                  to={URLSforFILES.rules[l.lang]}
                  className={`button is-primary is-medium`}
                >
                  {t("rules")}
                </Link>
                <Link
                  to={l.linkToCurrentLang(`/armies`)}
                  className={`button is-light is-medium`}
                >
                  {t("armies")}
                </Link>
                <Link
                  to={l.linkToCurrentLang(`/download`)}
                  className={`button is-light is-medium mobile-only`}
                >
                  {t("download")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className={`adv-section`}>
        <div className={`market-text-container`}>
          <h2 className={`market-title title mb-4`}>{t("about")}</h2>
          <p className="mb-3">
            <strong>{t("aboutContent")}</strong>
          </p>
          <ul className="ml-5 pointed-list">
            {l.tlist("advantages").map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
export default Home;
