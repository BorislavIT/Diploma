import { Mp3File } from "./useMp3s";
import { ENDPOINTS } from "@/shared/constants";
import { useShopDeleteMutation } from "@/shared/queries";

const useRemovePlaylistMp3 = () => {
  const mutation = useShopDeleteMutation<{ success: boolean }, Mp3File>(
    `${ENDPOINTS.PLAYLIST.PATH}`
  );

  return mutation;
};

export default useRemovePlaylistMp3;
