import { useState } from "react";
import { trainerQuotes } from "../helpers/trainerQuotes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import GuessDistribution from "./GuessDistribution";

const StatsModal = ({ isStatsModalOpen, setIsStatsModalOpen, guessFeedback, win, lose, stats }) => {
  const [isCopyStats, setIsCopyStats] = useState(false);

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
      console.log(stat.types);
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

    const numGuesses = lose ? "X" : stats.length;
    const randomNumber = Math.floor(Math.random() * (trainerQuotes.length - 1 - 0) + 0);
    const randomQuote = trainerQuotes[randomNumber];

    const link = "https://sqwordle-beta.netlify.app/";

    const statsToCopy = `Sqwordle #64 ${numGuesses}/6\n${statText}\n\n"${randomQuote.quote}" -${randomQuote.trainer}\n${link}`;
    navigator.clipboard.writeText(statsToCopy);
    console.log(statsToCopy);

    setIsCopyStats(true);
    setTimeout(() => {
      setIsCopyStats(false);
    }, 1500);
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
                <p className="">CurrentStreak</p>
              </div>
              <div className="">
                <p>{stats ? stats.maxStreak : "0"}</p>
                <p className="">Max Streak</p>
              </div>
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

            <div className="custom-share-div">
              <p>Next Sqwordle countdown here</p>
              <button className="button" onClick={handleCopyStats} disabled={win || lose ? false : true}>
                <span>SHARE</span>
                <span className="icon is-medium">
                  <FontAwesomeIcon className="fas fa-lg fa-solid" icon={faShareNodes} />
                </span>
              </button>
            </div>
            {isCopyStats && (
              <div className={`notification container custom-copy-stats-message`}>
                <span>Copied results to clipboard</span>
              </div>
            )}
          </div>
        </section>
        <footer className="modal-card-foot">
          <p className="has-text-weight-bold">New SQWORDLE available every day!</p>
        </footer>
      </div>
    </div>
  );
};

export default StatsModal;
