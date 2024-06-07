import { InputText } from "primereact/inputtext";
import { Dispatch, FC, SetStateAction } from "react";

type SearchProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

const Search: FC<SearchProps> = ({ search, setSearch }) => {
  return (
    <div className="w-full text-theme-value flex justify-center items-center">
      <div className="relative w-1/2">
        <i className="pi pi-search text-xl text-black absolute right-[11px] top-[11px]" />
        <InputText
          value={search}
          className="pr-10 w-full p-2 text-black placeholder-black bg-theme-primary border border-solid"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for artists, bands, tracks, podcasts"
        />
      </div>
    </div>
  );
};

export default Search;
