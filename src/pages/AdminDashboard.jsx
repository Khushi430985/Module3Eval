/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import { getRestaurants, saveRestaurants } from "../utils/storage";
import RestaurantCard from "../components/RestaurantCard";

export default function AdminDashboard() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [parkingFilter, setParkingFilter] = useState("");

  const [form, setForm] = useState({
    restaurantName: "",
    address: "",
    type: "Rajasthani",
    parkingLot: "true",
    image:
      "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg",
  });

  // Load data
  useEffect(() => {
    setList(getRestaurants());
  }, []);

  // Add restaurant
  const addRestaurant = () => {
    if (!form.restaurantName || !form.address) {
      alert("Please fill all fields");
      return;
    }

    const newRestaurant = {
      restaurantID: Date.now(),
      restaurantName: form.restaurantName,
      address: form.address,
      type: form.type,
      parkingLot: form.parkingLot === "true",
      image: form.image,
    };

    const updated = [...list, newRestaurant];
    saveRestaurants(updated);
    setList(updated);

    setForm({ ...form, restaurantName: "", address: "" });
  };

  // Delete
  const deleteRestaurant = (id) => {
    if (!confirm("Are you sure you want to delete?")) return;

    const updated = list.filter((r) => r.restaurantID !== id);
    saveRestaurants(updated);
    setList(updated);
  };

  // Filter
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
      {/* LEFT SIDEBAR */}
      <div style={styles.sidebar}>
        <h3>Add Restaurant</h3>

        <input
          placeholder="Restaurant Name"
          value={form.restaurantName}
          onChange={(e) =>
            setForm({ ...form, restaurantName: e.target.value })
          }
          style={styles.input}
        />

        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          style={styles.input}
        />

        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
          style={styles.input}
        >
          <option>Rajasthani</option>
          <option>Gujarati</option>
          <option>Mughlai</option>
          <option>Jain</option>
          <option>Thai</option>
          <option>North Indian</option>
          <option>South Indian</option>
        </select>

        <select
          value={form.parkingLot}
          onChange={(e) =>
            setForm({ ...form, parkingLot: e.target.value })
          }
          style={styles.input}
        >
          <option value="true">Parking Yes</option>
          <option value="false">Parking No</option>
        </select>

        <button onClick={addRestaurant}>Add Restaurant</button>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.main}>
        <h2>Admin Dashboard</h2>

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

        <div style={styles.grid}>
          {filteredList.map((item) => (
            <RestaurantCard
              key={item.restaurantID}
              data={item}
              isAdmin={true}
              onDelete={deleteRestaurant}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
  },
  sidebar: {
    width: "260px",
    padding: "15px",
    borderRight: "1px solid #ccc",
  },
  main: {
    flex: 1,
    padding: "20px",
  },
  input: {
    width: "100%",
    marginBottom: "10px",
    padding: "6px",
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
