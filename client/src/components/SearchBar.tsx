import { SKUTrie } from "@/algorithms/SKUTrie";
import { useEffect, useState } from "react";

interface SearchBarProps {
  trie: SKUTrie;
  onSearch: (results: string[]) => void;
}

const SearchBar = ({ trie, onSearch }: SearchBarProps) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const results = trie.search(input);
    onSearch(results);
  }, [input, onSearch, trie]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search SKU..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="suggestions">
        {results.map((sku) => (
          <div key={sku} onClick={() => handleSKUSelect(sku)}>
            {sku}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
