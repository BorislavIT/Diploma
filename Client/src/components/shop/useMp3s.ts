import { ENDPOINTS } from "@/shared/constants";
import { useShopQuery } from "@/shared/queries";

export type Mp3File = {
  name: string;
  thumbnail: string;
};

const useMp3s = () => {
  const { data, error, isLoading } = useShopQuery<Mp3File[]>(
    ["getAllMp3s", global.isAuthorized],
    `${ENDPOINTS.MP3S.PATH}`,
    true
  );

  return { data, error, isLoading };
};

export default useMp3s;
