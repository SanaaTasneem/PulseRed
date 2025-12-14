import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import "./MatchResults.css";

function MatchResults() {
  const { requestId } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    async function loadMatches() {
      try {
        const res = await fetch(`http://localhost:8080/api/matching/request/${requestId}`);
        const data = await res.json();
        setMatches(data?.recommendedDonors || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, [requestId]);

  if (loading) {
    return (
      <div className="page-container fade-page">
        <h2>Finding Best Matches...</h2>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="page-container fade-page">
      <h2 className="results-title">AI Ranked Match Results</h2>

      {matches.length === 0 ? (
        <p className="no-results">No compatible donors found.</p>
      ) : (
        <div className="match-grid">
          {matches.map((m, index) => (
            <div
              className={`match-card animated-card ${index === 0 ? "top-match" : ""}`}
              key={m.donorId}
              onClick={() => setSelectedMatch(m)}
              style={{ cursor: "pointer", animationDelay: `${0.1 * index}s` }}
            >
              <div className="rank-badge">{index + 1}</div>

              <div className="blood-type-tag">{m.bloodType}</div>

              <h3>{m.firstName} {m.lastName}</h3>

              <p className="score-label">
                Score: <span className={`score-color score-${Math.round(m.score)}`}>{m.score}</span> / 10
              </p>

              <div className="score-bar">
                <div
                  className="score-fill"
                  style={{ width: `${(m.score / 10) * 100}%` }}
                ></div>
              </div>

              <p className="details">
                Age: {m.age} <br />
                Location: {m.city} {m.zipCode}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedMatch && (
        <div className="modal-overlay" onClick={() => setSelectedMatch(null)}>
          <div className="modal-box pop-modal" onClick={e => e.stopPropagation()}>
            <h2>{selectedMatch.firstName} {selectedMatch.lastName}</h2>
            <p className="modal-score">Score: {selectedMatch.score} / 10</p>

            <h3 className="modal-subtitle">Why this match?</h3>

            <p className="modal-summary">
              {selectedMatch.reasoningSummary || "Summary not available yet."}
            </p>

            <pre className="modal-breakdown">
{selectedMatch.reasoningBreakdown || "Breakdown not available yet."}
            </pre>

            <button className="modal-close-btn" onClick={() => setSelectedMatch(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchResults;
