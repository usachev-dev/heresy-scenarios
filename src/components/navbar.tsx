import React, { FC, useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FiSettings as SettingsIcon } from "react-icons/fi/index";
import { Settings } from "./settings";
import { LangDataStoreContext } from "./lang-data-store-context";
import { trimEnd } from "lodash-es";
import { URLSforFILES } from "./urls";

const Navbar: FC = () => {
  let l = useContext(LangDataStoreContext);
  let t = (s: string): string => l.t(s);

  const [scrollTop, setScrollTop] = useState(0);

  let isAtTop = scrollTop === 0;

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  let [menuOpen, setMenuOpen] = useState(false);
  let toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  let [langOpen, setLangOpen] = useState(false);
  let toggleLangOpen = () => {
    setLangOpen(!langOpen);
  };

  let [showSettings, setShowSettings] = useState(false);
  let toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  let openSettings = () => {
    setShowSettings(true);
  };
  let closeSettings = () => {
    setShowSettings(false);
  };

  let langDataStore = useContext(LangDataStoreContext);
  let location = useLocation();
  let path = location.pathname.replace("//", "/");
  let params = useParams();
  let langParam = params["lang"] || "";
  let isHome =
    path === "/" ||
    (langParam === "en" && trimEnd(path, "/") === "/en") ||
    (langParam === "ru" && trimEnd(path, "/") === "/ru");
  let isNavbarTransparent = isHome && isAtTop;
  let langLinks = langDataStore.otherLangs.reduce(
    (acc: Record<string, string>, lang, _) => {
      return {
        ...acc,
        [lang]: l.linkToLang(path, lang),
      };
    },
    {},
  );

  let isRules = new RegExp("/rules.*").test(path);
  let isDownload = new RegExp("/download.*").test(path);
  let isArmies = new RegExp("/armies.*").test(path);
  let isScenarios = new RegExp("/scenarios.*").test(path);
  let langChange = () => (
    <>
      <div onClick={toggleLangOpen} className="navbar-lang-content">
        {langDataStore.lang}&nbsp;<span style={{ fontSize: "0.7em" }}>▼</span>
      </div>
      <div className={`navbar-lang-menu ${langOpen ? "" : "is-hidden"}`}>
        {langDataStore.otherLangs.map((other) => (
          <a
            href={langLinks[other]}
            onClick={() => setLangOpen(false)}
            key={other}
            className="navbar-lang-menu-item"
          >
            {other}
          </a>
        ))}
      </div>
    </>
  );

  return (
    <>
      <nav
        className={`navbar ${isNavbarTransparent ? "navbar-transparent" : "is-primary"}`}
      >
        <div
          className="container is-max-desktop"
          style={{ overflow: "visible" }}
        >
          <div className={`navbar-brand `}>
            <div></div>
            <div
              className={`aic navbar-brand-logo ${isNavbarTransparent ? "navbar-brand-logo-hidden" : ""}`}
            >
              <Link
                to={l.linkToCurrentLang("/")}
                className={`aic navbar-logo-link`}
              >
                <img className="navbar-logo-img" alt={t("title")} />
              </Link>
            </div>
            <div className="navbar-item navbar-lang mobile-only">
              {langChange()}
            </div>
            <a
              role="button"
              onClick={toggleMenu}
              className={`navbar-burger ${menuOpen ? "is-active" : ""}`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu ${menuOpen ? "is-active" : ""}`}>
            <div className={`navbar-start`}>
              <Link
                target="_blank"
                onClick={() => setMenuOpen(false)}
                className={`navbar-item  ${isDownload ? "is-active" : ""}`}
                to={l.linkToCurrentLang("/rules")}
              >
                {t("rules")}
              </Link>
              {/* <Link onClick={() => setMenuOpen(false)} className={`navbar-item  ${isDownload ? 'is-active' : ''}`}*/}
              {/*      to={l.linkToCurrentLang("/download")}>*/}
              {/*  {t("download")}*/}
              {/*</Link>*/}
              <Link
                onClick={() => setMenuOpen(false)}
                className={`navbar-item ${isArmies ? "is-active" : ""}`}
                to={l.linkToCurrentLang("/armies")}
              >
                {t("armies")}
              </Link>
              <Link
                onClick={() => setMenuOpen(false)}
                className={`navbar-item ${isScenarios ? "is-active" : ""}`}
                to={l.linkToCurrentLang("/scenarios")}
              >
                {t("scenarios")}
              </Link>
              <div className="navbar-item navbar-lang desktop-only">
                {langChange()}
              </div>
            </div>
          </div>

          <div className="navbar-end is-hidden">
            <a
              onClick={openSettings}
              className="navbar-item"
              style={{ cursor: "pointer" }}
            >
              <SettingsIcon />
            </a>
          </div>
        </div>
      </nav>

      <div className={`modal ${showSettings ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <header className="modal-card-head">
            <p className="modal-card-title">{t("settings")}</p>
            <button
              onClick={closeSettings}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <Settings />
          </section>
          <footer className="modal-card-foot aic is-justify-content-flex-end">
            <button onClick={closeSettings} className="button">
              OK
            </button>
          </footer>
        </div>
        <button
          onClick={closeSettings}
          className="modal-close is-large"
          aria-label="close"
        ></button>
      </div>
    </>
  );
};
export default Navbar;
