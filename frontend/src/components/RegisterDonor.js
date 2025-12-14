import React, { useState } from "react";
import "./RegisterDonor.css";
import { useToast } from "./ToastContext";

function RegisterDonor() {
  const { showToast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !bloodType || !dateOfBirth) {
      showToast("Please fill all required fields.", "error");
      return;
    }

    if (phone.length !== 12) {
      showToast("Phone format must be ###-###-####", "error");
      return;
    }

    if (!city.trim()) {
      showToast("City is required.", "error");
      return;
    }

    if (!zipCode.trim()) {
      showToast("ZIP Code is required.", "error");
      return;
    }

    if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
      showToast("ZIP Code must be 5 digits or ZIP+4 format.", "error");
      return;
    }

    const donor = {
      firstName,
      lastName,
      email,
      phone,
      bloodType,
      dateOfBirth,
      city,
      zipCode,
    };

    try {
      const response = await fetch("http://localhost:8080/api/donors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donor),
      });

      if (response.ok) {
        showToast("Donor registered successfully!", "success");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setBloodType("");
        setDateOfBirth("");
        setCity("");
        setZipCode("");
      } else {
        showToast("Failed to register donor.", "error");
      }
    } catch (err) {
      showToast("Server error.", "error");
    }
  };

  return (
    <div className="register-page-wrapper">
      <h2 className="register-title">Register a New Donor</h2>

      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <div className="row">
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
          </div>

          <div className="row">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="text" value={phone} maxLength="12" onChange={(e) => {
              let cleaned = e.target.value.trim();
              cleaned = cleaned.replace(/[^\d-]/g, "");
              setPhone(formatPhone(cleaned));
            }} placeholder="123-456-7890" required />
          </div>

          <div className="row">
            <select value={bloodType} onChange={(e) => setBloodType(e.target.value)} required>
              <option value="">Select Blood Type</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>

            <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
          </div>

          <div className="row">
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
            <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="ZIP Code" required />
          </div>

          <button type="submit" className="register-btn">Add Donor</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterDonor;
