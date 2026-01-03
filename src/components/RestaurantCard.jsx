import { useNavigate } from "react-router-dom";

export default function RestaurantCard({ data, isAdmin, onDelete }) {
  const navigate = useNavigate();

  return (
    <div style={styles.card}>
      <img
        src={data.image}
        alt={data.restaurantName}
        style={styles.image}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/restaurant.png";
        }}
      />

      <h4>{data.restaurantName}</h4>
      <p>{data.address}</p>
      <p>{data.type}</p>
      <p>Parking: {data.parkingLot ? "Yes" : "No"}</p>

      {isAdmin && (
        <div style={styles.actions}>
          <button
            onClick={() =>
              navigate("/admin/restaurants/update", { state: data })
            }
          >
            Update
          </button>
          <button onClick={() => onDelete(data.restaurantID)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "10px",
    fontSize: "13px",
  },
  image: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    marginBottom: "8px",
  },
  actions: {
    display: "flex",
    gap: "6px",
    marginTop: "6px",
  },
};
