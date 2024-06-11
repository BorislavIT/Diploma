import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Mp3File } from "./useMp3s";
import {
  combineMp3PathWithFile,
  combineThumbnailPathWithFile,
} from "@/shared/utilities";
import { usePlayerContext } from "@/contexts/PlayerContext";
import { UseMutateAsyncFunction, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@/contexts/ToastContext";

const Track: FC<{
  index?: number;
  currentSongIndex?: number;
  setCurrentSongIndex?: Dispatch<SetStateAction<number>>;
  mp3: Mp3File;
  addMp3ToShoppingCart?: UseMutateAsyncFunction<
    {
      success: boolean;
    },
    AxiosError<unknown, any>,
    Mp3File,
    unknown
  >;
  addMp3ToPlaylist?: UseMutateAsyncFunction<
    {
      success: boolean;
    },
    AxiosError<unknown, any>,
    Mp3File,
    unknown
  >;
  height?: number;
  width?: number;
}> = ({
  mp3,
  addMp3ToShoppingCart,
  addMp3ToPlaylist,
  height,
  width,
  currentSongIndex,
  index,
  setCurrentSongIndex,
}) => {
  const { name, imageUrl, price } = mp3;
  const { url, setUrl } = usePlayerContext();
  const queryClient = useQueryClient();
  const toast = useToast();

  const onTrackPlay = () => {
    // in case we click the same track and we want to replay it
    setUrl("");
    setTimeout(() => {
      setUrl(combineMp3PathWithFile(name + ".mp3"));
    }, 50);
    setCurrentSongIndex && setCurrentSongIndex(index!);
  };

  useEffect(() => {
    if (currentSongIndex !== undefined && currentSongIndex === index) {
      onTrackPlay();
    }
  }, [currentSongIndex]);

  const onAddToCart = async () => {
    if (!addMp3ToShoppingCart) return;

    try {
      await addMp3ToShoppingCart(mp3);
      queryClient.invalidateQueries({
        queryKey: ["getShoppingCart", global.isAuthorized],
      });
      toast.success(`Successfully added ${mp3.name} to shopping cart`);
    } catch (error) {
      toast.error((error as any).response?.data?.error as string);
    }
  };

  const onAddToPlaylist = async () => {
    if (!addMp3ToPlaylist) return;

    try {
      await addMp3ToPlaylist(mp3);
      queryClient.invalidateQueries({
        queryKey: ["getPlaylist", global.isAuthorized],
      });
      toast.success(`Successfully added ${mp3.name} to your playlist.`);
    } catch (error) {
      toast.error((error as any).response?.data?.error as string);
    }
  };

  const labelScrolling = url === combineMp3PathWithFile(name + ".mp3");

  return (
    <div
      onClick={() => !addMp3ToPlaylist && onTrackPlay()}
      className={`flex ${
        !addMp3ToPlaylist
          ? "flex-nowrap flex-row cursor-pointer items-center pb-2"
          : "flex-col flex-wrap p-4 border"
      } track gap-2 border-solid border-pink overflow-hidden`}
    >
      <span className="relative">
        <img
          src={combineThumbnailPathWithFile(imageUrl)}
          alt="Description of image"
          style={{
            maxWidth: width ?? 224,
            maxHeight: height ?? 190,
            minWidth: width ?? 224,
            minHeight: height ?? 190,
          }}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 flex justify-center items-center hover:opacity-100">
          <div className="shadow-lg text-pink flex justify-center gap-4">
            {addMp3ToShoppingCart && (
              <i
                className="pi bg-white pi-shopping-cart text-xl pr-4 py-2 px-4 text-center rounded-md cursor-pointer"
                onClick={onAddToCart}
              />
            )}
            <i
              className="pi bg-white pi-play text-xl py-2 px-4 text-center pr-[10px] rounded-md cursor-pointer"
              onClick={onTrackPlay}
            />
            {addMp3ToShoppingCart && (
              <i
                className="pi bg-white pi-youtube text-xl pr-4 py-2 px-4 text-center rounded-md cursor-pointer"
                onClick={onAddToPlaylist}
              />
            )}
          </div>
        </div>
      </span>
      <span
        className={`${
          labelScrolling && addMp3ToShoppingCart
            ? "scrolling-text"
            : "text-nowrap max-w-[224px] overflow-hidden"
        }`}
      >
        {name}
      </span>
      {addMp3ToPlaylist && <span>${price}</span>}
    </div>
  );
};

export default Track;
