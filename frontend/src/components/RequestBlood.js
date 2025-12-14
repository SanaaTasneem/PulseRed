import React, { useState, useRef } from "react";
import "./RequestBlood.css";
import { useToast } from "./ToastContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function RequestBlood() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    patientBloodType: "",
    urgencyLevel: "",
    hospitalName: "",
    hospitalLocation: "",
    hospitalZip: "",   
  });

  const [topMatches, setTopMatches] = useState([]);
  const [requestId, setRequestId] = useState(null);
  const [loading, setLoading] = useState(false);
  const matchesRef = useRef(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/blood-request/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), 
      });

      if (response.ok) {
        const data = await response.json();

        setRequestId(user ? data.id : null);

        if (user) {
          const allMatches = data.recommendedDonors || [];
          setTopMatches(allMatches.slice(0, 3));
        } else {
          setTopMatches([]);
        }

        showToast("Blood Request Submitted Successfully!", "success");

        setForm({
          patientBloodType: "",
          urgencyLevel: "",
          hospitalName: "",
          hospitalLocation: "",
          hospitalZip: "",
        });

        if (user) {
          setTimeout(() => {
            if (matchesRef.current) {
              matchesRef.current.scrollIntoView({ behavior: "smooth" });
            }
          }, 300);
        }

      } else {
        showToast("Failed to submit request", "error");
      }
    } catch {
      showToast("Server error", "error");
    }
    setLoading(false);
  }

  return (
    <div className="page-container">

      <h2 className="request-title">Request Blood</h2>

      <form className="request-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient Blood Type</label>
          <select
            name="patientBloodType"
            value={form.patientBloodType}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Type</option>
            <option value="O+">O+</option><option value="O-">O-</option>
            <option value="A+">A+</option><option value="A-">A-</option>
            <option value="B+">B+</option><option value="B-">B-</option>
            <option value="AB+">AB+</option><option value="AB-">AB-</option>
          </select>
        </div>

        <div className="form-group">
          <label>Urgency Level</label>
          <select
            name="urgencyLevel"
            value={form.urgencyLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select Urgency Level</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>

        <div className="form-group">
          <label>Hospital Name</label>
          <input
            name="hospitalName"
            value={form.hospitalName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Hospital Location</label>
          <input
            name="hospitalLocation"
            value={form.hospitalLocation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Hospital Zip Code</label>
          <input
            name="hospitalZip"
            value={form.hospitalZip}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>

      {loading && <div className="spinner"></div>}

      {user && topMatches.length > 0 && (
        <div className="matches-container" ref={matchesRef}>
          <h3 className="matches-title">Top Donor Matches</h3>

          <div className="matches-list">
            {topMatches.map(d => (
              <div key={d.donorId} className="match-card">
                <div
                  className={`blood-tag blood-${d.bloodType
                    .replace("+", "p")
                    .replace("-", "n")}`}
                >
                  {d.bloodType}
                </div>

                <div className="match-name">
                  {d.firstName} {d.lastName}
                </div>

                <div className="score-line">
                  Match Score: <strong>{d.score} / 10</strong>
                </div>

                <div className="match-meta">
                  Age: {d.age} | Location: {d.city} {d.zipCode}
                </div>
              </div>
            ))}
          </div>

          {requestId && (
            <button
              className="view-more-btn"
              onClick={() => navigate(`/match-results/${requestId}`)}
            >
              View Detailed AI Matches →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default RequestBlood;
