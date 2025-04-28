import axios from "axios";
import { useState } from "react";

const AisleConfigurator = () => {
  const { addAisle } = useWarehouseContext();
  const [newAisle, setNewAisle] = useState({ name: "", length: 0 });

  const handleSubmit = async () => {
    await axios.post("/api/aisles", newAisle);
    addAisle(newAisle);
  };

  return (
    <div className="configurator">
      <h3>Add New Aisle</h3>
      <input
        type="text"
        placeholder="Aisle Name"
        onChange={(e) => setNewAisle({ ...newAisle, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Length (meters)"
        onChange={(e) => setNewAisle({ ...newAisle, length: +e.target.value })}
      />
      <button onClick={handleSubmit}>Create Aisle</button>
    </div>
  );
};

export default AisleConfigurator;
