import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RecordDonation() {
  const [donorId, setDonorId] = useState("");
  const [donor, setDonor] = useState(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!donorId) {
      setDonor(null);
      return;
    }

    axios
      .get(`http://localhost:8080/api/donors/${donorId}`)
      .then((res) => {
        setDonor(res.data);
        setError("");
      })
      .catch(() => {
        setDonor(null);
        setError("❌ No donor found with that ID.");
      });
  }, [donorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!donor) {
      setError("❌ Donor ID is invalid.");
      return;
    }

    if (!amount || amount < 1) {
      setError("❌ Units must be at least 1.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/donations", {
        donorId: parseInt(donorId),
        amount: parseInt(amount),
      });

      setSuccess(`Donation recorded! ${donor.firstName} donated ${amount} unit(s).`);
      setAmount("");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to record donation.");
    }
  };

  return (
    <div style={{ width: "420px", margin: "auto", marginTop: "40px" }}>
      <h2 style={{ textAlign: "center", color: "#b30000", marginBottom: "20px" }}>
        Record a Donation
      </h2>

      {error && <div style={errorBox}>{error}</div>}
      {success && <div style={successBox}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <label>Donor ID</label>
        <input
          type="number"
          value={donorId}
          onChange={(e) => setDonorId(e.target.value)}
          placeholder="Enter Donor ID"
          style={inputStyle}
        />

        {donor && (
          <div style={foundBox}>
            ✔ Donor Found: <strong>{donor.firstName} {donor.lastName}</strong><br />
            Blood Type: <strong>{donor.bloodType}</strong>
          </div>
        )}

        <label>Units Donated</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter units"
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Record Donation
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#b30000",
  color: "white",
  fontSize: "18px",
  borderRadius: "6px",
};

const errorBox = {
  background: "#ffdddd",
  color: "#b30000",
  padding: "12px",
  borderRadius: "6px",
  marginBottom: "15px",
  border: "1px solid #b30000",
};

const successBox = {
  background: "#ddffdd",
  color: "#006600",
  padding: "12px",
  borderRadius: "6px",
  marginBottom: "15px",
  border: "1px solid #009900",
};

const foundBox = {
  background: "#eef9ff",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "15px",
  borderLeft: "4px solid #0066cc",
};
