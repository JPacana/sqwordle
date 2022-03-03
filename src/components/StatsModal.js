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

  const [isCopyStats, setIsCopyStats] = useState(false);

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

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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

    const isMob = isMobile();
    if (isMob) {
      navigator.share({ text: statsToCopy });
    } else {
      navigator.clipboard.writeText(statsToCopy);
      setIsCopyStats(true);
      setTimeout(() => {
        setIsCopyStats(false);
      }, 1500);
    }
    console.log(statsToCopy);
  }

  return (
    <div className={`modal ${isStatsModalOpen ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Stats</p>
          <button className="delete" aria-label="close" onClick={handleCloseStats}></button>
        </header>
        <section className="modal-card-body has-background-dark has-text-white">
          <div className="content">
            <p className="custom-statistics-title">Statistics</p>
            <div className="custom-quick-stats">
              <div className="">
                <p>{stats ? stats.gamesPlayed : "0"}</p>
                <p className="">Played</p>
              </div>
              <div className="">
                <p>{stats ? stats.winPercentage : "0"}</p>
                <p className="">Win %</p>
              </div>
              <div className="r">
                <p>{stats ? stats.currentStreak : "0"}</p>
                <p className="">Current Streak</p>
              </div>
              <div className="">
                <p>{stats ? stats.maxStreak : "0"}</p>
                <p className="">Max Streak</p>
              </div>
            </div>
            <p className="custom-distribution-title">Gym Badges</p>
            <div className="custom-gym-badge-div">
              <GymBadge
                badge={boulderBadge}
                badgeName={"Boulder Badge"}
                location={"Pewter City Gym"}
                description={"Play Sqwordle 5 times."}
                stats={stats}
              />
              <GymBadge
                badge={cascadeBadge}
                badgeName={"Cascade Badge"}
                location={"Cerulean City Gym"}
                description={"Get a Max Streak of 10."}
                stats={stats}
              />
              <GymBadge
                badge={thunderBadge}
                badgeName={"Thunder Badge"}
                location={"Vermillion City Gym"}
                description={"Catch 20 different Pokémon."}
                stats={stats}
              />
              <GymBadge
                badge={rainbowBadge}
                badgeName={"Rainbow Badge"}
                location={"Celadon City Gym"}
                description={"10 wins with 3 or fewer guesses."}
                stats={stats}
              />
              <GymBadge
                badge={soulBadge}
                badgeName={"Soul Badge"}
                location={"Fuchsia City Gym"}
                description={""}
                comingSoon={true}
                stats={stats}
              />
              <GymBadge
                badge={marshBadge}
                badgeName={"Marsh Badge"}
                location={"Saffron City Gym"}
                description={""}
                comingSoon={true}
                stats={stats}
              />
              <GymBadge
                badge={volcanoBadge}
                badgeName={"Volcano Badge"}
                location={"Cinnabar Island City Gym"}
                description={""}
                comingSoon={true}
                stats={stats}
              />
              <GymBadge
                badge={earthBadge}
                badgeName={"Earth Badge"}
                location={"Viridian City Gym"}
                description={"Capture the 3 Legendary birds (Moltres, Zapdos, Articuno)."}
                stats={stats}
              />
            </div>

            <p className="custom-distribution-title">Guess Distribution</p>
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
                  <p className="">Next Sqwordle</p>
                  <Countdown date={nextWordleDate} renderer={renderer} zeroPadTime={2} />
                </div>
                <div className="custom-share-div-border"></div>
                <button className="button" onClick={handleCopyStats} disabled={win || lose ? false : true}>
                  <span>SHARE</span>
                  <span className="icon is-medium">
                    <FontAwesomeIcon className="fas fa-lg fa-solid" icon={faShareNodes} />
                  </span>
                </button>
              </div>
            )}

            {isCopyStats && (
              <div className={`notification container custom-copy-stats-message`}>
                <span>Copied results to clipboard</span>
              </div>
            )}
          </div>
        </section>
        <footer className="modal-card-foot is-flex is-flex-direction-column custom-stats-footer">
          <p className="has-text-weight-bold">New SQWORDLE available every day!</p>
          <p className="has-text-weight-bold pt-2 has-text-centered">
            <span>Or visit the </span>
            <a className="has-text-grey-dark is-underlined" href={safariZoneUrl}>
              SAFARI ZONE
            </a>
            <span> for unlimited practice.</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default StatsModal;
