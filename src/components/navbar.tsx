import React, {FC, useContext, useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {LangDataStoreContext} from "./lang-data-store-context";
import {trimEnd} from "lodash-es";
import logo from "../assets/images/logo-white.png";

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
        {langDataStore.lang}&nbsp;<span style={{fontSize: "0.7em"}}>▼</span>
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
          className="container is-max-desktop navbar-content "
          style={{overflow: "visible"}}
        >
          <div className="navbar-start">
            <div className={`navbar-brand `}>
              <div
                className={`aic navbar-brand-logo ${isNavbarTransparent ? "navbar-brand-logo-hidden" : ""}`}
              >
                <Link
                  to={l.linkToCurrentLang("/")}
                  className={`aic navbar-logo-link`}
                >
                  <img className="navbar-logo-img" alt={t("title")} src={logo}/>
                </Link>
              </div>
            </div>
            <div className={`navbar-menu ${menuOpen ? "is-active" : ""}`}>
              <Link
                onClick={() => setMenuOpen(false)}
                className={`navbar-item`}
                to={l.linkToCurrentLang("/read")}
              >
                {t("read")}
              </Link>
              <Link
                onClick={() => setMenuOpen(false)}
                className={`navbar-item`}
                to={l.linkToCurrentLang("/random")}
              >
                {t("create")}
              </Link>
            </div>
          </div>
          <div className={`navbar-end`}>
            <div className="navbar-item navbar-lang">
              {langChange()}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
