import React, { useContext, useState } from "react";
import { InventoryContext } from "../context/InventoryContext";
import InventoryCard from "./InventoryCard";
import "./InventoryDashboard.css";

function InventoryDashboard() {
  const { inventory, loading, error } = useContext(InventoryContext);
  const [search, setSearch] = useState("");

  const filtered = inventory.filter((item) =>
    item.bloodType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="inventory-container">
      <h2>Blood Inventory Status</h2>

      <input
        type="text"
        placeholder="Search blood type..."
        className="inventory-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <div className="inventory-loading">Loading...</div>}
      {error && <div className="inventory-error">{error}</div>}

      <div className="inventory-grid">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <InventoryCard
              key={item.id}
              type={item.bloodType}
              units={item.units}
            />
          ))
        ) : (
          <div>No inventory data available.</div>
        )}
      </div>
    </div>
  );
}

export default InventoryDashboard;
