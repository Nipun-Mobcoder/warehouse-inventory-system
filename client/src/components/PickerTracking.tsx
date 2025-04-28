import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const PickerTracking = () => {
  const { pickers } = useWarehouseContext();
  const [socket] = useState(() => io("http://localhost:5000"));

  useEffect(() => {
    socket.on("picker-update", (data: PickerUpdate) => {
      // Update context state
    });

    return () => {
      socket.off("picker-update");
    };
  }, []);

  return (
    <div className="tracking-container">
      <h3>Active Pickers</h3>
      {pickers.map((picker) => (
        <div key={picker.id} className="picker-marker">
          <div
            style={{ transform: `translate(${picker.x}px, ${picker.y}px)` }}
          />
          <span>{picker.id}</span>
        </div>
      ))}
    </div>
  );
};

export default PickerTracking;
