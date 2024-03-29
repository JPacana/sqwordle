import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import profOak from "../../img/prof-oak-3.png";
import gameExampleHorseaOmanyteEn from "../../img/game-example-horsea-omanyte.png";
import gameExampleHorseaOmanyteEs from "../../img/game-example-horsea-omanyte-es.png";
import gameExampleHorseaSeadraEn from "../../img/game-example-horsea-seadra.png";
import gameExampleHorseaSeadraEs from "../../img/game-example-horsea-seadra-es.png";
import gameExamplePokedexHorseaEn from "../../img/game-example-pokedex-horsea.png";
import gameExamplePokedexHorseaEs from "../../img/game-example-pokedex-horsea-es.png";

const InstructionsModal = (props) => {
  const {
    isOpen,
    handleClose,
    showLanguageSelector,
    setShowLanguageSelector,
    handleChangeLanguage,
    currentLanguageCode,
  } = props;

  const { t } = useTranslation();

  return (
    <div className={`modal ${isOpen ? "is-active" : ""} custom-info-modal`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-card custom-reveal-animation">
        <header className="modal-card-head custom-info-modal-header">
          <img className="custom-prof-oak" src={profOak} />
          <div>
            <p className="modal-card-title custom-info-title">{t("instructions.title")}</p>
          </div>
          <button className="delete custom-delete-button" aria-label="close" onClick={handleClose}></button>
        </header>
        <section className="modal-card-body has-background-dark has-text-white">
          <div className="content custom-intruction-text">
            <div
              className={`dropdown is-right is-flex is-justify-content-flex-end ${
                showLanguageSelector ? "is-active" : ""
              }`}
            >
              <div className="dropdown-trigger">
                <button
                  className="button custom-language-button custom-language-button-instr"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu6"
                  onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                >
                  <span className="has-text-white pl-1 is-capitalized">{t("language.name")}</span>
                  <span className="icon custom-navbar-icon is-medium">
                    <FontAwesomeIcon className="fas fa-lg fa-solid" icon={faGlobe} />
                  </span>
                </button>
              </div>
              <div
                className="dropdown-menu custom-language-menu custom-language-menu-instr"
                id="dropdown-menu6"
                role="menu"
              >
                <div className="dropdown-content">
                  <div className="dropdown-item">
                    <button
                      className={`mb-0 custom-filter-suggestion-item-button ${
                        currentLanguageCode === "en" ? "has-text-weight-bold" : ""
                      }`}
                      onClick={() => handleChangeLanguage("en")}
                    >
                      English
                    </button>
                    <button
                      className={`mb-0 custom-filter-suggestion-item-button ${
                        currentLanguageCode === "es" ? "has-text-weight-bold" : ""
                      }`}
                      onClick={() => handleChangeLanguage("es")}
                    >
                      Español
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p>
              <Link className="has-text-white is-underlined" to="/signup">
                🌟NEW🌟 Create an account so you don't lose your stats if your browser memory is cleared manually or
                automatically.
              </Link>
            </p>

            <p>
              <Trans i18nKey="instructions.line1">
                <span>Guess the mystery </span>
                <a
                  className="is-underlined has-text-white"
                  href="https://en.wikipedia.org/wiki/List_of_generation_I_Pok%C3%A9mon"
                  target="_blank"
                >
                  Gen 1
                </a>
                <strong className="has-text-white is-uppercase"> Pokémon</strong> in six tries.
              </Trans>
            </p>
            {/* <p>
              <Trans i18nKey="instructions.line2">
                <span>Each guess must be a valid </span>
                <a
                  className="is-underlined has-text-white"
                  href="https://en.wikipedia.org/wiki/List_of_generation_I_Pok%C3%A9mon"
                  target="_blank"
                >
                  Gen 1
                </a>
                <span> Pokémon.</span>
              </Trans>
            </p> */}
            <p>{t("instructions.line3")}</p>
            {/* <p>{t("instructions.line4")}</p> */}
            <div className="instructions-example-div">
              <p>
                <span className="has-text-weight-bold">{t("instructions.exampleTitle.a")}</span>
                <span>{t("instructions.exampleTitle.b")}</span>
              </p>

              <figure className="image custom-game-example mb-2">
                <img src={currentLanguageCode === "es" ? gameExampleHorseaOmanyteEs : gameExampleHorseaOmanyteEn} />
              </figure>
              <p>
                <Trans i18nKey="instructions.example1">
                  You guessed
                  <span className="has-text-weight-bold"> Omanyte</span>. The mystery Pokémon is
                  <span className="has-text-success"> water </span>Type like Horsea, but is not
                  <span className="has-text-danger"> rock </span>Type. The mystery Pokémon has the same number of
                  Pokémon in its Evolution Tree (EvT) as Horsea (<span className="has-text-success">2</span>, i.e.,
                  Horsea & Seadra). The mystery Pokémon has lower defense and is heavier than Horsea, but has the same
                  Attack and Height.
                </Trans>
              </p>

              <figure className="image custom-game-example mb-2">
                <img src={currentLanguageCode === "es" ? gameExampleHorseaSeadraEs : gameExampleHorseaSeadraEn} />
              </figure>
              <p>
                <Trans i18nKey="instructions.example2">
                  You guessed<span className="has-text-weight-bold">Seadra</span>. Seadra is
                  <span className="has-text-warning-dark">yellow</span>to indicate that the mystery Pokémon is in
                  Seadra's Evolution Tree.
                </Trans>
              </p>

              <figure className="image custom-game-example mb-2">
                <img src={currentLanguageCode === "es" ? gameExamplePokedexHorseaEs : gameExamplePokedexHorseaEn} />
              </figure>
              <p>
                <Trans i18nKey="instructions.example3.line1">
                  After each guess the Pokédex will filter based on what you know about
                  <span className="has-text-weight-bold">Type</span>and
                  <span className="has-text-weight-bold">Evolution Tree (EvT)</span>, and the mystery Pokémon will
                  attack you.
                </Trans>
              </p>
              <p>
                <Trans i18nKey="instructions.example3.line2">
                  In the above example, all<span className="has-text-weight-bold">grass</span> and
                  <span className="has-text-weight-bold">poison</span> Type Pokémon and Pokémon with an Evolution Tree
                  (EvT) of<span className="has-text-weight-bold">3</span> are greyed out. The mystery Pokémon attacked
                  you with<span className="has-text-weight-bold is-uppercase">hydro pump</span>, giving you a clue to
                  who the mystery Pokémon is!
                </Trans>
              </p>
            </div>
            <p className="mt-2">{t("instructions.line4")}</p>
          </div>
        </section>
        <footer className="modal-card-foot pt-3 pb-3">
          <p className="has-text-weight-bold">{t("modalFooter.newSqwordle")}</p>
        </footer>
      </div>
    </div>
  );
};

export default InstructionsModal;
