import { createContext, useState, useEffect } from "react";

export const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/inventory")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch inventory");
        return res.json();
      })
      .then((data) => {
        setInventory(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load inventory. Check backend.");
        setLoading(false);
      });
  }, []);

  return (
    <InventoryContext.Provider value={{ inventory, loading, error }}>
      {children}
    </InventoryContext.Provider>
  );
}
