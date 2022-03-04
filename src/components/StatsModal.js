import { useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { trainerQuotes } from "../helpers/trainerQuotes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import GuessDistribution from "./GuessDistribution";
import { dailyGameUrl, safariZoneUrl } from "../helpers/links.js";
import boulderBadge from "../img/badges/boulder-badge-210.png";
import cascadeBadge from "../img/badges/cascade-badge-210.png";
import thunderBadge from "../img/badges/thunder-badge-210.png";
import rainbowBadge from "../img/badges/rainbow-badge-210.png";
import soulBadge from "../img/badges/soul-badge-210.png";
import marshBadge from "../img/badges/marsh-badge-210.png";
import volcanoBadge from "../img/badges/volcano-badge-210.png";
import earthBadge from "../img/badges/earth-badge-210.png";
import GymBadge from "./GymBadge";
import { UAParser } from "ua-parser-js";

import { Trans, useTranslation } from "react-i18next";

const StatsModal = (props) => {
  const {
    isStatsModalOpen,
    setIsStatsModalOpen,
    guessFeedback,
    win,
    lose,
    stats,
    nextWordleDate,
    isGymLeaderMode,
    isEliteFourMode,
    answerIndex,
  } = props;

  const { t } = useTranslation();

  const [isCopyStats, setIsCopyStats] = useState(false);

  // move to own helper module
  const webShareApiDeviceTypes = ["mobile", "smarttv", "wearable"];
  const parser = new UAParser();
  const browser = parser.getBrowser();
  const device = parser.getDevice();

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span>
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  };

  function handleCloseStats() {
    setIsStatsModalOpen(false);
  }

  function handleCopyStats() {
    const stats = [...guessFeedback];
    let statArray = [];
    for (const stat of stats) {
      let typeCheck = "danger";
      const types = stat.types;
      for (const type of types) {
        if (type.colour === "success") {
          typeCheck = "success";
        }
      }

      const string = `${typeCheck === "success" ? "✅" : "❌"}${stat.numEvolutionCheck === "success" ? "✅" : "❌"}${
        stat.attackCheck
      }${stat.defenseCheck}${stat.heightCheck}${stat.weightCheck}`;
      statArray.push(string);
    }

    // concatenate string
    let statText = "";
    statArray.forEach((stat) => {
      statText += `\n${stat}`;
    });

    const gameNumber = answerIndex + 1;
    const numGuesses = lose ? "X" : stats.length;
    const gameMode = isGymLeaderMode ? "*" : isEliteFourMode ? "**" : "";

    const randomQuoteNumber = Math.floor(Math.random() * (trainerQuotes.length - 1 - 0) + 0);
    const randomQuote = trainerQuotes[randomQuoteNumber];

    const link = dailyGameUrl;

    const statsToCopy = `Sqwordle #${gameNumber} ${numGuesses}/6${gameMode}\n${statText}\n\n"${randomQuote.quote}" -${randomQuote.trainer}\n${link}`;

    const DataToShare = { text: statsToCopy };
    let shareSuccess = false;
    try {
      if (attemptShare(DataToShare)) {
        navigator.share(DataToShare);
        shareSuccess = true;
      }
    } catch (error) {
      shareSuccess = false;
    }

    if (!shareSuccess) {
      navigator.clipboard.writeText(DataToShare.text);

      setIsCopyStats(true);
      setTimeout(() => {
        setIsCopyStats(false);
      }, 1500);
    }
    console.log(statsToCopy);
  }

  function attemptShare(statsToCopy) {
    return (
      // Firefox+Android issue with Web Shate API. Currently exluding any Firefox Mobile user (copies to clipboard instead)
      browser.name?.toUpperCase().indexOf("FIREFOX") === -1 &&
      webShareApiDeviceTypes.indexOf(device.type ?? "") !== -1 &&
      navigator.canShare &&
      navigator.canShare(statsToCopy) &&
      navigator.share
    );
  }

  return (
    <div className={`modal ${isStatsModalOpen ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{t("statsModal.header")}</p>
          <button className="delete" aria-label="close" onClick={handleCloseStats}></button>
        </header>
        <section className="modal-card-body has-background-dark has-text-white">
          <div className="content">
            <p className="custom-statistics-title">{t("statsModal.statistics")}</p>
            <div className="custom-quick-stats">
              <div className="">
                <p>{stats ? stats.gamesPlayed : "0"}</p>
                <p className="">{t("statsModal.played")}</p>
              </div>
              <div className="">
                <p>{stats ? stats.winPercentage : "0"}</p>
                <p className="">{t("statsModal.win")}</p>
              </div>
              <div className="r">
                <p>{stats ? stats.currentStreak : "0"}</p>
                <p className="">{t("statsModal.currentStreak")}</p>
              </div>
              <div className="">
                <p>{stats ? stats.maxStreak : "0"}</p>
                <p className="">{t("statsModal.maxStreak")}</p>
              </div>
            </div>
            <p className="custom-distribution-title">{t("statsModal.gymBadges.header")}</p>
            <div className="custom-gym-badge-div">
              <GymBadge
                badge={boulderBadge}
                badgeName={t("statsModal.gymBadges.boulderBadge.name")}
                location={t("statsModal.gymBadges.boulderBadge.gym")}
                description={t("statsModal.gymBadges.boulderBadge.description")}
                stats={stats}
              />
              <GymBadge
                badge={cascadeBadge}
                badgeName={t("statsModal.gymBadges.cascadeBadge.name")}
                location={t("statsModal.gymBadges.cascadeBadge.gym")}
                description={t("statsModal.gymBadges.cascadeBadge.description")}
                stats={stats}
              />
              <GymBadge
                badge={thunderBadge}
                badgeName={t("statsModal.gymBadges.thunderBadge.name")}
                location={t("statsModal.gymBadges.thunderBadge.gym")}
                description={t("statsModal.gymBadges.thunderBadge.description")}
                stats={stats}
              />
              <GymBadge
                badge={rainbowBadge}
                badgeName={t("statsModal.gymBadges.rainbowBadge.name")}
                location={t("statsModal.gymBadges.rainbowBadge.gym")}
                description={t("statsModal.gymBadges.rainbowBadge.description")}
                stats={stats}
              />
              <GymBadge
                badge={soulBadge}
                badgeName={t("statsModal.gymBadges.soulBadge.name")}
                location={t("statsModal.gymBadges.soulBadge.gym")}
                description={t("statsModal.gymBadges.soulBadge.description")}
                comingSoon={true}
                stats={stats}
              />
              <GymBadge
                badge={marshBadge}
                badgeName={t("statsModal.gymBadges.marshBadge.name")}
                location={t("statsModal.gymBadges.marshBadge.gym")}
                description={t("statsModal.gymBadges.marshBadge.description")}
                comingSoon={true}
                stats={stats}
              />
              <GymBadge
                badge={volcanoBadge}
                badgeName={t("statsModal.gymBadges.volcanoBadge.name")}
                location={t("statsModal.gymBadges.volcanoBadge.gym")}
                description={t("statsModal.gymBadges.volcanoBadge.description")}
                comingSoon={true}
                stats={stats}
              />
              <GymBadge
                badge={earthBadge}
                badgeName={t("statsModal.gymBadges.earthBadge.name")}
                location={t("statsModal.gymBadges.earthBadge.gym")}
                description={t("statsModal.gymBadges.earthBadge.description")}
                stats={stats}
              />
            </div>

            <p className="custom-distribution-title">{t("statsModal.guessDistribution")}</p>
            <div className="custom-distribution-container">
              {stats &&
                Object.entries(stats.guesses).map(([key, value]) => {
                  if (key === "fail") return;
                  return (
                    <GuessDistribution
                      key={key}
                      guess={[key, value]}
                      maxGuesses={Math.max(...Object.values(stats.guesses))}
                      guessFeedback={guessFeedback}
                      win={win}
                    />
                  );
                })}
            </div>
            {(win || lose) && (
              <div className="custom-share-div">
                <div className="custom-countdown">
                  <p className="">{t("statsModal.nextSqwordle")}</p>
                  <Countdown date={nextWordleDate} renderer={renderer} zeroPadTime={2} />
                </div>
                <div className="custom-share-div-border"></div>
                <button className="button" onClick={handleCopyStats} disabled={win || lose ? false : true}>
                  <span className="is-uppercase">{t("statsModal.share")}</span>
                  <span className="icon is-medium">
                    <FontAwesomeIcon className="fas fa-lg fa-solid" icon={faShareNodes} />
                  </span>
                </button>
              </div>
            )}

            {isCopyStats && (
              <div className={`notification container custom-copy-stats-message`}>
                <span>{t("statsModal.copiedResultsMessage")}</span>
              </div>
            )}
          </div>
        </section>
        <footer className="modal-card-foot is-flex is-flex-direction-column custom-stats-footer">
          <p className="has-text-weight-bold">{t("modalFooter.newSqwordle")}</p>
          <p className="has-text-weight-bold pt-2 has-text-centered">
            <Trans i18nKey="modalFooter.safariZone">
              <span>Or visit the </span>
              <a className="has-text-grey-dark is-underlined" href={safariZoneUrl}>
                SAFARI ZONE
              </a>
              <span> for unlimited practice.</span>
            </Trans>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default StatsModal;
