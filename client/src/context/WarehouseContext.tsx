import { WarehouseGraph } from "@/types";
import { createContext } from "context";
import { useState } from "react";

interface WarehouseState {
  aisles: Aisle[];
  bins: Bin[];
  pickers: Picker[];
  orders: Order[];
  graph: WarehouseGraph;
}

const WarehouseContext = createContext<{
  state: WarehouseState;
  addAisle: (aisle: Aisle) => void;
  addBin: (bin: Bin) => void;
  updatePickerPosition: (picker: Picker) => void;
}>(null!);

export const WarehouseProvider = ({ children }) => {
  const [state, setState] = useState<WarehouseState>({
    aisles: [],
    bins: [],
    pickers: [],
    orders: [],
    graph: new WarehouseGraph(),
  });

  const value = {
    state,
    addAisle: (aisle) =>
      setState((prev) => ({
        ...prev,
        aisles: [...prev.aisles, aisle],
        graph: prev.graph.addNode(aisle),
      })),
  };

  return (
    <WarehouseContext.Provider value={value}>
      {children}
    </WarehouseContext.Provider>
  );
};
