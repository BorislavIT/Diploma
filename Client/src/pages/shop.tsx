import Kendrick from "../shared/pictures/kendrick.jpg";
import Podcast from "../shared/pictures/podcast.jpg";
import Rose from "../shared/pictures/rose.jpg";
import Band from "../shared/pictures/5fdp.png";
import Track from "@/components/shop/Track";
import Category from "@/components/shop/Category";
import useMp3s from "@/components/shop/useMp3s";
import LargeLoader from "@/components/loaders/LargeLoader";

const Shop = () => {
  const { data, isLoading, error } = useMp3s();

  console.log(data);

  return (
    <>
      <div className="w-full h-auto flex flex-row flex-nowrap gap-2 text-white font-bold justify-center">
        <Category label="Artists" image={Kendrick} />
        <Category label="Bands" image={Band} />
        <Category label="Tracks" image={Rose} />
        <Category label="Podcasts" image={Podcast} />
      </div>
      {isLoading ? (
        <LargeLoader />
      ) : (
        <div className="mt-5 flex flex-row flex-wrap scrollbar-custom gap-y-6 overflow-auto p-4 max-h-[calc(100%-354px)] mb-4 gap-x-5">
          {data?.map((mp3, index) => (
            <>
              <div key={index}>
                <Track mp3={mp3} />
              </div>
              <div key={index}>
                <Track mp3={mp3} />
              </div>
              <div key={index}>
                <Track mp3={mp3} />
              </div>
              <div key={index}>
                <Track mp3={mp3} />
              </div>
              <div key={index}>
                <Track mp3={mp3} />
              </div>
              <div key={index}>
                <Track mp3={mp3} />
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Shop;
