import React, { useEffect, useState } from "react";
import "./RecentDonations.css";

function RecentDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:8080/api/donations/recent");
        const data = await res.json();
        setDonations(data);
      } catch (err) {
        console.error("Failed to load recent donations:", err);
      }
    }

    load();
  }, []);

  return (
    <div className="recent-container">
      <h2>Recent Donations</h2>

      {donations.length === 0 ? (
        <p className="empty">No recent donations found.</p>
      ) : (
        <div className="recent-list">
          {donations.map((d) => {
            const formattedDate = d.donationDate
              ? new Date(d.donationDate).toLocaleDateString()
              : "No Date";

            return (
              <div className="recent-card" key={d.donationId}>
                <p><b>Donor:</b> {d.donorName || "Unknown Donor"}</p>
                <p><b>Blood Type:</b> {d.bloodType || "—"}</p>
                <p><b>Units Donated:</b> {d.amount}</p>
                <p><b>Date:</b> {formattedDate}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecentDonations;
