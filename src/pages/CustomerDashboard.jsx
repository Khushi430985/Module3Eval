import { useEffect, useState } from "react";
import { getRestaurants } from "../utils/storage";
import RestaurantCard from "../components/RestaurantCard";

export default function CustomerDashboard() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [parkingFilter, setParkingFilter] = useState("");

  // Load restaurants
  useEffect(() => {
    setList(getRestaurants());
  }, []);

  // Filter logic (safe)
  const filteredList = list.filter((item) => {
    const name = item.restaurantName || "";
    const address = item.address || "";

    const matchSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      address.toLowerCase().includes(search.toLowerCase());

    const matchType = typeFilter ? item.type === typeFilter : true;

    const matchParking =
      parkingFilter !== ""
        ? item.parkingLot === (parkingFilter === "true")
        : true;

    return matchSearch && matchType && matchParking;
  });

  return (
    <div style={styles.container}>
      <h2>Customer Dashboard</h2>

      {/* FILTERS */}
      <div style={styles.filters}>
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          <option>Rajasthani</option>
          <option>Gujarati</option>
          <option>Mughlai</option>
          <option>Jain</option>
          <option>Thai</option>
          <option>North Indian</option>
          <option>South Indian</option>
        </select>

        <select onChange={(e) => setParkingFilter(e.target.value)}>
          <option value="">All Parking</option>
          <option value="true">Parking Yes</option>
          <option value="false">Parking No</option>
        </select>
      </div>

      {/* RESTAURANT GRID */}
      <div style={styles.grid}>
        {filteredList.map((item) => (
          <RestaurantCard
            key={item.restaurantID}
            data={item}
            isAdmin={false}   
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", 
    gap: "15px",
  },
};
