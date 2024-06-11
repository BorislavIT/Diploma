import { ENDPOINTS } from "@/shared/constants";
import { useShopMutation } from "@/shared/queries";
import { Mp3File } from "./useMp3s";

const useAddPlaylistMp3 = () => {
  const mutation = useShopMutation<{ success: boolean }, Mp3File>(
    `${ENDPOINTS.PLAYLIST.PATH}`
  );

  return mutation;
};

export default useAddPlaylistMp3;
