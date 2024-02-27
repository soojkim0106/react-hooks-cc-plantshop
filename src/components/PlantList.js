import PlantCard from "./PlantCard";

function PlantList({ plants, onDeletePlant, handleChangeEditingMode }) {
  //! Mapping out the filtered plants to show individual plants
  const mappedPlants = plants.map((plant) => (
    <PlantCard
      key={plant.id}
      plant={plant}
      onDeletePlant={onDeletePlant}
      handleChangeEditingMode={handleChangeEditingMode}
    />
  ));
  return <ul className="cards">{mappedPlants}</ul>;
}

export default PlantList;
