import { useState, useEffect } from "react";

const URL = "http://localhost:6001/plants";

const initialState = {
  name: "",
  image: "",
  price: "",
};

function NewPlantForm({
  onAddNewPlant,
  handleChangeEditingMode,
  handleEditPlant,
  isEditingMode,
}) {
  const [newPlantForm, setNewPlantForm] = useState({
    name: "",
    image: "",
    price: "",
  });

  const [originalVersionOfForm, setOriginalVersionOfForm] =
    useState(initialState);

  useEffect(() => {
    if (isEditingMode) {
      fetch(`${URL}/${isEditingMode}`)
        .then((r) => r.json())
        .then((data) => {
          setOriginalVersionOfForm(data);
          setNewPlantForm(data);
        })
        .catch((err) => alert(err));
    }
  }, [isEditingMode]);

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
      <h2>{isEditingMode ? "Update Existing" : "New"} Plant</h2>
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
        <button type="submit">
          {isEditingMode ? "Edit Plant" : "Add Plant"}
        </button>
      </form>
    </div>
  );
}

export default NewPlantForm;
