import { useState } from "react";

function PlantCard({ plant }) {
  //! need State to track sold out or not
  const [isSoldOut, setIsSoldOut] = useState(false);

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
    </li>
  );
}

export default PlantCard;
