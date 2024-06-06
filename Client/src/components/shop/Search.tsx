import { InputText } from "primereact/inputtext";
import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="w-full text-theme-value flex justify-center items-center">
      <div className="p-input-icon-right w-1/2">
        <i className="pi pi-search text-xl text-black" />
        <InputText
          value={search}
          className="pr-10 w-full p-2 text-black placeholder-black bg-theme-primary border border-solid border-pink"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for artists, bands, tracks, podcasts"
        />
      </div>
    </div>
  );
};

export default Search;
