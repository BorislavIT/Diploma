import { ENDPOINTS } from "@/shared/constants";
import { useShopQuery } from "@/shared/queries";
import { Mp3File } from "../shop/useMp3s";

export type Playlist = {
  id: number;
  mp3s: Mp3File[];
};

const usePlaylist = () => {
  const { data, error, isLoading } = useShopQuery<Playlist>(
    ["getPlaylist", global.isAuthorized],
    `${ENDPOINTS.PLAYLIST.PATH}`,
    true
  );

  return { data, error, isLoading };
};

export default usePlaylist;
