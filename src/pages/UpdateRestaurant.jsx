/* eslint-disable no-restricted-globals */
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getRestaurants, saveRestaurants } from "../utils/storage";

export default function UpdateRestaurant() {
  const navigate = useNavigate();
  const { state } = useLocation(); // restaurant data

  const [form, setForm] = useState({
    restaurantName: state?.restaurantName || "",
    address: state?.address || "",
    type: state?.type || "Rajasthani",
    parkingLot: state?.parkingLot ? "true" : "false",
  });

  const handleUpdate = () => {
    if (!form.restaurantName || !form.address) {
      alert("Please fill all fields");
      return;
    }

    const list = getRestaurants();

    const updatedList = list.map((item) =>
      item.restaurantID === state.restaurantID
        ? {
            ...item,
            restaurantName: form.restaurantName,
            address: form.address,
            type: form.type,
            parkingLot: form.parkingLot === "true",
          }
        : item
    );

    saveRestaurants(updatedList);
    alert("Restaurant updated successfully");
    navigate("/admin/dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h3>Update Restaurant</h3>

        <input
          value={form.restaurantName}
          onChange={(e) =>
            setForm({ ...form, restaurantName: e.target.value })
          }
          style={styles.input}
        />

        <input
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

        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },
  box: {
    width: "300px",
    padding: "15px",
    border: "1px solid #ccc",
  },
  input: {
    width: "100%",
    marginBottom: "10px",
    padding: "6px",
  },
};
