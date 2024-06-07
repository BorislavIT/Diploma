import { useState } from "react";
import Eminem from "../shared/pictures/eminem.jpg";
import Podcast from "../shared/pictures/podcast.jpg";
import Track from "@/components/shop/Track";
import Category from "@/components/shop/Category";
import LargeLoader from "@/components/loaders/LargeLoader";
import Search from "@/components/shop/Search";
import useMp3s from "@/components/shop/useMp3s";
import useAddShoppingCartItem from "@/components/shop/useAddShoppingCartItem";

const Shop = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data, isLoading } = useMp3s(selectedCategory, search);

  const mutation = useAddShoppingCartItem();

  const toggleCategory = (number: number) => {
    setSelectedCategory((prevSelectedCategory) => {
      return number === prevSelectedCategory ? null : number;
    });
  };

  return (
    <>
      <div className="w-full mb-5">
        {global.isAuthorized && (
          <Search search={search} setSearch={setSearch} />
        )}
      </div>

      <div className="w-full h-auto flex flex-row flex-nowrap gap-2 text-white font-bold justify-center">
        <Category
          label="Tracks"
          image={Eminem}
          isSelected={selectedCategory === 0}
          toggleCategory={() => toggleCategory(0)}
        />
        <Category
          label="Podcasts"
          image={Podcast}
          isSelected={selectedCategory === 1}
          toggleCategory={() => toggleCategory(1)}
        />
      </div>
      {isLoading ? (
        <LargeLoader />
      ) : (
        <div className="mt-5 flex flex-row flex-wrap scrollbar-custom gap-y-6 overflow-auto p-4 max-h-[calc(100%-354px)] mb-4 gap-x-5">
          {data?.map((mp3) => (
            <div key={mp3.name}>
              <Track mp3={mp3} addItemToShoppingCart={mutation.mutateAsync} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Shop;
