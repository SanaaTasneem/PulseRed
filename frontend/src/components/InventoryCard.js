import React from "react";

function InventoryCard({ type, units }) {
  let bgColor = "#f9f9f9";

  if (units <= 5) bgColor = "#ffebee"; // critical
  else if (units <= 10) bgColor = "#fff3cd"; // low stock
  else bgColor = "#e8f5e9"; // healthy

  return (
    <div className="inventory-card" style={{ background: bgColor }}>
      <h3>{type}</h3>
      <p>
        <strong>Units:</strong> {units}
      </p>
    </div>
  );
}

export default InventoryCard;
