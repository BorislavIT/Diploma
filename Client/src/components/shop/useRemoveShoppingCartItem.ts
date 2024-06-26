import { Mp3File } from "./useMp3s";
import { ENDPOINTS } from "@/shared/constants";
import { useShopDeleteMutation } from "@/shared/queries";

const useRemoveShoppingCartMp3 = () => {
  const mutation = useShopDeleteMutation<{ success: boolean }, Mp3File>(
    `${ENDPOINTS.SHOPPING_CART.PATH}`
  );

  return mutation;
};

export default useRemoveShoppingCartMp3;
