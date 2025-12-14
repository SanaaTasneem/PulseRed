import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useToast } from "./ToastContext";
import "./NotificationPanel.css";

function NotificationPanel() {
  const { showToast } = useToast();

  const [notifications, setNotifications] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const [selectedBloodType, setSelectedBloodType] = useState("ALL");

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      try {
        const [notifRes, donorRes] = await Promise.all([
          fetch("http://localhost:8080/api/notifications"),
          fetch("http://localhost:8080/api/donors")
        ]);

        if (!notifRes.ok) throw new Error("Notifications fetch failed");

        let notifData = await notifRes.json();
        const donorData = await donorRes.json();

        notifData.sort((a, b) => b.notificationId - a.notificationId);

        const unique = [];
        const seenDonors = new Set();

        for (const n of notifData) {
          if (!seenDonors.has(n.donorId)) {
            unique.push(n);
            seenDonors.add(n.donorId);
          }
        }

        setNotifications(unique);
        setDonors(donorData);
      } catch (e) {
        showToast("Error loading notifications.", "error");
      }
      setLoading(false);
    }

    loadAll();
  }, [showToast]);

  function findDonor(notification) {
    return donors.find((d) => d.donorId === notification.donorId) || null;
  }

  async function markResponded(notificationId) {
    try {
      const res = await fetch(
        `http://localhost:8080/api/notifications/${notificationId}/respond`,
        { method: "POST" }
      );

      if (res.ok) {
        const updated = await res.json();

        setUpdatingId(notificationId); 

        setNotifications(prev =>
          prev.map(n =>
            n.notificationId === updated.notificationId ? updated : n
          )
        );

        setTimeout(() => setUpdatingId(null), 300); 
        showToast("Marked as responded.", "success");
      } else {
        showToast("Failed to update response.", "error");
      }
    } catch (e) {
      showToast("Network error.", "error");
    }
  }

  if (loading) {
    return (
      <div className="page-container">
        <Spinner />
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="page-container">
        <h2 className="notify-title">No Notifications Yet</h2>
      </div>
    );
  }

  const total = notifications.length;
  const responded = notifications.filter((n) => n.responded).length;
  const percent = Math.round((responded * 100) / total);

  const filteredNotifications =
    selectedBloodType === "ALL"
      ? notifications
      : notifications.filter((n) => {
          const donor = findDonor(n);
          return donor?.bloodType === selectedBloodType;
        });

  const BLOOD_TYPES = ["ALL", "O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

  return (
    <div className="page-container">
      <h2 className="notify-title">Notified Donors</h2>

      <div className="progress-wrapper">
        <div className="progress-label">
          Responded: {responded} / {total} donors ({percent}%)
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="blood-filter">
        {BLOOD_TYPES.map((type) => (
          <button
            key={type}
            className={`filter-pill ${
              selectedBloodType === type ? "active" : ""
            } ${
              type !== "ALL"
                ? `pill-${type.replace("+", "p").replace("-", "n")}`
                : ""
            }`}
            onClick={() => setSelectedBloodType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="notify-grid">
        {filteredNotifications.map((n) => {
          const donor = findDonor(n);
          const name = donor
            ? `${donor.firstName} ${donor.lastName}`
            : `Donor #${n.donorId}`;
          const bloodType = donor?.bloodType || "";

          const badgeClass =
            bloodType !== ""
              ? `blood-tag blood-${bloodType.replace("+", "p").replace("-", "n")}`
              : "blood-tag";

          return (
            <div key={n.notificationId} className="notify-card">
              {bloodType && <span className={badgeClass}>{bloodType}</span>}

              <h3 className="notify-name">{name}</h3>

              <p className="notif-message">{n.message}</p>

              <p className="notify-meta">
                Sent: {n.sentAt
                  ? n.sentAt.replace("T", " ").substring(0, 16)
                  : "N/A"}
              </p>

              <div
                className={
                  n.responded
                    ? "status-pill status-responded"
                    : "status-pill status-pending"
                }
              >
                {n.responded ? "Responded" : "Pending"}
              </div>

              {!n.responded && (
                <button
                  className="notify-btn"
                  disabled={updatingId === n.notificationId}
                  onClick={() => markResponded(n.notificationId)}
                >
                  {updatingId === n.notificationId
                    ? "Updating..."
                    : "Mark as Responded"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NotificationPanel;
