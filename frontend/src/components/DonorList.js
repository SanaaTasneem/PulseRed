import React, { useEffect, useState } from "react";
import "./DonorList.css";

function DonorList() {
  const [donors, setDonors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [donationDonor, setDonationDonor] = useState(null);
  const [units, setUnits] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [selectedBloodType, setSelectedBloodType] = useState("ALL");

  async function fetchDonors() {
    try {
      const res = await fetch("http://localhost:8080/api/donors");
      const data = await res.json();
      data.sort((a, b) => a.firstName.localeCompare(b.firstName));
      setDonors(data);
    } catch (err) {
      console.error("Error loading donors:", err);
    }
  }

  useEffect(() => {
    fetchDonors();
  }, []);

  function calculateAge(dob) {
    const birth = new Date(dob);
    const diff = Date.now() - birth.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  const DONATION_RULES = {
    "O-": { to: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"], from: ["O-"] },
    "O+": { to: ["O+", "A+", "B+", "AB+"], from: ["O-", "O+"] },
    "A-": { to: ["A-", "A+", "AB-", "AB+"], from: ["O-", "A-"] },
    "A+": { to: ["A+", "AB+"], from: ["O-", "O+", "A-", "A+"] },
    "B-": { to: ["B-", "B+", "AB-", "AB+"], from: ["O-", "B-"] },
    "B+": { to: ["B+", "AB+"], from: ["O-", "O+", "B-", "B+"] },
    "AB-": { to: ["AB-", "AB+"], from: ["O-", "A-", "B-", "AB-"] },
    "AB+": { to: ["AB+"], from: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"] },
  };

  function openDonationModal(id, first, last) {
    setDonationDonor({ id, name: `${first} ${last}` });
    setUnits("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  async function submitDonation() {
    if (!units || units < 1) {
      alert("Units must be at least 1.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorId: parseInt(donationDonor.id),
          amount: parseInt(units),
        }),
      });

      if (res.ok) {
        closeModal();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1500);
        await fetchDonors();
      } else {
        alert("Failed to record donation.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  }

  function getColorClass(bloodType) {
    return `tag-${bloodType.replace("+", "p").replace("-", "n")}`;
  }

  const filteredDonors =
    selectedBloodType === "ALL"
      ? donors
      : donors.filter((d) => d.bloodType === selectedBloodType);

  const BLOOD_TYPES = ["ALL", "O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

  return (
    <div className="page-container">
      <h2 className="donor-title">Donor List</h2>

      <div className="blood-filter">
        {BLOOD_TYPES.map((type) => (
          <button
            key={type}
            className={`filter-pill ${
              selectedBloodType === type ? "active" : ""
            } ${type !== "ALL" ? `pill-${type.replace("+", "p").replace("-", "n")}` : ""}`}
            onClick={() => setSelectedBloodType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="donor-grid">
        {filteredDonors.map((d) => {
          const rules = DONATION_RULES[d.bloodType] || { to: [], from: [] };

          return (
            <div key={d.donorId} className="donor-card">
              <span
                className={`blood-badge badge-${d.bloodType
                  .replace("+", "p")
                  .replace("-", "n")}`}
              >
                {d.bloodType}
              </span>

              <h3 className="donor-name">
                {d.firstName} {d.lastName}
              </h3>

              <div className="donor-info">
                <p><strong>Age:</strong> {calculateAge(d.dateOfBirth)}</p>
                <p><strong>City:</strong> {d.city || "—"}</p>
                <p><strong>ZIP:</strong> {d.zipCode || "—"}</p>
                <p><strong>Last Donation:</strong>{" "}
                  {d.lastDonationDate
                    ? new Date(d.lastDonationDate).toLocaleDateString()
                    : "No Data"}
                </p>
              </div>

              <div className="compact-compat">
                <p><strong>Donates To:</strong>{" "}
                  {rules.to.map((b) => (
                    <span key={`to-${b}`} className={`type-label ${getColorClass(b)}`}>
                      {b}
                    </span>
                  ))}
                </p>

                <p><strong>Receives From:</strong>{" "}
                  {rules.from.map((b) => (
                    <span key={`from-${b}`} className={`type-label ${getColorClass(b)}`}>
                      {b}
                    </span>
                  ))}
                </p>
              </div>

              <button
                className="donate-btn"
                onClick={() => openDonationModal(d.donorId, d.firstName, d.lastName)}
              >
                Record Donation
              </button>

              {showModal && donationDonor?.id === d.donorId && (
                <div className="inline-modal-overlay" onClick={closeModal}>
                  <div className="inline-modal" onClick={(e) => e.stopPropagation()}>
                    <h3>Record Donation</h3>
                    <p>Donor: <strong>{donationDonor.name}</strong></p>

                    <input
                      type="number"
                      placeholder="Units"
                      min="1"
                      value={units}
                      onChange={(e) => setUnits(e.target.value)}
                      className="modal-input"
                    />

                    <div className="modal-buttons">
                      <button className="save-btn" onClick={submitDonation}>Save</button>
                      <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}

              {showSuccess && donationDonor?.id === d.donorId && (
                <div className="success-toast">✓ Donation recorded</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DonorList;
