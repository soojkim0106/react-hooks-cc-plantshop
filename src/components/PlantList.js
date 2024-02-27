import PlantCard from "./PlantCard";

function PlantList({ plants }) {
  //! Mapping out the filtered plants to show individual plants
  const mappedPlants = plants.map((plant) => (
    <PlantCard key={plant.id} plant={plant} />
  ));
  return <ul className="cards">{mappedPlants}</ul>;
}

export default PlantList;
