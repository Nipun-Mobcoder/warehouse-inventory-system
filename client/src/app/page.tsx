"use client";

import { useState } from "react";
import { WarehouseProvider } from "../context/WarehouseContext";
import { SKUTrie } from "../algorithms/SKUTrie";
import "./App.css";
import ThreeCanvas from "@/components/ThreeCanvas";
import SearchBar from "@/components/SearchBar";
import PickerTracking from "@/components/PickerTracking";

export default function App() {
  const [skuTrie] = useState(new SKUTrie());
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <WarehouseProvider>
      <div className="app-container">
        {/* <Header /> */}
        <div className="main-content">
          <div className="visualization-panel">
            <ThreeCanvas />
            {/* <RealTimeStats /> */}
          </div>
          <div className="control-panel">
            <SearchBar trie={skuTrie} onSearch={setSearchTerm} />
            {/* <OrderManagement /> */}
            <PickerTracking />
            {/* <AisleConfigurator /> */}
          </div>
        </div>
      </div>
    </WarehouseProvider>
  );
}
