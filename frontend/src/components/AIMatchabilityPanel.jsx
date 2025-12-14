import React, { useEffect, useState } from "react";
import "./AIMatchabilityPanel.css";

function AIMatchabilityPanel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interpretation, setInterpretation] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("http://localhost:8080/api/ai/matchability");
        const json = await res.json();
        setData(json);
        generateInterpretation(json);
      } catch (err) {
        console.error("AI Panel Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  function generateInterpretation(dataset) {
    if (!dataset || dataset.length === 0) {
      setInterpretation("Not enough data to generate insights.");
      return;
    }

    const sorted = [...dataset].sort((a, b) => b.score - a.score);
    const top = sorted[0];
    const bottom = sorted[sorted.length - 1];

    let summary = "";
    let lines = [];

    summary = `${top.bloodType} currently shows the strongest matchability.`;

    lines.push(`• High donor availability compared to others.`);
    if (top.score > 8) lines.push(`• Excellent distribution and donor response rates.`);
    else if (top.score > 6) lines.push(`• Solid donor volume and moderate coverage.`);
    else lines.push(`• Moderate supply but still above average.`);

    lines.push(
      `• ${bottom.bloodType} shows the lowest current matchability and may need donor recruitment.`
    );

    setInterpretation({ summary, lines });
  }

  function getLevelClass(score) {
    if (score >= 7.5) return "level-easy";
    if (score >= 5) return "level-moderate";
    if (score >= 2.5) return "level-hard";
    return "level-critical";
  }

  return (
    <div className="ai-matchability-wrapper">
      <h3 className="ai-section-title">AI Matchability Heatmap</h3>

      {loading ? (
        <div className="ai-loading">Loading data...</div>
      ) : (
        <>
          <div className="ai-heatmap-grid">
            {data.map((item) => (
              <div
                key={item.bloodType}
                className={`ai-heatmap-tile ${getLevelClass(item.score)}`}
              >
                <div className="tile-bloodtype">{item.bloodType}</div>
                <div className="tile-score">{item.score} / 10</div>
                <div className="tile-label">Matchability</div>
              </div>
            ))}
          </div>

          <div className="ai-legend">
            <span className="legend-box level-easy"></span> Easy
            <span className="legend-box level-moderate"></span> Moderate
            <span className="legend-box level-hard"></span> Hard
            <span className="legend-box level-critical"></span> Critical
          </div>

          <div className="ai-interpretation">
            <h4>AI Interpretation</h4>

            <p className="ai-interpretation-summary">
              {interpretation.summary}
            </p>

            <div className="ai-interpretation-divider"></div>

            {interpretation.lines &&
              interpretation.lines.map((line, index) => (
                <p key={index} className="ai-interpretation-text">
                  {line}
                </p>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AIMatchabilityPanel;
