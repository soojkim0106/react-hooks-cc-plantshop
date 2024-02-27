import { useState } from "react";

const URL = "http://localhost:6001/plants";

function NewPlantForm({ onAddNewPlant }) {
  const [newPlantForm, setNewPlantForm] = useState({
    name: "",
    image: "",
    price: "",
  });

  //! Function to handle all the actions done once the submit button has been pressed
  const handleSubmit = (event) => {
    event.preventDefault();

    const newPlant = {
      name: newPlantForm.name,
      image: newPlantForm.image,
      price: newPlantForm.price,
    };

    //! Post Request
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(newPlant),
    })
      .then((r) => r.json())
      .then((data) => {
        //! Send data up to parent component via callback
        onAddNewPlant(data);
        //! Empties out the form after submission
        setNewPlantForm({
          name: "",
          image: "",
          price: "",
        });
      });
  };

  //! Keep track of the onChange value and store them by spreading the new form and placing all the values that's tracked by the name
  const handleChange = (event) => {
    setNewPlantForm({
      ...newPlantForm,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newPlantForm.name}
          placeholder="Plant name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          value={newPlantForm.image}
          placeholder="Image URL"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          value={newPlantForm.price}
          placeholder="Price"
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
