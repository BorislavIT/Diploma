import { FC } from "react";
import { Mp3File } from "./useMp3s";
import {
  combineMp3PathWithFile,
  combineThumbnailPathWithFile,
} from "@/shared/utilities";
import { usePlayerContext } from "@/contexts/PlayerContext";
import { UseMutateAsyncFunction, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const Track: FC<{
  mp3: Mp3File;
  addItemToShoppingCart: UseMutateAsyncFunction<
    {
      success: boolean;
    },
    AxiosError<unknown, any>,
    Mp3File,
    unknown
  >;
}> = ({ mp3, addItemToShoppingCart }) => {
  const { name, price, imageUrl } = mp3;
  const { url, setUrl } = usePlayerContext();
  const queryClient = useQueryClient();

  const onTrackClicked = () => {
    // in case we click the same track and we want to replay it
    setUrl("");
    setTimeout(() => {
      setUrl(combineMp3PathWithFile(name + ".mp3"));
    }, 50);
  };

  const onAddToCart = async () => {
    const result = await addItemToShoppingCart(mp3);
    queryClient.invalidateQueries({
      queryKey: ["getShoppingCart", global.isAuthorized],
    });
  };

  const labelScrolling = url === combineMp3PathWithFile(name + ".mp3");

  return (
    <div className="flex flex-col track gap-2 flex-wrap rounded-md border border-solid border-pink p-4 h-72 w-64 overflow-hidden relative">
      <img
        src={combineThumbnailPathWithFile(imageUrl)}
        alt="Description of image"
        style={{
          maxWidth: 224,
          maxHeight: 190,
          minWidth: 224,
          minHeight: 190,
        }}
      />
      <span
        className={`${
          labelScrolling
            ? "scrolling-text"
            : "text-nowrap max-w-[224px] overflow-hidden"
        }`}
      >
        {name}
      </span>
      <span>{price}$</span>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 flex justify-center items-center hover:opacity-100">
        <div className="shadow-lg text-pink flex justify-center gap-4">
          <i
            className="pi bg-white pi-play text-3xl py-2 px-4 text-center pr-[10px] rounded-md cursor-pointer"
            onClick={onTrackClicked}
          />
          <i
            className="pi bg-white pi-shopping-cart text-3xl pr-4  py-2 px-4 text-center rounded-md cursor-pointer"
            onClick={onAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default Track;
