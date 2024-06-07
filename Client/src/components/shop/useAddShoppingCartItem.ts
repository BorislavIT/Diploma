import { ENDPOINTS } from "@/shared/constants";
import { useShopMutation } from "@/shared/queries";
import { Mp3File } from "./useMp3s";

const useAddShoppingCartItem = () => {
  const mutation = useShopMutation<{ success: boolean }, Mp3File>(
    `${ENDPOINTS.SHOPPING_CART.PATH}`
  );

  return mutation;
};

export default useAddShoppingCartItem;
