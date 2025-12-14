import React, { useEffect, useState } from "react";
import "./DonorStats.css";

function DonorStats() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/donors")
      .then((res) => res.json())
      .then((data) => setDonors(data))
      .catch(() => console.error("Error loading stats"));
  }, []);

  const total = donors.length;

  const groups = {
    "O-": 0, "O+": 0,
    "A-": 0, "A+": 0,
    "B-": 0, "B+": 0,
    "AB-": 0, "AB+": 0
  };

  donors.forEach((d) => {
    if (groups[d.bloodType] !== undefined) { 
      groups[d.bloodType]++;
    }
  });

  return (
    <div className="stats-container">
      <h2 className="stats-title">Donor Statistics</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Donors</h3>
          <p className="stat-number">{total}</p>
        </div>

        {Object.entries(groups).map(([type, count]) => (
          <div className="stat-card" key={type}>
            <h3>Blood Type {type}</h3>
            <p className="stat-number">{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonorStats;
