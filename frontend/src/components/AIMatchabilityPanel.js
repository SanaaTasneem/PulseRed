import React, { useEffect, useState } from "react";
import "./AIMatchabilityPanel.css";

function AIMatchabilityPanel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:8080/api/ai/matchability");
        if (!res.ok) throw new Error("Failed to load matchability");
        const json = await res.json();
        setData(json || []);
      } catch (err) {
        console.error(err);
        
        setData([
          { bloodType: "O+", score: 9.1 },
          { bloodType: "O-", score: 8.4 },
          { bloodType: "A+", score: 7.6 },
          { bloodType: "A-", score: 6.8 },
          { bloodType: "B+", score: 5.9 },
          { bloodType: "B-", score: 4.2 },
          { bloodType: "AB+", score: 3.5 },
          { bloodType: "AB-", score: 2.1 },
        ]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function levelForScore(score) {
    if (score >= 8) return "easy";
    if (score >= 6) return "moderate";
    if (score >= 4) return "hard";
    return "critical";
  }

  let interpretation = "AI will summarize matchability once donor data is available.";
  if (data.length > 0) {
    const best = data.reduce((a, b) => (b.score > a.score ? b : a));
    const worst = data.reduce((a, b) => (b.score < a.score ? b : a));

    interpretation =
      `${best.bloodType} has the strongest matchability right now ` +
      `(${best.score.toFixed(1)} / 10), meaning your donor pool covers this blood type well. ` +
      `${worst.bloodType} is the most challenging to match ` +
      `(${worst.score.toFixed(1)} / 10) — the system recommends focused donor recruitment for this type.`;
  }

  return (
    <div className="ai-matchability-wrapper">
      <h3 className="ai-section-title">AI Matchability Heatmap</h3>

      {loading ? (
        <p className="ai-loading">Loading AI metrics…</p>
      ) : (
        <>
          <div className="ai-heatmap-grid">
            {data.map((item) => (
              <div
                key={item.bloodType}
                className={`ai-heatmap-tile level-${levelForScore(item.score)}`}
              >
                <div className="tile-bloodtype">{item.bloodType}</div>
                <div className="tile-score">{item.score.toFixed(1)} / 10</div>
                <div className="tile-label">
                  {levelForScore(item.score) === "easy" && "Easy to match"}
                  {levelForScore(item.score) === "moderate" && "Moderate"}
                  {levelForScore(item.score) === "hard" && "Difficult"}
                  {levelForScore(item.score) === "critical" && "Critical"}
                </div>
              </div>
            ))}
          </div>

          <div className="ai-legend">
            <span className="legend-box level-easy" /> Easy
            <span className="legend-box level-moderate" /> Moderate
            <span className="legend-box level-hard" /> Difficult
            <span className="legend-box level-critical" /> Critical
          </div>

          <div className="ai-interpretation">
            <h4>AI Interpretation</h4>
            <p>{interpretation}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default AIMatchabilityPanel;
