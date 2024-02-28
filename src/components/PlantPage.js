import { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [isEditingMode, setIsEditingMode] = useState(0);

  //! Fetching the database
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => {
        // if (!r.ok) {
        //   throw new Error("The json server is not running!");
        // }
        return r.json();
      })
      .then(setPlants)
      .catch((err) => setError(err.message));
  }, []);

  //! Function to add new plant by spreading the original plants and adding new dataset of plant submitted
  const onAddNewPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  //! Function to search for plants by what is written on the search part by event.target.value
  const onSearchPlant = (event) => {
    setSearch(event.target.value);
  };

  //! Function to filter out the plant we are deleting and taking all the Ids of plants that aren't deleted to update the list of plants
  const onDeletePlant = (deletedPlant) => {
    const updatedPlants = plants.filter(
      (plant) => plant.id !== deletedPlant.id
    );
    setPlants(updatedPlants);
  };

  //! Way to use existing form to convert to editing mode
  const handleChangeEditingMode = (value) => {
    setIsEditingMode(value);
  };

  const handleEditPlant = (plantToEdit) => {
    setPlants((mostCurrentPlants) =>
      mostCurrentPlants.map((plant) =>
        plant.id === plantToEdit.id ? plantToEdit : plant
      )
    );
  };

  //! Need to filter the plants and convert to lowercase for BOTH plant name and the plant searched in the bar
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      {error ? <p>{error}</p> : null}
      <NewPlantForm
        onAddNewPlant={onAddNewPlant}
        handleChangeEditingMode={handleChangeEditingMode}
        handleEditPlant={handleEditPlant}
        isEditingMode={isEditingMode}
      />
      <Search onSearchPlant={onSearchPlant} search={search} />
      <PlantList
        plants={filteredPlants}
        onDeletePlant={onDeletePlant}
        handleChangeEditingMode={handleChangeEditingMode}
      />
    </main>
  );
}

export default PlantPage;
