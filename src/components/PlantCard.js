import { useState } from "react";

function PlantCard({ plant, onDeletePlant }) {
  //! need State to track sold out or not
  const [isSoldOut, setIsSoldOut] = useState(false);

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeletePlant(plant));
  };

  //! Function to change In Stock to Sold out
  const handleSoldOut = () => {
    setIsSoldOut((currentVal) => !currentVal);
  };
  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {/* //!Change the conditional from true to !isSoldOut */}
      {!isSoldOut ? (
        <button className="primary" onClick={handleSoldOut}>
          In Stock
        </button>
      ) : (
        <button onClick={handleSoldOut}>Out of Stock</button>
      )}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
