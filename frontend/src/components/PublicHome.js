import React from "react";
import { Link } from "react-router-dom";
import "./PublicHome.css";

// ⭐ Your hero image import
import heroImg from "../assets/blood-donate.jpg";

// ⭐ Your second image import
import compatImg from "../assets/blood.jpg";

function PublicHome() {
  return (
    <div className="public-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-gradient" />
        <div className="hero-inner">
          <div className="hero-text">
            <h1 className="hero-title">Give Blood • Save Lives</h1>
            <p className="hero-subtitle">
              One donation can help save up to three lives. Join a smarter,
              AI-ready donation network built for real hospitals and patients.
            </p>
            <div className="hero-buttons">
              <Link to="/register-donor" className="hero-btn primary">
                Become a Donor
              </Link>
              <Link to="/request-blood" className="hero-btn ghost">
                Request Blood
              </Link>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img
              className="hero-image"
              src={heroImg}
              alt="Blood donation and transfusion"
            />
          </div>
        </div>
      </section>

      {/* WHY DONATE */}
      <section className="facts-section">
        <h2 className="section-heading">Why Donate Blood?</h2>

        <div className="facts-grid">
          <div className="fact-card">
            <div className="fact-icon">❤️</div>
            <h3>Life-Saving Impact</h3>
            <p>Every donation can support up to three patients in critical need.</p>
          </div>

          <div className="fact-card">
            <div className="fact-icon">⏱️</div>
            <h3>Always in Demand</h3>
            <p>Every two seconds, someone needs blood in hospitals worldwide.</p>
          </div>

          <div className="fact-card">
            <div className="fact-icon">🏥</div>
            <h3>Community Hero</h3>
            <p>Your donation supports patients in local emergency rooms and ICUs.</p>
          </div>
        </div>
      </section>

      {/* HOW MATCHING WORKS */}
      <section className="how-section">
        <h2 className="section-heading">How Matching Works</h2>

        <div className="matching-steps">
          <div className="step-card">
            <div className="step-icon blood-icon">🩸</div>
            <h3>Compatible Blood Type</h3>
            <p>We filter donors using strict medical compatibility rules to ensure a safe transfusion.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">📍</div>
            <h3>Location Proximity</h3>
            <p>Nearby donors are prioritized so blood reaches the patient as quickly as possible.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">🤖</div>
            <h3>AI Score Ranking</h3>
            <p>Our smart algorithm ranks the best matches using donation history & response likelihood.</p>
          </div>
        </div>
      </section>

      {/* BLOOD TYPE IN ACTION */}
      <section className="compat-section">
        <div className="compat-layout">
          <div className="compat-text-block">
            <h2 className="compat-title">Blood Type In Action</h2>
            <p>
              Your blood type determines who you can safely donate to and receive from.
              Our system uses medical rules plus smart scoring to match the right donor
              to the right patient at the right time.
            </p>
          
          </div>

          <div className="compat-image-wrapper">
            <img
              className="compat-image"
              src={compatImg}
              alt="Blood transfusion care"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default PublicHome;
