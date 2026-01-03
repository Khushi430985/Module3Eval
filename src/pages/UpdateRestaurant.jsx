import { useLocation, useNavigate } from "react-router-dom";
import { getRestaurants, saveRestaurants } from "../utils/storage";
import { useState } from "react";

export default function UpdateRestaurant() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(state);

  const updateRestaurant = () => {
    if (!window.confirm("Are you sure you want to update?")) return;

    const updatedList = getRestaurants().map((r) =>
      r.restaurantID === form.restaurantID ? form : r
    );

    saveRestaurants(updatedList);
    alert("Restaurant updated successfully");
    navigate("/admin/dashboard");
  };

  return (
    <div>
      <h2>Update Restaurant</h2>

      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <button onClick={updateRestaurant}>Update</button>
    </div>
  );
}
