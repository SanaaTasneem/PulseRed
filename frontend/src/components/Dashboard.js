import React, { useEffect, useState } from "react";
import AIMatchabilityPanel from "./AIMatchabilityPanel";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useAuth();

  const [alerts, setAlerts] = useState([]);
  const [latestRequestId, setLatestRequestId] = useState(null);
  const [alertsOpen, setAlertsOpen] = useState(false);

  useEffect(() => {
    async function loadAlerts() {
      try {
        const res = await fetch("http://localhost:8080/api/admin-notifications/all");
        if (res.ok) {
          let data = await res.json();
          data.sort((a, b) => b.notificationId - a.notificationId);
          setAlerts(data.slice(0, 5));
        }
      } catch {}
    }

    async function loadLatestRequest() {
      try {
        const res = await fetch("http://localhost:8080/api/blood-request/latest");
        if (res.ok) {
          const data = await res.json();
          if (data?.id) setLatestRequestId(data.id);
        }
      } catch (err) {
        console.error("Failed to load latest request", err);
      }
    }

    loadAlerts();
    loadLatestRequest();
  }, []);

  async function handleMarkRead(id) {
    try {
      const res = await fetch(
        `http://localhost:8080/api/admin-notifications/${id}/read`,
        { method: "PATCH" }
      );
      if (res.ok) {
        const updated = await res.json();
        setAlerts(prev =>
          prev.map(a =>
            a.notificationId === updated.notificationId ? updated : a
          )
        );
      }
    } catch {}
  }

  if (!user) return <div>You must login to view staff dashboard</div>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">AI Dashboard</h2>

      <div className="dashboard-grid">

        {/* LEFT — AI SYSTEM */}
        <div className="large-card slide-in-right">
          <h3 className="card-title">AI Matchability System</h3>
          <AIMatchabilityPanel />
        </div>

        {/* RIGHT — FOUR SMALL CARDS */}
        <div className="right-grid">

          {/* ALERTS */}
          <div
            className={`small-card alerts-card fade-up ${alertsOpen ? "open" : ""}`}
            onClick={() => setAlertsOpen(!alertsOpen)}
          >

            {/* CENTERED HEADER */}
            <div className="alerts-header">
              <h3 className="card-title alerts-title-centered">Alerts</h3>
              <span className={`arrow arrow-centered ${alertsOpen ? "rotated" : ""}`}>
                ▼
              </span>
            </div>

            {/* SUBTEXT WHEN COLLAPSED */}
            {!alertsOpen && (
              <p className="alerts-subtext">(Tap to view notifications)</p>
            )}

            {/* DROPDOWN CONTENT */}
            <div
              className="alerts-dropdown"
              style={{ maxHeight: alertsOpen ? "350px" : "0px" }}
            >
              {alerts.length === 0 ? (
                <p className="card-desc">No new alerts.</p>
              ) : (
                <ul className="alert-list">
                  {alerts.map(a => (
                    <li
                      key={a.notificationId}
                      className="alert-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        !a.read && handleMarkRead(a.notificationId);
                      }}
                      style={{
                        fontWeight: a.read ? 400 : 700,
                        opacity: a.read ? 0.6 : 1,
                        cursor: a.read ? "default" : "pointer"
                      }}
                    >
                      <span className="alert-dot">•</span> {a.message}
                    </li>
                  ))}
                </ul>
              )}

              <div className="alert-footer">
                <Link
                  to="/admin-notify"
                  className="alert-view-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  View All
                </Link>
              </div>
            </div>
          </div>

          {/* DONOR STATISTICS */}
          <div className="small-card fade-up">
            <h3 className="card-title">
              <Link to="/stats" className="card-link">Donor Statistics</Link>
            </h3>
            <p className="card-desc">Overview of donors & distribution.</p>
          </div>

          {/* RECENT DONATIONS */}
          <div className="small-card fade-up">
            <h3 className="card-title">
              <Link to="/recent-donations" className="card-link">Recent Donations</Link>
            </h3>
            <p className="card-desc">Snapshot of recent donation activity.</p>
          </div>

          {/* MATCH RESULTS */}
          <div className="small-card fade-up">
            <h3 className="card-title">
              {latestRequestId ? (
                <Link
                  to={`/match-results/${latestRequestId}`}
                  className="card-link"
                >
                  Latest Match Results
                </Link>
              ) : (
                <span className="card-link disabled">Latest Match Results</span>
              )}
            </h3>
            <p className="card-desc">Most recent AI-ranked matches.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
