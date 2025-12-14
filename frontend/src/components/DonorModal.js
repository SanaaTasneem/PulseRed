import React from "react";

export default function DonorModal({ donor, onClose }) {
  if (!donor) return null;

  const calculateAge = (dob) => {
    const diff = Date.now() - new Date(dob).getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeBtn}>×</button>

        <h2 style={styles.name}>{donor.firstName} {donor.lastName}</h2>

        <div style={styles.infoBox}>
          <p><strong>Email:</strong> {donor.email}</p>
          <p><strong>Phone:</strong> {donor.phone}</p>
          <p><strong>Blood Type:</strong> {donor.bloodType}</p>
          <p><strong>Date of Birth:</strong> {donor.dateOfBirth}</p>
          <p><strong>Age:</strong> {calculateAge(donor.dateOfBirth)}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "25px",
    width: "400px",
    borderRadius: "12px",
    position: "relative",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "15px",
    border: "none",
    background: "transparent",
    fontSize: "22px",
    cursor: "pointer",
  },
  name: {
    marginBottom: "15px",
    textAlign: "center",
  },
  infoBox: {
    lineHeight: "1.7",
  },
};
