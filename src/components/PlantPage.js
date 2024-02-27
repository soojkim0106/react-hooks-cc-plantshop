import { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  //! Fetching the database
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => {
        if (!r.ok) {
          throw new Error("The json server is not running!");
        }
        return r.json();
      })
      .then(setPlants)
      .catch((err) => console.log(err));
  }, []);

  //! Function to add new plant by spreading the original plants and adding new dataset of plant submitted
  const onAddNewPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  //! Function to search for plants by what is written on the search part by event.target.value
  const onSearchPlant = (event) => {
    setSearch(event.target.value);
  };

  //! Need to filter the plants and convert to lowercase for BOTH plant name and the plant searched in the bar
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddNewPlant={onAddNewPlant} />
      <Search onSearchPlant={onSearchPlant} search={search} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
